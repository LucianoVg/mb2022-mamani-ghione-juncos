import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faFileCircleCheck, faHome, faLockOpen, faPieChart } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ children }) => {
    const [menusGestion, setMenusGestion] = useState()
    const [menusReportes, setMenusReportes] = useState()
    const router = useRouter()
    const { loading, authUser, cerrarSesion } = useAuth()
    const [usuario, setUsuario] = useState({ rol: '' })

    useEffect(() => {
        // closeNav()
        if (!loading && authUser) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
                .then(res => {
                    if (res.data) {
                        setUsuario({ rol: res.data?.rol?.tipo })
                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/gestion`)
                            .then(r => {
                                if (r.data) {
                                    console.log(r.data);
                                    setMenusGestion(r.data)
                                }
                            })

                        // axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/reportes`)
                        //     .then(r => {
                        //         if (r.data) {
                        //             console.log(r.data);
                        //             setMenusReportes(r.data)
                        //         }
                        //     })
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

    /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Docente'
            || usuario.rol === 'Secretario'
            || usuario.rol === 'Director'
            || usuario.rol === 'Vicedirector'
    }
    return (
        <div className="container-fluid" id='mySidenav'>
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <a href="/" className="nav-link align-middle px-0">
                                    <FontAwesomeIcon
                                        icon={faHome} />
                                    <span className="ms-1 d-none d-sm-inline">Inicio</span>
                                </a>
                            </li>
                            {
                                authUser
                                && tienePermisos()
                                && (
                                    <li>
                                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                            <FontAwesomeIcon
                                                icon={faFileCircleCheck} />
                                            <span className="ms-1 d-none d-sm-inline">Gestion</span></a>
                                        <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                            {
                                                menusGestion && menusGestion?.map(m => (
                                                    <li key={m.id} className="w-100">
                                                        <a href={m.menu?.url} className="nav-link px-0"> <span className="d-none d-sm-inline">{m.menu?.menuSistema}</span>
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                            {/* <li>
                                <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <FontAwesomeIcon
                                        icon={faPieChart} />
                                    <span className="ms-1 d-none d-sm-inline">Reportes</span> </a>
                                <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                                    </li>
                                </ul>
                            </li> */}
                            <li>
                                <a href="/gestion/cuenta/login" className="nav-link px-0 align-middle">
                                    <FontAwesomeIcon
                                        icon={faLockOpen} />
                                    <span className="ms-1 d-none d-sm-inline">
                                        Iniciar Sesion
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col py-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Sidebar


{/* <Drawer sx={{ height: '100vh' }} variant="permanent" open={open} >
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
                                            <EventIcon />
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

        {/* {
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
        } */}
//         {
//             authUser && (
//                 <ListItemButton onClick={logout}>
//                     <ListItemIcon>
//                         <LogoutIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Cerrar Sesion" />
//                 </ListItemButton>
//             )
//         }
//         {
//             !authUser && (
//                 <ListItemButton onClick={() => router.push('/gestion/cuenta/login')}>
//                     <ListItemIcon>
//                         <LoginIcon />
//                     </ListItemIcon>
//                     <ListItemText primary="Iniciar Sesion" />
//                 </ListItemButton>
//             )
//         }
//     </React.Fragment>
// </List>
// </Drawer> */}