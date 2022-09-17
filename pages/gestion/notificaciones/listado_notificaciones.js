import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Button, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from '@mui/material/Divider';
import { Card, CardContent, CardActions, CardMedia } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'

import { Edit } from "@mui/icons-material";



// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 5 }}>
//                     <Typography>{children}</Typography>

//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

export default function ListadoNotificaciones() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Container>

                <Box
                    // style={{ backgroundColor: 'red' }}
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600, width: 300 }}
                >
                    <Tabs

                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '400px' }}

                    >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                        <Tab label="Item Eight" />
                        <Tab label="Item Nine" />
                        <Tab label="Item Ten" />
                        <Tab label="Item Seven" />
                        <Tab label="Item Eight" />
                        <Tab label="Item Nine" />
                        <Tab label="Item Ten" />

                    </Tabs>
                    {/* <TabPanel value={value} index={0}>
                    Item One
             
                       <h1 align="right">Asueto Docente</h1> */}

                    {/* </TabPanel>
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
                </TabPanel> */}
                </Box>


            </Container  >

            <Container >
                <Card sx={{ maxWidth: 345, height: 500 }}>
                    <div style={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://v4.mui.com/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <a href="#/" style={{ position: 'absolute', left: 295, bottom: 250, }}>
                            <IconButton  >
                                <Edit style={{color: 'white'}} />
                            </IconButton>
                        </a>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        </Layout >
    );
}

