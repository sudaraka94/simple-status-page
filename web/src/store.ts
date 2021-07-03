import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/authSlice'
import AlertReducer from './slices/alertSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        alert: AlertReducer,
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch