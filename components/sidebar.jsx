import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'
import React from 'react'
import styles from '../styles/sidebar.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faLock, faLockOpen, faListCheck, faChartPie, faUsers, faFileCircleCheck, faCheck, faCertificate, faWarning, faCalendar, faBell } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleMenu }) => {
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

    return (
        <nav className={`${styles.sidebar} ${!isOpen ? styles.hide : ''}`}>
            <button onClick={toggleMenu} type="button" id={styles.toggleBtn}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className={styles.sidebarMenu}>
                <li className={styles.sidebarItem}>
                    <FontAwesomeIcon icon={faHome} className={styles.sidebarIcon} />
                    <a href={'/'} className={styles.sidebarLink}>Inicio</a>
                </li>

                {
                    authUser && (
                        <>
                            <li className={styles.sidebarItem}>
                                <FontAwesomeIcon icon={faListCheck} className={styles.sidebarIcon} />
                                <a className={styles.sidebarLink}>Gestion</a>
                            </li>
                            <ul>
                                {
                                    menusGestion && menusGestion?.map((m, i) => (
                                        <li key={i}>
                                            <a href={m?.menu?.url}>
                                                {m?.menu?.menuSistema}
                                            </a>
                                            <FontAwesomeIcon
                                                icon={
                                                    m?.menu?.menuSistema === 'Usuarios' ? faUsers
                                                        : m?.menu?.menuSistema === 'Asistencias' ? faFileCircleCheck
                                                            : m?.menu?.menuSistema === 'Asistencia Docente' ? faFileCircleCheck
                                                                : m?.menu?.menuSistema === 'Notas' ? faCheck
                                                                    : m?.menu?.menuSistema === 'Certificado de Servicio' ? faCertificate
                                                                        : m?.menu?.menuSistema === 'Sanciones' ? faWarning
                                                                            : m?.menu?.menuSistema === 'Material de Estudio' ? faListCheck
                                                                                : m?.menu?.menuSistema === 'Fecha de Examen' ? faCalendar
                                                                                    :
                                                                                    faBell}
                                            />
                                        </li>

                                    ))
                                }
                            </ul>
                            {
                                menusReportes &&
                                (
                                    <>
                                        <ul>
                                            <li className={styles.sidebarItem}>
                                                <FontAwesomeIcon icon={faChartPie} className={styles.sidebarIcon} />
                                                <a href={'/projects'} className={styles.sidebarLink}>Reportes</a>
                                            </li>
                                            {menusReportes?.map((m, i) => (
                                                <li key={i}>
                                                    <a href={m?.menu?.url}>
                                                        {m?.menu?.menuSistema}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )

                            }

                            <li className={styles.sidebarItem}>
                                <FontAwesomeIcon icon={faUser} className={styles.sidebarIcon} />
                                <a href={'/gestion/cuenta'} className={styles.sidebarLink}>Perfil</a>
                            </li>
                            <li className={styles.sidebarItem}>
                                <FontAwesomeIcon icon={faLock} className={styles.sidebarIcon} />
                                <a onClick={logout} className={styles.sidebarLink}>Cerrar Sesion</a>
                            </li>
                        </>
                    )
                }
                {
                    !authUser && (
                        <li className={styles.sidebarItem}>
                            <FontAwesomeIcon icon={faLockOpen} className={styles.sidebarIcon} />
                            <a href={'/gestion/cuenta/login'} className={styles.sidebarLink}>Iniciar Sesion</a>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Sidebar

