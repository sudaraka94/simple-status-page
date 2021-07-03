import { Box, Button, Container, FormGroup, makeStyles, TextField, Theme } from "@material-ui/core";
import { useFormik } from "formik";
import { SiteInfo } from "../typedefs";

const useStyles = makeStyles((theme: Theme) => ({
    formGroup: {
        marginTop: "2vh"
    }
}))

const SiteInfoEditor = (props: { siteInfo: SiteInfo, updateSiteInfo: (siteInfo: SiteInfo) => void }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: { siteTitle: props.siteInfo.title },
        onSubmit: values => {
            props.updateSiteInfo({
                title: values.siteTitle,
            });
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} autoComplete="off">
            <Box flexDirection="column">
                <FormGroup className={classes.formGroup}>
                    <TextField id="siteTitle" name="siteTitle" onChange={formik.handleChange}
                        value={formik.values.siteTitle} label="Site Title" variant="outlined" />
                </FormGroup>
                <FormGroup className={classes.formGroup}>
                    <Button variant="contained" type="submit" color="primary">Update</Button>
                </FormGroup>
            </Box>
        </form>
    )
}

export default SiteInfoEditor;