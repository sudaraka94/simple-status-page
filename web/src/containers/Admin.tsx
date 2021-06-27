import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { AddBox, ArrowDownward, Search } from "@material-ui/icons";
import DataGrid from "../components/DataGrid";
import { useCallback, useEffect, useState } from "react";
import { addComponent, deleteComponent, getComponents } from "../api/firebaseDataWrapper";
import { addAlertWithTimeout, AlertSeverity, AlertType } from "../slices/alertSlice";
import { generateUUID, INDEX, removeItemFromArray } from "../util";
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
            addComponent(component).then((compRef: string) => {
                console.log()
                setStatusComps([
                    ...statusComps,
                    {id: compRef, ...component}
                ]);
                store.dispatch(addAlertWithTimeout({
                    id: generateUUID(),
                    severity: 'success' as AlertSeverity,
                    type: AlertType.SNACKBAR,
                    message: "Component added successfully!"
                }));
                resolve();
            }).catch(err => {
                store.dispatch(addAlertWithTimeout({
                    id: generateUUID(),
                    severity: 'error' as AlertSeverity,
                    type: AlertType.SNACKBAR,
                    message: `Failed to add component with error: ${err}`
                }));
                reject();
            })
        });
    }, []);

    const onDeleteComponent = useCallback(componentId => {
        return new Promise<void>((resolve, reject) => {
            deleteComponent(componentId).then(() => {
                setStatusComps(removeItemFromArray(statusComps, INDEX, componentId));
                store.dispatch(addAlertWithTimeout({
                    id: generateUUID(),
                    severity: 'success' as AlertSeverity,
                    type: AlertType.SNACKBAR,
                    message: "Component deleted successfully!"
                }));
                resolve();
            }).catch(err => {
                store.dispatch(addAlertWithTimeout({
                    id: generateUUID(),
                    severity: 'error' as AlertSeverity,
                    type: AlertType.SNACKBAR,
                    message: `Failed to delete component with error: ${err}`
                }));
                reject();
            })
        });
    }, []);

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