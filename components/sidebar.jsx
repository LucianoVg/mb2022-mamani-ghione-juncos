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


