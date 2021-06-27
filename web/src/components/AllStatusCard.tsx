import { Card, CardContent, makeStyles, Theme } from "@material-ui/core";

export type CardStatus = "operational" | "degraded" | "outage" | "maintainance";

const useStyle = makeStyles((theme: Theme) => ({
    statusCard: {
        color: "white",
        margin: "45px 0 20px 0",
        fontWeight: 800,
        fontSize: "16px",
    },
    statusOperational: {
        backgroundColor: "#22C55E",
    },
    statusDegraded: {
        backgroundColor: "#FBBF24",
    },
    statusOutage: {
        backgroundColor: "#DC2626",
    },
    statusMaintainance: {
        backgroundColor: "#4F46E5",
    },
    cardContent: {
        paddingBottom: "15px!important"
    },
    statusIcon: {
        marginRight: "11px"
    }
}));


const AllStatusCard = (props: { status: CardStatus }) => {
    let classes = useStyle();

    const getCardStyles = (status: CardStatus): string => {
        switch (status) {
            case "operational":
                return ` ${classes.statusOperational}`;
            case "degraded":
                return ` ${classes.statusDegraded}`;
            case "outage":
                return ` ${classes.statusOutage}`;
            case "maintainance":
                return ` ${classes.statusMaintainance}`;
        }
    }

    const getCardTitle = (status: CardStatus) => {
        switch (status) {
            case "operational":
                return <span><span className={classes.statusIcon}>&#10003;</span>All Systems Are Operational</span>
            case "degraded":
                return <span><span className={classes.statusIcon}>!</span>Degraded System Availability</span>
            case "outage":
                return <span><span className={classes.statusIcon}>&#10005;</span>System Outage</span>
            case "maintainance":
                return <span><span className={classes.statusIcon}>&#128679;</span>System Under Maintainance</span>
        }
    }

    return (
        <Card className={`${classes.statusCard}${getCardStyles(props.status)}`}>
            <CardContent className={classes.cardContent}>
                {getCardTitle(props.status)}
            </CardContent>
        </Card>
    );
}

export default AllStatusCard;