import { TabBar, Empty } from "antd-mobile";
import { HeatMapOutlined, ControlOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from './hooks'
import { setActiveKey } from './features/AppSlice';
import { DeviceView } from "./components/DeviceView";
import { SettingsView } from "./SettingsView";

export default function App() {
    const activeKey = useAppSelector(state => state.app.activeKey);
    const dispatch = useAppDispatch();

    const activeView = (activeKey: string) => {
        switch (activeKey) {
            case "devices":
                return <DeviceView />
            case "settings":
                return <SettingsView />
            default:
                return <Empty
                    style={{ padding: '64px 0' }}
                    imageStyle={{ width: 128 }}
                    description='Todo!' />
        }
    };

    return (
        <>
            <TabBar activeKey={activeKey} onChange={key => dispatch(setActiveKey(key))}>
                <TabBar.Item key="devices" icon={<HeatMapOutlined />}>Devices</TabBar.Item>
                <TabBar.Item key="settings" icon={<ControlOutlined />}>Settings</TabBar.Item>
            </TabBar>
            {activeView(activeKey)}
        </>
    )
};
