import { FunctionComponent } from 'react';
import { Card, Skeleton } from 'antd';
import { ControlOutlined, RightOutlined } from '@ant-design/icons';
import { Settings, Status, DeviceInfo } from './device';
import * as styles from './shsw21.module.less';
import { useAppDispatch } from '../hooks';
import { sendRollerCmd, RollerCommandWord, sendLightCmd, LightCommandWord } from '../features/DevicesSlice';
import { Light, LightState } from './light';

type SHDM2Info = DeviceInfo & {
    num_outputs: number;
    num_meters: number;
    num_rollers: number;
};

type SHDM2Settings = Settings & {
    device: SHDM2Info;
};

type SHDM2Status = Status & {
    lights: LightState[];
}

export type SHDM2Model = SHDM2Settings & { _status?: SHDM2Status };

export const SHDM2: FunctionComponent<SHDM2Model> = (props) => {
    const dispatch = useAppDispatch();

    return (
        <Card title={
        <div style={{ fontWeight: 'normal' }}>
            <AntOutline style={{ marginRight: '4px', color: '#1677ff' }} />
            { props.name }
        </div>
        }
        extra={<RightOutline />}
        className={styles.device}
        >
        <div className={styles.content}>
            {
                props._status ?
                props._status.lights.map((light, idx) => 
                <Light key={idx}
                    onButtonOff={() => {dispatch(sendLightCmd({ device: props, light: idx, command: { turn: LightCommandWord.Off } }))}}
                    onButtonOn={() => {dispatch(sendLightCmd({ device: props, light: idx, command: { turn: LightCommandWord.On } }))}}
                    onBrightness={(brightness) => {dispatch(sendLightCmd({ device: props, light: idx, command: { brightness: brightness } }))}}
                    {...light} 
                />) 
                : <Skeleton.Paragraph animated />
            }
        </div>
        </Card>
    );
};
