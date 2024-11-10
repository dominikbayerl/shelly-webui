import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Badge, Button, SideBar, TabBar, Card, FloatingBubble, Input, Form } from "antd-mobile"
import { useAppSelector, useAppDispatch } from '../hooks'
import { Device, DeviceModel, DeviceType } from './device';
import { addDevice, devicesSelector, fetchSettings } from '../features/DevicesSlice';
import { AddCircleOutline } from 'antd-mobile-icons';

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
                                <AddCircleOutline />
                            </div>
                        }
                    >
                        <Input placeholder='Add Device' name="hostname" clearable
                            onEnterPress={(evt) => dispatch(fetchSettings((evt.target as HTMLInputElement).value)) }
                         />
                    </Form.Item>
                </Form>
        </>
    )
};
