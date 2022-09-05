import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'

const Sidenav = () => {
    const [menus, setMenus] = useState([])
    const router = useRouter()
    const { loading, authUser, cerrarSesion } = useAuth()

    useEffect(() => {
        if (!loading && authUser) {
            axios.get(`http://localhost:3000/api/gestion/submenu?idRol=${1}`)
                .then(r => {
                    console.log(r.data);
                    setMenus(r.data)
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
        // scrolling-navbar
        <div className="l-navbar " id="nav-bar">
            <nav className="nav " id='parent'>
                <div id='child'>
                    <Link className="nav_logo" href={'/'}>
                        <a>
                            <Image alt='logo' style={{ borderRadius: 50 }} src={'/logo_instituto.png'} width={25} height={25} />
                            <span className="nav_logo-name">Instituto <br />&quot;El Salvador&quot;</span>
                        </a>
                    </Link>
                    {
                        authUser && (
                            <div>
                                <ul className="list-unstyled ps-0 overflow-hidden">
                                    <li className='text-white'>
                                        <a className="nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                            <i className='bx bx-layer nav_icon'></i>
                                            Gestion
                                        </a>
                                        <div className="collapse ps-2" id="home-collapse">
                                            <ul className="list-unstyled small">
                                                {
                                                    menus && menus.map((m, i) => (
                                                        !m.menu?.menuSistema.startsWith('Reporte') && (
                                                            <li key={i}>
                                                                <Link href={m.menu?.url}>
                                                                    <a className="nav_link" >{m.menu?.menuSistema}</a>
                                                                </Link>
                                                            </li>
                                                        )
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </li>

                                    <li className='text-white'>
                                        <a className=" nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse-2" aria-expanded="false">
                                            <i className='bx bx-bar-chart-alt-2 nav_icon'></i>
                                            Reportes
                                        </a>
                                        <div className="collapse ps-2" id="home-collapse-2">
                                            <ul className="list-unstyled small">
                                                {
                                                    menus && menus.map((m, i) => (
                                                        m.menu?.menuSistema.startsWith('Reporte') && (
                                                            <li key={i}>
                                                                <Link className="nav_link" href={m.menu?.url}>
                                                                    <a>{m.menu?.menuSistema}</a>
                                                                </Link>
                                                            </li>
                                                        )
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <a style={{ cursor: 'pointer' }} onClick={logout} className="nav_link sb-sidenav-footer text-white">
                                    <i className='bx bx-log-out nav_icon'></i>
                                    <span className="nav_name">Cerrar Sesion</span>
                                </a>
                            </div>
                        )
                    }
                </div >

                {
                    !authUser && (
                        <Link className="nav_link sb-sidenav-footer" href={'/gestion/cuenta/login'}>
                            <a>
                                <i className='bx bx-log-out nav_icon'></i>
                                <span className="nav_name">Iniciar Sesion</span>
                            </a>
                        </Link>
                    )
                }
            </nav>
        </div >
    )
}

export default Sidenav

