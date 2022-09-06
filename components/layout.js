import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { HomeOutlined, InfoOutlined } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from './context/authUserProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import axios from 'axios';
import Head from 'next/head';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
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


export function Layout({ children }) {
    const [open, setOpen] = useState(true);
    const [menus, setMenus] = useState()
    const router = useRouter()

    const { loading, authUser, cerrarSesion } = useAuth()
    const toggleDrawer = () => {
        setOpen(!open);
    }
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
        <>
            <Head>
                <title>Instituto Privado &quot;El Salvador&quot;</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Instituto Privado &quot;El Salvador&quot;
                        </Typography>

                        <Typography href='/gestion/institucional' component={'a'} variant="body1" sx={{ mr: 1, textDecoration: 'none' }} color='white'>
                            Institucional
                        </Typography>

                        {
                            authUser && (
                                <AccountCircleIcon />
                            )
                        }
                    </Toolbar>
                </AppBar>
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
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <React.Fragment>
                            {children}
                        </React.Fragment>
                    </Container>
                </Box>
            </Box>
        </>

    );
}