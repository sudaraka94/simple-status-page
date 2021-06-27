import firebase from "firebase";
import { useEffect } from "react";
import { generateUUID } from "../util";
import { addAlertWithTimeout, AlertSeverity, AlertType } from "../slices/alertSlice";
import { handleAuthSuccess } from "../slices/authSlice";
import store from "../store";

const withAutoSignIn = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        useEffect(() => {
            // Get token from local storage
            firebase.auth().onAuthStateChanged(user => {
                if (user && user.email) {
                    store.dispatch(handleAuthSuccess({ email: user.email }));
                    store.dispatch(addAlertWithTimeout({
                        id: generateUUID(),
                        severity: 'success' as AlertSeverity,
                        type: AlertType.SNACKBAR,
                        message: "User logged in successfully!"
                    }));
                }
            })
        });

        return <WrappedComponent {...props} />
    }
}

export default withAutoSignIn;