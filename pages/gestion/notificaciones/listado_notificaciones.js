import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box, Button, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, Tab, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react'
import styles from "../../../styles/tarjetaNoticias.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../../components/context/authUserProvider";

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
    const router = useRouter()
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: '' })
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        ListarNotificaciones()
    }, [usuario.id, loading, authUser])

    const [notificaciones, setNotificaciones] = useState()
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id })
        }
    }
    const ListarNotificaciones = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/${usuario?.id}`)
            .then(res => {
                console.log(res.data);
                setNotificaciones(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    return (
        <Layout>
            <div xs={12}>
                <Box
                    className={`${styles.box}`}

                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 550, minWidth: '280px' }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        scrollButtons="auto"
                        sx={{ borderRight: 1, borderColor: 'divider', width: '300px', minWidth: '120px' }}
                    >

                        {
                            notificaciones && notificaciones.map((n, i) => (
                                <Tab
                                    key={i}
                                    label={n.notificacion?.asunto} {...a11yProps(i)}
                                    sx={{ borderBottom: 1, borderColor: 'divider' }} />
                            ))
                        }

                    </Tabs>
                    {
                        notificaciones && notificaciones.map((n, i) => (
                            <TabPanel
                                key={i}
                                value={value}
                                index={i}
                                style={{ width: '680px' }}
                                container="true"
                            >
                                <Typography textAlign="center" variant={'h6'}
                                    sx={{ marginBottom: '30px' }}
                                ><strong>{n.notificacion?.asunto}</strong> </Typography>
                                <Typography variant={'body2'}
                                    sx={{ marginBottom: '30px' }}
                                >{n.notificacion?.contenido} </Typography>
                                <Typography variant="caption"> <strong>Atte. {n.usuario?.rol?.tipo}</strong></Typography>
                            </TabPanel>
                        ))
                    }
                </Box>
            </div>
        </Layout >
    );
}

