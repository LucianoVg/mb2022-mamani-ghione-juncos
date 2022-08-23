import axios from 'axios'
import Image from 'next/image'
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

                <div id='child'  >
                    <a className="nav_logo" href='/'>
                        {/* <i className='bx bx-bus-school nav_logo-icon'></i> */}
                        <Image style={{ borderRadius: 50 }} src={'/logo_instituto.png'} width={25} height={25} />
                        <span className="nav_logo-name">Instituto <br />"El Salvador"</span>
                    </a>

                    {
                        authUser && (
                            <div>
                                <ul className="list-unstyled ps-0 overflow-hidden">
                                    <li >
                                        <a className=" nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                            <i className='bx bx-layer nav_icon'></i>
                                            Gestion
                                        </a>
                                        <div className="collapse ps-2" id="home-collapse">
                                            <ul className="list-unstyled small">
                                                {
                                                    menus && menus.map((m, i) => (
                                                        !m.menu?.menuSistema.startsWith('Reporte') && (
                                                            <li key={i}>
                                                                <a href={m.menu?.url} className="nav_link" >{m.menu?.menuSistema}</a>
                                                            </li>
                                                        )
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </li>

                                    <li >
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
                                                                <a href={m.menu?.url} className="nav_link" >{m.menu?.menuSistema}</a>
                                                            </li>
                                                        )
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                                <a style={{ cursor: 'pointer' }} onClick={logout} className="nav_link sb-sidenav-footer">
                                    <i className='bx bx-log-out nav_icon'></i>
                                    <span className="nav_name">Cerrar Sesion</span>
                                </a>
                            </div>
                        )
                    }
                </div >

                {
                    !authUser ? (
                        <a href="/gestion/cuenta/login" className="nav_link sb-sidenav-footer">
                            <i className='bx bx-log-out nav_icon'></i>
                            <span className="nav_name">Iniciar Sesion</span>
                        </a>
                    ) :
                        (
                            <footer className='text-center text-white'>
                                <p>Logeado como: {authUser?.email}</p>
                            </footer>
                        )
                }
            </nav>
        </div >
    )
}

export default Sidenav

