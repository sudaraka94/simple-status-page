import React from "react";
import { Alert, AlertType } from "../slices/alertSlice";
import RUPlainAlert from "./RUPlainAlert";
import RUSnackBar from "./RUSnackBar";

// Typedefs
export interface RUAlertProps {
    alert?: Alert,
}

const RUAlert = (props: RUAlertProps) => {
    return (
        <React.Fragment>
            {props.alert?.type === AlertType.SNACKBAR ?
                <RUSnackBar key={props.alert?.id} message={props.alert?.message} severity={props.alert?.severity} />
                :
                <RUPlainAlert key={props.alert?.id} message={props.alert?.message} title={props.alert?.title} severity={props.alert?.severity} />
            }
        </React.Fragment>
    );

}

export default RUAlert;
