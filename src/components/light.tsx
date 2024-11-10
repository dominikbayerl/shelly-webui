import { Button, Space, Slider } from 'antd';
import { MoonOutlined, SunOutlined, PoweroffOutlined, BulbOutlined } from '@ant-design/icons';
import { FunctionComponent, useState } from 'react';
import * as styles from './shdm2.module.less';

declare enum State {
    Stop = "stop",
};

export declare interface LightState {
    ison: boolean;
    source: string;
    has_timer: boolean;
    timer_started: number;
    timer_duration: number;
    timer_remaining: number;
    mode: string;
    brightness: number;
    transition: number;
};

type EventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export declare interface Handlers {
    onButtonOff?: EventHandler,
    onButtonOn?: EventHandler,
    onBrightness?: (arg0: number) => void,
};

const marks = {
    0: <MoonOutlined />,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    60: 60,
    70: 70,
    80: 80,
    90: 90,
    100: <SunOutlined />,
};
export const Light: FunctionComponent<LightState & Handlers> = (props) => {
    const [sliderValue, setSliderValue] = useState(props.brightness || 0);
    return (
        <div className={styles.light}>
            <Slider
                marks={marks}
                value={sliderValue}
                onChange={(value: number) => setSliderValue(value as number)}
                onChangeComplete={x => props.onBrightness?.(x as number)}
            />
            <div className={styles.controlbar}>
                <Space className={styles.buttons} align='center'>
                    <Button color='primary' onClick={props.onButtonOff}>
                        <PoweroffOutlined />
                    </Button>
                    <Button color='primary' onClick={props.onButtonOn}>
                        <BulbOutlined />
                    </Button>
                </Space>
            </div>
        </div>
    );
}
