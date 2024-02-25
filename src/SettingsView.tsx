import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, SideBar, TabBar, List, Empty } from "antd-mobile";
import { useAppSelector, useAppDispatch } from './hooks'


export const SettingsView: FunctionComponent<{}> = () => {
    const dispatch = useAppDispatch();
    // const error = useAppSelector(state => state.error);

    return (
        <>
        </>
    )
};
