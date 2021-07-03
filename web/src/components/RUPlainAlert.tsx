
import { Collapse, IconButton } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AlertSeverity } from "../slices/alertSlice";
import CloseIcon from '@material-ui/icons/Close';
import { useCallback } from "react";
import React from "react";

const RUPlainAlert = (props: { title?: string, severity?: AlertSeverity, message?: string }) => {
    const [open, setOpen] = React.useState(true);

    const closeAlert = useCallback(
        () => setOpen(false)
        , [setOpen]);

    return (
        <Collapse in={open}>
            <Alert
                severity={props.severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={closeAlert}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {
                    props.title ? <AlertTitle>{props.title}</AlertTitle> : ""
                }
                {props.message}
            </Alert >
        </Collapse>
    );
}

export default RUPlainAlert;