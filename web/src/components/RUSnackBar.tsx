import { IconButton, Snackbar } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { AlertSeverity } from "../slices/alertSlice";

const RUSnackBar = (props: { timeout?: number, severity?: AlertSeverity, message?: string }) => {
    const [open, setOpen] = useState(true);

    const handleClose = useCallback((event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }, []);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={open}
            onClose={handleClose}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        >
            <Alert severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default RUSnackBar;