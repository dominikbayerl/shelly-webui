import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Input, Form } from "antd";
import { useAppDispatch } from '../hooks';
import { Device } from './device';
import { devicesSelector, fetchSettings } from '../features/DevicesSlice';
import { PlusCircleOutlined } from '@ant-design/icons';

import * as styles from './DeviceView.module.less';


export const DeviceView: FunctionComponent<{}> = () => {
    const dispatch = useAppDispatch();
    const devices = useSelector(devicesSelector.selectAll);
    // const error = useAppSelector(state => state.error);

    return (
        <>
            {devices.map(props => (<Device key={props.device.mac} {...props} />))}
                <Form layout='horizontal'>
                    <Form.Item
                        extra={
                            <div className={styles.extra}>
                                <PlusCircleOutlined />
                            </div>
                        }
                    >
                        <Input placeholder='Add Device' name="hostname" allowClear
                            onPressEnter={(evt) => dispatch(fetchSettings((evt.target as HTMLInputElement).value)) }
                         />
                    </Form.Item>
                </Form>
        </>
    )
};
