import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Assessment, Home, TableChart } from '@mui/icons-material';
import { ListItemButton, ListItem, ListItemIcon, ListItemText, Box, Drawer } from '@mui/material';
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined'
import DescriptionIcon from '@mui/icons-material/Description';
import ReportIcon from '@mui/icons-material/Report';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import React from 'react'
import EventIcon from '@mui/icons-material/Event';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SegmentIcon from '@mui/icons-material/Segment';
import { Navbar } from './navbar';
import Link from 'next/link';
import axios from 'axios';

const Sidebar = ({ menusGestion, menusReportes }) => {
    const router = useRouter()
    const { authUser, cerrarSesion } = useAuth()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [usuario, setUsuario] = useState({ rol: '' })

    useEffect(() => {
        traerUsuario()
    }, [authUser, usuario.rol])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.status === 200) {
            setUsuario({ rol: res.data?.rol?.tipo })
        }
    }
    const list = () => (
        <Box
            style={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenDrawer(!openDrawer)}
            onKeyDown={() => setOpenDrawer(!openDrawer)}>

            <ListItem disablePadding sx={{ mt: 3 }}>
                <ListItemButton>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <Link href={'/'} style={{ textDecoration: 'none', color: '#212121' }}>
                        <Typography variant='h6'>Inicio</Typography>
                    </Link>
                </ListItemButton>
            </ListItem>
            {
                authUser && usuario.rol !== 'Estudiante' && (
                    <ListItem disablePadding sx={{ mt: 3 }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <Link href={'/dashboard'} style={{ textDecoration: 'none', color: '#212121' }}>
                                <Typography variant='h6'>Estadisticas</Typography>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                )
            }
            {
                menusGestion && menusGestion?.length > 0 && (
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
                                <ListItemButton key={i}>
                                    <ListItemIcon>
                                        {
                                            m?.menu?.menusistema === 'Usuarios' && <AssignmentIndOutlinedIcon />
                                        }
                                        {
                                            m?.menu?.menusistema === 'Asistencias' && (
                                                <ContentPasteSearchOutlinedIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Asistencia Docente' && (
                                                <ContentPasteSearchOutlinedIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Notas' && (
                                                <DescriptionIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Certificado de Servicio' && (
                                                <DescriptionIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Sanciones' && (
                                                <ReportIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Material de Estudio' && (
                                                <FileCopyIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Fecha de Examen' && (
                                                <EventIcon />
                                            )
                                        }
                                        {
                                            m?.menu?.menusistema === 'Notificaciones' && (
                                                <NotificationsRoundedIcon />
                                            )
                                        }
                                    </ListItemIcon>
                                    <Link
                                        style={{ textDecoration: 'none', color: '#212121' }}
                                        href={m?.menu?.url}>
                                        <ListItemText primary={m?.menu?.menusistema} />
                                    </Link>
                                </ListItemButton>
                            ))
                        }
                        <Divider sx={{ mt: 1, mb: 1 }} />
                    </>
                )
            }

            {
                menusReportes && menusReportes?.length > 0 && (
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
                                <ListItemButton key={i}>
                                    <ListItemIcon>
                                        <TableChart />
                                    </ListItemIcon>
                                    <Link
                                        style={{ textDecoration: 'none', color: '#212121' }}
                                        href={m?.menu?.url}>
                                        <ListItemText primary={m?.menu?.menusistema} />
                                    </Link>
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
        </Box>
    );
    const logout = () => {
        cerrarSesion()
            .then(() => {
                router.reload()
            })
    }

    return (
        <React.Fragment>
            <Navbar toggleDrawer={() => setOpenDrawer(!openDrawer)} />
            <Drawer
                style={{ display: 'flex', }}
                anchor={'left'}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
                {list()}
            </Drawer>
        </React.Fragment>
    )
}

export default Sidebar

