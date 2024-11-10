import { List, Card } from "antd";
import { FunctionComponent, useEffect } from "react";
import { SHSW21, SHSW21Model } from './shsw21';
import { SHDM2, SHDM2Model } from "./shdm2";
import { deleteDevice, fetchStatus } from '../features/DevicesSlice';
import { useAppDispatch } from "../hooks";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import * as styles from './device.module.less';

export enum DeviceType {
    SHSW21 = "SHSW-21",
    SHDM2 = "SHDM-2",
};
export interface DeviceInfo {
    type: DeviceType;
    mac: string;
    hostname: string;
};
export interface Settings {
    device: DeviceInfo;
    name: string;
};
export interface Status {
};
export type DeviceModel = Settings & { _status?: Status };

type Props = {
    timeout?: number;
} & DeviceModel;

export const Device: FunctionComponent<Props> = (props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (props.device.hostname !== "") {
            dispatch(fetchStatus(props));
        }
    }, [dispatch]);

    switch (props.device.type) {
        case DeviceType.SHSW21:
            return (
                <SHSW21 {...props as SHSW21Model} />
            )
        case DeviceType.SHDM2:
            return (
                <SHDM2 {...props as SHDM2Model} />
            )
        default:
            return (
                <Card key={props.device.mac} 
                    className={styles.device}
                    extra={<DeleteOutlined onClick={() => dispatch(deleteDevice(props.device.mac)) } />}
                    title={
                        <div style={{ fontWeight: 'normal' }}>
                            <QuestionCircleOutlined style={{ marginRight: '4px', color: '#1677ff' }} />
                            {props.name}
                        </div>
                    }
                >
                    Device type "{ props.device.type }" not supported.
                </Card>
            )
    }
};
