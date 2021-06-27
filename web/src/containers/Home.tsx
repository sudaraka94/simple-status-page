import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getComponents } from "../api/firebaseDataWrapper";
import AllStatusCard, { CardStatus } from "../components/AllStatusCard";
import StatusCard from "../components/StatusCard";

const useStyles = makeStyles((theme: Theme) => ({
    mainContent: {
        marginTop: "5vh",
    },
    pageHeading: {
        fontWeight: 800,
        marginTop: "1vh",
        marginBottom: "1vh"
    }
}));

const Home = () => {
    const classes = useStyles();
    const [statusComps, setStatusComps] = useState<any[]>([]);
    const [overallStatus, setOverallStatus] = useState<CardStatus>("operational");

    const setOverallSystemStatus = (components: any[]) => {
        let iOverallStatus:CardStatus = "operational" 

        for (let i = 0; i < components.length; i++) {
            let status = components[i] && components[i].status;
            switch (status) {
                case "degraded":
                    if (["operational", "maintainance"].includes(iOverallStatus)) iOverallStatus = "degraded";
                    break;
                case "outage":
                    if (["operational", "degraded", "maintainance"].includes(iOverallStatus)) iOverallStatus = "outage";
                    break;
                case "maintainance":
                    if (iOverallStatus === "operational") iOverallStatus = "maintainance";
            }
        }

        setOverallStatus(iOverallStatus);
    }

    useEffect(() => {
        getComponents().then(components => {
            setStatusComps(components);
            setOverallSystemStatus(components);
        })
    }, []);

    return (
        <>
            <Container className={classes.mainContent}>
                <Typography className={classes.pageHeading} variant="h3">&#127968; Simple Status Page</Typography>
                <Container>
                    <AllStatusCard status={overallStatus} />
                    <Typography variant="h5">Current Status</Typography>
                    <Container>
                        {statusComps.map(component => (<StatusCard key={component.title} title={component.title} status={component.status} />))}
                    </Container>
                </Container>
            </Container>
        </>
    )
}

export default Home;