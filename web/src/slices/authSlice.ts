import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import store from '../store'

interface AuthState {
    currentUserEmail: string,
}

const initialState: AuthState = {
    currentUserEmail: "",
}

export interface AuthActionPayload {
    email: string,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSuccess: (state, action: PayloadAction<AuthActionPayload>) => {
            state.currentUserEmail = action.payload.email;
        },
        authLogout: state => {
            state.currentUserEmail = "";
        },
    }
});

const { authSuccess, authLogout } = authSlice.actions;

// Auth Selectors
export const userEmailSelector = (state: RootState) => state.auth.currentUserEmail;

export default authSlice.reducer;

export const handleAuthSuccess = (payload: AuthActionPayload) => async (dispatch: typeof store.dispatch) => {
    dispatch(authSuccess(payload));
}

export const handleAuthLogout = () => async (dispatch: typeof store.dispatch) => {
    dispatch(authLogout());
}