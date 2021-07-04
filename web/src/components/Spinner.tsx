import { CircularProgress, Container, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
	spinnerWrapper: {
		display: "flex",
		justifyContent: "center",
		marginTop: "30%",
	}
}))

const Spinner = () => {
	const classes = useStyles();

	return (
		<Container className={classes.spinnerWrapper}>
			<CircularProgress />
		</Container>
	);
};

export default Spinner;
