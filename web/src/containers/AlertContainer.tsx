
import { createStyles, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import RUAlert from "../components/RUAlert";
import { alertSelector } from "../slices/alertSlice";


const useStyles = makeStyles(() =>
    createStyles({
        alertsWrap: {
            width: '100%',
        },
    }),
);


const AlertContainer = () => {
    const classes = useStyles();

    const alerts = useSelector(alertSelector) || [];
    const renderedAlerts = [];
    for (const alert of alerts) {
        renderedAlerts.push(<RUAlert key={alert.id} alert={alert} />);
    }

    return (
        <div className={classes.alertsWrap}>
            {renderedAlerts}
        </div>
    );
}

export default AlertContainer;