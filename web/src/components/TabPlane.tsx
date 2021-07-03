import React, { useCallback, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    component?: React.ReactNode;
    index: any;
    value: any;
}

interface Tab {
    title: string,
    tabContent: React.ReactNode,
}

interface TabPlaneProps {
    tabs: Tab[]
}

function TabPanel(props: TabPanelProps) {
    const { component, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>{component}</Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const TabPlane = (props: TabPlaneProps) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }, [setValue]);

    return (
        <div className={classes.root}>
            <AppBar color='inherit' position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    {props.tabs.map((tab, index) => <Tab key={index} label={tab.title} {...a11yProps(index)} />)}
                </Tabs>
            </AppBar>
            {props.tabs.map((tab, index) => (
                <TabPanel key={index} value={value} index={index} component={tab.tabContent} />
            ))}
        </div>
    );
}

export default TabPlane;