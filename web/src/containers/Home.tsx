import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import AllStatusCard from "../components/AllStatusCard";
import StatusCard from "../components/StatusCard";

const useStyle = makeStyles((theme: Theme) => ({
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
    let classes = useStyle();

    return (
        <>
            <Container className={classes.mainContent}>
                <Typography className={classes.pageHeading} variant="h3">&#127968; Simple Status Page</Typography>
                <Container>
                    <AllStatusCard title="All Systems Are Operational" />
                    <Typography variant="h5">Current Status</Typography>
                    <Container>
                        <StatusCard title="LearnOne API" status="operational" />
                        <StatusCard title="LearnOne UI" status="operational" />
                        <StatusCard title="LearnOne Home" status="operational" />
                    </Container>
                </Container>
            </Container>
        </>
    )
}

export default Home;