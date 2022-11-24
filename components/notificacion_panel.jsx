import { useEffect, useState } from 'react'
import axios from "axios";

import { Tooltip, IconButton, Container, Badge } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Popover from '@mui/material/Popover';
import { useAuth } from './context/authUserProvider';

export const Notificacion = () => {
    const { loading, authUser } = useAuth()

    const [notificaciones, setNotificaciones] = useState()
    const [usuario, setUsuario] = useState({ id: 0 })
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
            ListarNotificaciones()
        }
    }, [loading, authUser, usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const ListarNotificaciones = () => {
        if (usuario.id.length) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/${usuario.id}`)
                .then(res => {
                    setNotificaciones(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
    }
    return (
        <Container>
            <Tooltip title='Ver Notificacion'>
                <IconButton onClick={handleClick}>
                    <Badge

                        aria-describedby={id} variant="contained"
                        badgeContent={!localStorage.getItem('vistas') && notificaciones ?
                            notificaciones.length : null}

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
                        notificaciones && notificaciones?.map((n, i) => (
                            <ListItem key={i} disablePadding>
                                <ListItemButton component="a" href="/gestion/notificaciones/listado_notificaciones">
                                    <ListItemText primary={n.notificacion?.asunto} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                    {
                        !notificaciones || !notificaciones?.length && (
                            <ListItem>
                                <ListItemText>No hay notificaciones</ListItemText>
                            </ListItem>
                        )
                    }
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="/gestion/notificaciones/listado_notificaciones" >
                            <ListItemText>
                                <div style={{ textAlign: 'center' }}>
                                    <strong>Ver todo</strong>
                                </div>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Popover>
        </Container>
    )
}

export default Notificacion