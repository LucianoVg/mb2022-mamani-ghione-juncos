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
import { HomeOutlined } from '@mui/icons-material';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined'
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import React from 'react'

import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 280,
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


const Sidebar = ({ open, toggleDrawer }, { menus }) => {
    const [menusGestion, setMenusGestion] = useState()
    const [menusReportes, setMenusReportes] = useState()
    const router = useRouter()
    const { loading, authUser, cerrarSesion } = useAuth()

    useEffect(() => {
        if (!loading && authUser) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
                .then(res => {
                    if (res.data) {
                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/gestion`)
                            .then(r => {
                                if (r.data) {
                                    console.log(r.data);
                                    setMenusGestion(r.data)
                                }
                            })

                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/reportes`)
                            .then(r => {
                                if (r.data) {
                                    console.log(r.data);
                                    setMenusReportes(r.data)
                                }
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
        <Drawer sx={{ height: '100vh' }} variant="permanent" open={open} >
            <Toolbar id="parent"
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
            <List id="child" component="nav">
                <React.Fragment>
                    <ListItemButton onClick={() => router.push('/')}>
                        <ListItemIcon>
                            <HomeOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                    <Divider sx={{ mt: 1, mb: 1 }} />

                    {
                        menusGestion && (
                            <>

                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton disabled style={{ opacity: '200%' }}>
                                            <ListItemIcon>
                                                <SegmentIcon />
                                            </ListItemIcon>
                                            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }} >
                                                Gestion
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                </List>

                                {
                                    menusGestion?.map((m, i) => (

                                        <ListItemButton key={i} href={m?.menu?.url} >
                                            <ListItemIcon>
                                                {
                                                    m?.menu?.menuSistema === 'Usuarios' && <AssignmentIndOutlinedIcon />
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Asistencias' && (
                                                        <ContentPasteSearchOutlinedIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Asistencia Docente' && (
                                                        <ContentPasteSearchOutlinedIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Notas' && (
                                                        <DescriptionIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Certificado de Servicio' && (
                                                        <DescriptionIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Sanciones' && (
                                                        <ReportIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Material de Estudio' && (
                                                        <FileCopyIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Fecha de Examen' && (
                                                        <ArticleIcon />
                                                    )
                                                }
                                                {
                                                    m?.menu?.menuSistema === 'Notificaciones' && (
                                                        <NotificationsRoundedIcon />
                                                    )
                                                }
                                            </ListItemIcon>
                                            <ListItemText primary={m?.menu?.menuSistema} />
                                        </ListItemButton>
                                    ))
                                }
                                <Divider sx={{ mt: 1, mb: 1 }} />
                            </>
                        )
                    }

                    {
                        menusReportes && (
                            <>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton disabled style={{ opacity: '200%' }}>
                                            <ListItemIcon>
                                                <EqualizerIcon />
                                            </ListItemIcon>
                                            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }} >
                                                Reportes
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                                {
                                    menusReportes?.map((m, i) => (

                                        <ListItemButton key={i} href={m?.menu?.url}>
                                            <ListItemIcon>
                                                <AssessmentIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={m?.menu?.menuSistema} />
                                        </ListItemButton>
                                    ))
                                }
                                <Divider sx={{ mt: 1, mb: 1 }} />
                            </>
                        )
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
                </React.Fragment>
            </List>
        </Drawer>
    )
}

export const getServerSideProps = async (ctx) => {
    const res = await axios.get()

    return {
        props: {
            menus
        }
    }
}

export default Sidebar

