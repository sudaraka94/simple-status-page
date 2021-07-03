import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import DataGrid from "../components/DataGrid";
import { useCallback, useEffect, useState } from "react";
import { addComponent, deleteComponent, getComponents } from "../api/firebaseDataWrapper";
import { addSnackBarAlert } from "../slices/alertSlice";
import { removeItemFromArray } from "../util";
import store from "../store";

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

const Admin = () => {
    const classes = useStyles();
    const [statusComps, setStatusComps] = useState<any[]>([]);

    useEffect(() => {
        getComponents().then(components => {
            setStatusComps(components);
        })
    }, []);

    const onAddComponent = useCallback(component => {
        return new Promise<void>((resolve, reject) => {
            if (!component.status || !component.title) {
                store.dispatch(addSnackBarAlert('error', 'Title and Status fields are required'));
                reject();
                return;
            }

            addComponent(component).then((compRef: string) => {
                console.log(statusComps)
                setStatusComps([
                    ...statusComps,
                    { id: compRef, ...component }
                ]);
                store.dispatch(addSnackBarAlert('success', 'Component added successfully!'));
                resolve();
            }).catch(err => {
                store.dispatch(addSnackBarAlert('error', `Failed to add component with error: ${err}`));
                reject();
            })
        });
    }, [statusComps]);

    const onDeleteComponent = useCallback(row => {
        const componentId = row.id;
        return new Promise<void>((resolve, reject) => {
            deleteComponent(componentId).then(() => {
                setStatusComps(removeItemFromArray(statusComps, "id", componentId));
                store.dispatch(addSnackBarAlert('success', 'Component deleted successfully!'));
                resolve();
            }).catch(err => {
                store.dispatch(addSnackBarAlert('error', `Failed to delete component with error: ${err}`));
                reject();
            })
        });
    }, [statusComps]);

    return (
        <Container className={classes.mainContent}>
            <Typography className={classes.pageHeading} variant="h3">&#9749; Admin Dashboard</Typography>
            <Container>
                <DataGrid
                    editable={{
                        onRowAdd: onAddComponent,
                        onRowDelete: onDeleteComponent,
                    }}
                    options={{
                        paging: false
                    }}
                    columns={[
                        { title: "Id", field: "id", editable: "never" },
                        { title: "Title", field: "title" },
                        { title: "Status", field: "status", lookup: { "operational": "Operational", "degraded": "Degraded", "outage": "Outage", "maintainance": "Maintainance" } }
                    ]}
                    data={statusComps}
                    title="Components" />
            </Container>
        </Container>
    );
}

export default Admin;