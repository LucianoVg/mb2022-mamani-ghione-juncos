import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'
import MuiDrawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { HomeOutlined, InfoOutlined } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined'
import React from 'react'

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const Sidebar = ({ open, toggleDrawer }) => {
    const [menus, setMenus] = useState([])
    const router = useRouter()
    const { loading, authUser, cerrarSesion } = useAuth()

    useEffect(() => {
        if (!loading && authUser) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
                .then(res => {
                    if (res.data) {
                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}`)
                            .then(r => {
                                console.log(r.data);
                                setMenus(r.data)
                            })
                    }
                })
        }
    }, [authUser, loading])

    const logout = () => {
        cerrarSesion()
            .then(() => {
                router.reload()
            })
    }

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <List component="nav">
                <React.Fragment>
                    <ListItemButton onClick={() => router.push('/')}>
                        <ListItemIcon>
                            <HomeOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                    <Divider sx={{ mt: 1, mb: 1 }} />

                    {
                        menus && (
                            <Typography ml={1} style={{ fontWeight: 'bold' }}>Gestion</Typography>
                        )
                    }
                    {
                        menus && menus.map((m, i) => (
                            <ListItemButton key={i} onClick={() => router.push(m?.menu?.url)}>
                                <ListItemIcon>
                                    {
                                        m?.menu?.menuSistema === 'Usuarios' && <AssignmentIndOutlinedIcon />
                                    }
                                    {
                                        m?.menu?.menuSistema === 'Asistencias' && <ContentPasteSearchOutlinedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={m?.menu?.menuSistema} />
                            </ListItemButton>
                        ))
                    }

                    {
                        authUser && (
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cerrar Sesion" />
                            </ListItemButton>
                        )
                    }
                    {
                        !authUser && (
                            <ListItemButton onClick={() => router.push('/gestion/cuenta/login')}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Iniciar Sesion" />
                            </ListItemButton>
                        )
                    }
                    {/* <Typography style={{ fontWeight: 'bold' }}>Reportes</Typography>
            <ListItemButton onClick={() => router.push('/')}>
                <ListItemIcon>
                    <HomeOutlined />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push('/about')}>
                <ListItemIcon>
                    <InfoOutlined />
                </ListItemIcon>
                <ListItemText primary="Sanciones" />
            </ListItemButton> */}
                </React.Fragment>
            </List>
        </Drawer>
    )
}

export default Sidebar

