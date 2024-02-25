import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '../store'


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    activeKey: 'devices',
    status: 'idle',
    error: null,
  },
  reducers: {
    setActiveKey(state, action: PayloadAction<string>) {
      state.activeKey = action.payload
    },
  },
});

export const { setActiveKey } = appSlice.actions;
export default appSlice.reducer;
