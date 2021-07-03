import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchSiteInfo, getComponents } from "../api/firebaseDataWrapper";
import AllStatusCard, { CardStatus } from "../components/AllStatusCard";
import StatusCard from "../components/StatusCard";
import { addSnackBarAlert } from "../slices/alertSlice";
import store from "../store";
import { Component, SiteInfo } from "../typedefs";

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
    const [siteInfo, setSiteInfo] = useState<SiteInfo>({ title: "" });
    const [statusComps, setStatusComps] = useState<Component[]>([]);
    const [overallStatus, setOverallStatus] = useState<CardStatus>("operational");

    const setOverallSystemStatus = (components: any[]) => {
        let iOverallStatus: CardStatus = "operational"

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

    const fetchData = async () => {
        // fetch info
        const siteInfo = await fetchSiteInfo();
        const components = await getComponents();
        // update status accordingly
        setSiteInfo(siteInfo);
        setStatusComps(components);
        setOverallSystemStatus(components);
    }

    useEffect(() => {
        fetchData().catch(err => {
            store.dispatch(addSnackBarAlert('error', 'Failed to fetch data'));
        });
    }, []);

    return (
        <Container className={classes.mainContent}>
            <Typography className={classes.pageHeading} variant="h3">&#127968; {siteInfo.title}</Typography>
            <Container>
                <AllStatusCard status={overallStatus} />
                <Typography variant="h5">Component Status</Typography>
                <Container>
                    {statusComps.map(component => (<StatusCard key={component.title} title={component.title} status={component.status} />))}
                </Container>
            </Container>
        </Container>
    )
}

export default Home;
