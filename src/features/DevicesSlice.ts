import { MacCommandFilled } from '@ant-design/icons';
import { createSlice, createAsyncThunk, createAction, createSelector, createEntityAdapter, EntityState, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { DeviceModel, DeviceType, Settings } from '../components/device';
import { SHSW21Model } from '../components/shsw21';
import { RootState } from '../store';


type PayloadActionType = Settings;

export enum RollerCommandWord {
    Open = "open",
    Close = "close",
    Stop = "stop",
    Position = "to_pos"
};
type RollerCommand = {
    go: RollerCommandWord,
    roller_pos?: number,
    duration?: number,
    offset?: number,
};
type RollerCommandPayload = {
    device: SHSW21Model,
    roller: number,
    command: RollerCommand
};

const encodeGetParams = (p: Object) => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

export const fetchStatus = createAsyncThunk('device/fetchStatus', async ({ device }: PayloadActionType) => {
    const response = await fetch(`http://${device.hostname}/status`, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
        }
    });
    return response.json();
});

export const fetchSettings = createAsyncThunk('device/fetchSetings', async(hostname: string) => {
    const response = await fetch(`http://${hostname}/settings`, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.json();
});

export const sendRollerCmd = createAsyncThunk(
    'roller/cmd', 
    async ({ device, roller, command }: RollerCommandPayload, thunkAPI) => {
        const response = await fetch(`http://${device.device.hostname}/roller/${roller}?${encodeGetParams(command)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });
        response.json();
    }
);

// Entities
type idType = string;
const devicesAdapter = createEntityAdapter<DeviceModel>({
    selectId: ({ device }) => device.mac,
    sortComparer: (a, b) => a.device.mac.localeCompare(b.device.mac),
});

// Initial State
type InitialState = EntityState<DeviceModel> & {
    loading: string;
    error: string | undefined;
};
const initialState: InitialState = devicesAdapter.getInitialState({
    loading: "idle",
    error: undefined,
});

// Selectors
export const devicesSelector = devicesAdapter.getSelectors<RootState>(
    (state) => state.devices,
);

// Slice
export const devicesSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        addDevice: devicesAdapter.addOne,
        updateDevice: devicesAdapter.updateOne,
        deleteDevice: devicesAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStatus.pending, (state, action) => {
            state.loading = 'loading';
        })
        builder.addCase(fetchStatus.fulfilled, (state, action) => {
            try {
                state.loading = 'succeeded';
                devicesAdapter.updateOne(state, {
                    id: action.payload.mac,
                    changes: {
                        _status: action.payload,
                    }
                });
            } catch (err) {
                console.error(err);
            }
        })
        builder.addCase(fetchStatus.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchSettings.pending, (state, action) => {
            state.loading = 'loading';
        })
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            try {
                state.loading = 'succeeded';
                const { name, device } = action.payload;
                devicesAdapter.upsertOne(state, { name, device });
            } catch (err) {
                console.error(err);
            }
        })
        builder.addCase(fetchSettings.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        })
    },
});

export const { addDevice, updateDevice, deleteDevice } = devicesSlice.actions;
export default devicesSlice.reducer;
