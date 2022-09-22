import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Button, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';


import { useEffect, useState } from 'react'

import { Card, CardContent, CardActions, CardMedia } from "@mui/material";
import { Edit } from "@mui/icons-material";
import styles from "../../../styles/tarjetaNoticias.module.css";


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
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Container >

                <Box
                    // style={{ po}}
                    className={`${styles.box}`}

                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 550 }}
                >

                    <Tabs

                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        scrollButtons="auto"


                        sx={{ borderRight: 1, borderBottom: 1, borderColor: 'divider', width: '300px' }}
                    >


                        <Tab
                            label="Item One"  {...a11yProps(0)}
                            sx={{ borderBottom: 1, borderColor: 'divider' }} />

                        <Tab
                            label="Item Two" {...a11yProps(1)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }}
                        />

                        <Tab label="Item Three" {...a11yProps(2)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Four" {...a11yProps(3)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />
                        <Tab label="Item Five" {...a11yProps(4)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Six" {...a11yProps(5)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Seven" {...a11yProps(6)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />
                        <Tab label="Item Five" {...a11yProps(7)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Six" {...a11yProps(8)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Seven" {...a11yProps(9)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Five" {...a11yProps(10)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                        <Tab label="Item Six" {...a11yProps(11)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }}
                        />

                        <Tab label="Item Seven" {...a11yProps(12)}
                            sx={{ borderBottom: 2, borderColor: 'divider' }} />

                    </Tabs>
                    <TabPanel
                        value={value}
                        index={0}
                        style={{ width: 680 }}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>
                            <Grid item xs={4}>

                                <h1 style={{ textAlign: 'justify' }}> Item One</h1>



                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>

                            <Grid item disablePadding xs={12}>
                                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.</h3>
                            </Grid>
                            <Grid item xs={12} disablePadding>
                                <h3>
                                    Atte. Direccion
                                </h3>
                            </Grid>

                        </Grid>

                    </TabPanel>
                    <TabPanel value={value}
                        index={1}
                        style={{ width: 680 }}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>
                            <Grid item xs={4}>

                                <h1 style={{ textAlign: 'justify' }}> Item Two</h1>



                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>

                            <Grid item disablePadding xs={12}>
                                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.</h3>
                            </Grid>
                            <Grid item xs={12} disablePadding>
                                <h3>
                                    Atte. Direccion
                                </h3>
                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel
                        value={value}
                        index={2}
                        style={{ width: 680 }}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>
                            <Grid item xs={4}>

                                <h1 style={{ textAlign: 'justify' }}> Item Three</h1>



                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>

                            <Grid item disablePadding xs={12}>
                                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.</h3>
                            </Grid>
                            <Grid item xs={12} disablePadding>
                                <h3>
                                    Atte. Direccion
                                </h3>
                            </Grid>

                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}
                        style={{ width: 680 }}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={12} disablePadding>

                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>
                            <Grid item xs={4}>

                                <h1 style={{ textAlign: 'justify' }}> Item Four</h1>



                            </Grid>
                            <Grid item xs={4} disablePadding>

                            </Grid>

                            <Grid item disablePadding xs={12}>
                                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.</h3>
                            </Grid>
                            <Grid item xs={12} disablePadding>
                                <h3>
                                    Atte. Direccion
                                </h3>
                            </Grid>

                        </Grid>
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

                </Box>



            </Container  >

        </Layout >
    );
}

