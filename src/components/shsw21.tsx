import { FunctionComponent } from 'react';
import { Button, Card, List, Toast, Skeleton } from 'antd-mobile'
import { AntDesignOutlined, RightOutlined, ColumnHeightOutlined } from '@ant-design/icons'
import { Settings, Status, DeviceInfo } from './device';
import { Roller, RollerState } from './roller';
import * as styles from './shsw21.module.less';
import { useAppDispatch } from '../hooks';
import { sendRollerCmd, RollerCommandWord } from '../features/DevicesSlice';

type SHSW21Info = DeviceInfo & {
    num_outputs: number;
    num_meters: number;
    num_rollers: number;
};

type SHSW21Settings = Settings & {
    device: SHSW21Info;
};

type SHSW21Status = Status & {
    rollers: RollerState[];
}

export type SHSW21Model = SHSW21Settings & { _status?: SHSW21Status };

export const SHSW21: FunctionComponent<SHSW21Model> = (props) => {
    const dispatch = useAppDispatch();

    return (
        <Card title={
        <div style={{ fontWeight: 'normal' }}>
            <AntDesignOutlined style={{ marginRight: '4px', color: '#1677ff' }} />
            { props.name }
        </div>
        }
        extra={<RightOutlined />}
        className={styles.device}
        >
        <div className={styles.content}>
            {
                props._status ?
                props._status.rollers.map((roller, idx) => 
                <Roller key={idx}
                    onButtonDown={() => {dispatch(sendRollerCmd({ device: props, roller: idx, command: { go: RollerCommandWord.Close } }))}}
                    onButtonStop={() => {dispatch(sendRollerCmd({ device: props, roller: idx, command: { go: RollerCommandWord.Stop } }))}}
                    onButtonUp={() => {dispatch(sendRollerCmd({ device: props, roller: idx, command: { go: RollerCommandWord.Open } }))}}
                    onPosition={(position) => {dispatch(sendRollerCmd({ device: props, roller: idx, command: { go: RollerCommandWord.Position, roller_pos: position } }))}}
                    {...roller} 
                />) 
                : <Skeleton.Paragraph animated />
            }
        </div>
        </Card>
    );
};
