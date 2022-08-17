import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Sidenav = () => {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/submenu?idRol=${1}`)
            .then(r => {
                console.log(r.data);
                setMenus(r.data)
            })
    }, [])

    return (
        <div className="l-navbar" id="nav-bar">
            <div>
                <nav className="nav">
                    <a className="nav_logo" href='/'>
                        {/* <i className='bx bx-bus-school nav_logo-icon'></i> */}
                        <Image style={{ borderRadius: 50 }} src={'/assets/img/logo.jpg'} width={25} height={25} />
                        <span className="nav_logo-name">Instituto <br />"El Salvador"</span>
                    </a>

                    <div className="nav_list">
                        <a className="nav_link" href='/'>
                            <i className='bx bx-home nav_icon'></i>
                            <span className="nav_name">Inicio</span>
                        </a>
                        <ul className="list-unstyled ps-0">
                            <li>
                                <a className="nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                    <i className='bx bx-bar-chart-square nav_icon'></i>
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

                            <li>
                                <a className=" nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse-2" aria-expanded="false">
                                    <i className='bx bx-file nav_icon'></i>
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

                        <a className="nav_link" href='/gestion/cuenta/login'>
                            <i className="bx bx-lock-open"></i>
                            <span className="nav_name">Iniciar Sesion</span>
                        </a>
                    </div>



                </nav >
            </div>
        </div >
    )
}

export default Sidenav

