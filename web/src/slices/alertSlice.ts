import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLAIN_ALERT_TIMEOUT, SNACKBAR_ALERT_TIMEOUT } from "../config";
import store, { RootState } from "../store";

// Typedefs
export enum AlertType {
    ALERT,
    SNACKBAR
}

export type AlertSeverity =
    'error' |
    'success' |
    'warning' |
    'info';

export interface Alert {
    id: string,
    title?: string,
    severity: AlertSeverity,
    message: any,
    type: AlertType
}

const initialState: Alert[] = []

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.push(action.payload);
        },
        removeAlert: (state, action: PayloadAction<string>) => {
            let index = state.findIndex(alert => alert.id === action.payload);
            state.splice(index, 1);   
        }
    },
});

const { addAlert, removeAlert } = alertSlice.actions;

// Selectors
export const alertSelector = (state: RootState) => state.alert;

export default alertSlice.reducer;

// Defining a thunk for removing the alerts after sometime
export const addAlertWithTimeout = (payload: Alert) => async (dispatch: typeof store.dispatch) => {
    dispatch(addAlert(payload));
    setTimeout(()=> {
        dispatch(removeAlert(payload.id));
    }, payload.type === AlertType.SNACKBAR? SNACKBAR_ALERT_TIMEOUT : PLAIN_ALERT_TIMEOUT)
}