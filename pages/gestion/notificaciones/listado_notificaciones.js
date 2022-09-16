import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Button, TextareaAutosize, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from '@mui/material/Divider';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                    <h1 style={{alignContent: 'center'}}>Asueto Docente</h1>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function ListadoNotificaciones() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Box
        
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
            >
                <Tabs
              
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: '400px' }}
                    style={{ textAlign: 'left'}}
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} />
                    <Tab label="Item Eight" {...a11yProps(7)} />
                    <Tab label="Item Nine" {...a11yProps(8)} />
                    <Tab label="Item Ten" {...a11yProps(9)} />
         

                </Tabs>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
                </TabPanel>
                <TabPanel value={value} index={7}>
                    Item Eight
                </TabPanel>
                <TabPanel value={value} index={8}>
                    Item Nine
                </TabPanel>
                <TabPanel value={value} index={9}>
                    Item Ten
                </TabPanel>
            </Box>
        </Layout>
    );
}

