import { Button, List, Space, Slider } from 'antd-mobile'
import { UpOutline, DownOutline, StopOutline } from 'antd-mobile-icons'
import { SliderValue } from 'antd-mobile/es/components/slider';
import { FunctionComponent, useState } from 'react';
import * as styles from './shsw21.module.less';


declare enum State {
    Stop = "stop",
};

export declare interface RollerState {
    state: State;
    source: string;
    power: number;
    is_valid: boolean;
    safety_switch: boolean;
    stop_reason: string;
    last_direction: string;
    current_pos: number;
    calibration: boolean;
    positioning: boolean;
};

type EventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
export declare interface Handlers {
    onButtonStop?: EventHandler,
    onButtonDown?: EventHandler,
    onButtonUp?: EventHandler,
    onPosition?: (arg0: number) => void,
};

const marks = {
      0:   <DownOutline />,
     10:  10,
     20:  20,
     30:  30,
     40:  40,
     50:  50,
     60:  60,
     70:  70,
     80:  80,
     90:  90,
    100: <UpOutline />,
};
export const Roller: FunctionComponent<RollerState & Handlers> = (props) => {
    const [sliderValue, setSliderValue] = useState(props.current_pos || 0);
    return (
        <div className={styles.roller}>
            <Slider 
                ticks 
                marks={marks}
                value={sliderValue}
                onChange={(value: SliderValue) => setSliderValue(value as number)}
                onAfterChange={x => props.onPosition?.(x as number)}
            />
            <div className={styles.controlbar}>
                <Space className={styles.text} align='center'>
                    Idle
                </Space>
                <Space className={styles.buttons} align='center' justify='end'>
                    <Button color='primary' onClick={props.onButtonDown}>
                        <DownOutline />
                    </Button>
                    <Button color='primary' onClick={props.onButtonStop}>
                        <StopOutline />
                    </Button>
                    <Button color='primary' onClick={props.onButtonUp}>
                        <UpOutline />
                    </Button>
                </Space>
            </div>
        </div>
    );
}
