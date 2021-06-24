import { Card, CardContent, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
    statusCard: {
        backgroundColor: "#22C55E",
        color: "white",
        margin: "45px 0 20px 0",
        fontWeight: 800,
        fontSize: "16px",
    },
    cardContent: {
        paddingBottom: "15px!important"
    }
}));


const AllStatusCard = (props: { title: string }) => {
    let classes = useStyle();

    return (
        <Card className={classes.statusCard}>
            <CardContent className={classes.cardContent}>
                &#10003; {props.title}
            </CardContent>
        </Card>
    );
}

export default AllStatusCard;