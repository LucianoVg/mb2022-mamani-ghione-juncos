import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Button, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, Tab, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react'
import styles from "../../../styles/tarjetaNoticias.module.css";
import axios from "axios";

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
                    {children}
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
    useEffect(() => {
        ListarNotificacion()

        // filtros()
    }, [])

    const [listNotificaciones, setListNotificaciones] = useState()
    const ListarNotificacion = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/`)
            .then(res => {
                console.log(res.data);
                setListNotificaciones(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    return (
        <Layout>
            <div xs={12}>


                <Box
                    minWidth={280}

                    className={`${styles.box}`}

                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 550 }}
                >

                    <Tabs

                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        scrollButtons="auto"
                        minWidth={200}
                        sx={{ borderRight: 1, borderColor: 'divider', width: '300px' }}
                    >

                        {
                            listNotificaciones && listNotificaciones.map((n, i) => (
                                <Tab
                                    key={i}
                                    label={n.asunto} {...a11yProps(i)}
                                    sx={{ borderBottom: 1, borderColor: 'divider' }} />
                            ))
                        }

                    </Tabs>
                    {
                        listNotificaciones && listNotificaciones.map((n, i) => (
                            <TabPanel
                                key={i}
                                value={value}
                                index={i}
                                style={{ width: '680px' }}
                                container="true"
                            >



                                <Typography textAlign="center" variant={'h6'}
                                    sx={{ marginBottom: '30px' }}
                                ><strong>{n.asunto}</strong> </Typography>
                                <Typography variant={'body2'}
                                    sx={{ marginBottom: '30px' }}
                                >{n.contenido} </Typography>
                                <Typography variant="caption"> <strong>Atte. Direccion</strong></Typography>





                            </TabPanel>
                        ))
                    }

                </Box>



            </div  >

        </Layout >
    );
}

