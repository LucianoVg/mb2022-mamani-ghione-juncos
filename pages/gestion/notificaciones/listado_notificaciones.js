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
            <Container >


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

                        sx={{ borderRight: 1, borderBottom: 1, borderColor: 'divider', width: '300px' }}
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


                                <div >
                                    <h1 style={{ textAlign: 'center' }}>{n.asunto}</h1>
                                    <Typography component={'span'} variant={'body2'}>{n.contenido} </Typography>
                                       
                                        <h3>
                                            Atte. Direccion
                                        </h3>
                                </div>



                            </TabPanel>
                        ))
                    }

                </Box>



            </Container  >

        </Layout >
    );
}

