import { useEffect, useState } from 'react'
import axios from "axios";

import { CircularProgress } from "@mui/material";
import { Box, Button, Tooltip, IconButton, Container, Badge, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { ButtonUnstyled } from "@mui/base";
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Popover from '@mui/material/Popover';
import { useAuth } from './context/authUserProvider';



export const Notificacion = () => {
    const { loading, authUser } = useAuth()

    const [listNotificaciones, setListNotificaciones] = useState()
    const [usuario, setUsuario] = useState({ id: '' })
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        if (!localStorage.getItem('vistas')) {
            localStorage.setItem('vistas', true)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (!loading && authUser) {
            traerUsuario()
            ListarNotificacion()
        }
    }, [loading, authUser, usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const ListarNotificacion = () => {
        if (usuario.id.length) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/${usuario.id}`)
                .then(res => {
                    setListNotificaciones(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
    }
    return (
        <Container>
            <div>
                <Tooltip title='Ver Notificacion'>
                    <IconButton onClick={handleClick}>
                        <Badge

                            aria-describedby={id} variant="contained"
                            badgeContent={!Boolean(localStorage.getItem('vistas')) && listNotificaciones ?
                                listNotificaciones.length : 0}

                            color="info"
                            style={{ float: 'right' }}  >

                            <NotificationsRoundedIcon sx={{ cursor: 'pointer', color: 'white' }} />

                        </Badge>
                    </IconButton>
                </Tooltip>


                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: { width: '320px' },
                    }}

                >
                    <List>
                        {
                            listNotificaciones && listNotificaciones.map((n, i) => (
                                <ListItem key={i} disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary={n.notificacion?.asunto} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                        {
                            !listNotificaciones || !listNotificaciones.length && (
                                <ListItem>
                                    <ListItemText>No hay notificaciones</ListItemText>
                                </ListItem>
                            )
                        }
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="/gestion/notificaciones/listado_notificaciones" >
                                <ListItemText>
                                    <div style={{ textAlign: 'center' }}>
                                        <strong> Ver todo</strong>
                                    </div>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Popover>

            </div >
        </Container >


    )
}

export default Notificacion