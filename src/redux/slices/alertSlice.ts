import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";  


export interface IAlertState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
}

const initialState: IAlertState = {
  message: '',
  type: 'info',
  isVisible: false,
};

interface ShowAlertPayload {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<ShowAlertPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.message = '';
      state.type = 'info';
      state.isVisible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
