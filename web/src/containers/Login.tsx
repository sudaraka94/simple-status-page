import { Box, Button, Container, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import withAutoSignIn from "../hoc/withAutoSignIn";
import { addAlertWithTimeout, AlertSeverity, AlertType } from "../slices/alertSlice";
import { userEmailSelector } from "../slices/authSlice";
import store from "../store";
import { generateUUID } from "../util";

const useStyles = makeStyles((theme: Theme) => ({
    mainContent: {
        marginTop: "30vh",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const history = useHistory();
    const isSigned = Boolean(useSelector(userEmailSelector));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isSigned) history.push('/admin');
    });

    const onAuthSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error.code, error.message)
                store.dispatch(addAlertWithTimeout({
                    id: generateUUID(),
                    severity: 'error' as AlertSeverity,
                    type: AlertType.SNACKBAR,
                    message: error.message
                }));
            })
    }

    return (
        <Container maxWidth="xs" className={classes.mainContent}>
            <Box display="flex" flexDirection="column">
                <Typography align="center" variant={"h4"}>&#127795; Admin Login</Typography>
                <form onSubmit={onAuthSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={event => setEmail(event.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={event => setPassword(event.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

const withAutoSignedInComponent = withAutoSignIn(Login);

export default withAutoSignedInComponent;