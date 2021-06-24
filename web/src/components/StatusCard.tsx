import { Card, CardContent, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
    siteStatusCard: {
        backgroundColor: "white",
        margin: "20px 0 20px 0",
        fontWeight: 800,
        fontSize: "16px",
    },
    siteStatusContent: {
        display: "flex",
        justifyContent: "space-between"
    },
    cardContent: {
        paddingBottom: "15px!important"
    },
}));

const StatusCard = (props: { title: string, status: "operational" | "degraded" | "outage" | "maintainance" }) => {
    const classes = useStyle();

    return (
        <Card className={classes.siteStatusCard}>
            <CardContent className={classes.cardContent}>
                <div className={classes.siteStatusContent}>
                    {props.title}
                    {(
                        () => {
                            switch (props.status) {
                                case "operational":
                                    return <span>&#128994;</span>;
                                case "degraded":
                                    return <span>&#128994;</span>;
                                case "outage":
                                    return <span>&#128308;</span>;
                                case "maintainance":
                                    return <span>&#128119;</span>;
                            }
                        }
                    )()}
                </div>
            </CardContent>
        </Card>
    );
}

export default StatusCard;