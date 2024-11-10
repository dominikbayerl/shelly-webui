import { Empty } from "antd";
import { useAppSelector, useAppDispatch } from './hooks'
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
        <DeviceView />
    )
};
