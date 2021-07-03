import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PLAIN_ALERT_TIMEOUT, SNACKBAR_ALERT_TIMEOUT } from "../config";
import store, { AppDispatch, RootState } from "../store";
import { generateUUID } from "../util";

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
export const addAlertWithTimeout = (payload: Alert) => async (dispatch: AppDispatch) => {
    dispatch(addAlert(payload));
    setTimeout(() => {
        dispatch(removeAlert(payload.id));
    }, payload.type === AlertType.SNACKBAR ? SNACKBAR_ALERT_TIMEOUT : PLAIN_ALERT_TIMEOUT)
}

export const addSnackBarAlert = (alertSeverity: AlertSeverity, alertMessage: string) => {
    return addAlertWithTimeout({
        id: generateUUID(),
        severity: alertSeverity,
        type: AlertType.SNACKBAR,
        message: alertMessage
    });
}