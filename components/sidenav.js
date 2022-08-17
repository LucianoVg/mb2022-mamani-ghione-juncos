import Link from 'next/link'
import axios from 'axios'
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
        // <nav id="sidebar">
        //     <div classNameName="sidebar-header">
        //         <h3>Instituto "El Salvador"</h3>
        //     </div>

        //     <ul classNameName="list-unstyled components">
        //         <p>Contenido</p>
        //         <li classNameName="active">
        //             <Link href={'/'}>
        //                 <a>Inicio</a>
        //             </Link>
        //         </li>
        //         <li>
        //             <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
        //                 classNameName="dropdown-toggle">Gestion</a>
        //             <ul classNameName="collapse list-unstyled" id="pageSubmenu">
        //                 {
        //                     menus && menus.map((m, i) => (
        //                         !m.menu?.menuSistema.startsWith('Reportes') && (
        //                             <li key={i}>
        //                                 <Link href={m.menu?.url}>
        //                                     <a>{m.menu?.menuSistema}</a>
        //                                 </Link>
        //                             </li>
        //                         )
        //                     ))
        //                 }
        //             </ul>
        //         </li>
        //         <li>
        //             <a href="#pageSubmenu2" data-toggle="collapse" aria-expanded="false"
        //                 classNameName="dropdown-toggle">Reportes</a>
        //             <ul classNameName="collapse list-unstyled" id="pageSubmenu2">
        //                 {
        //                     menus && menus.map((m, i) => (
        //                         m.menu?.menuSistema.startsWith('Reportes') && (
        //                             <li key={i}>
        //                                 <Link href={m.menu?.url}>
        //                                     <a>{m.menu?.menuSistema}</a>
        //                                 </Link>
        //                             </li>
        //                         )
        //                     ))
        //                 }
        //             </ul>
        //         </li>
        //         <li>
        //             <a href="#">Portfolio</a>
        //         </li>
        //         <li>
        //             <a href="#">Contact</a>
        //         </li>
        //     </ul>
        // </nav>
        <div className="l-navbar" id="nav-bar">
            <nav className="nav">





                <div>
                    <a href="#" className="nav_logo">
                        <i className='bx bx-layer nav_logo-icon'></i>
                        <span className="nav_logo-name">Instituto <br />"El Salvador"</span>
                    </a>


                    <ul className="list-unstyled ps-0">
                        <li >
                            <a className=" nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                <i className='bx bx-grid-alt nav_icon'></i>
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

                        <li >
                            <a className=" nav_link btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse-2" aria-expanded="false">
                                <i className='bx bx-grid-alt nav_icon'></i>
                                Reportes
                            </a>
                            <div className="collapse ps-2" id="home-collapse-2">
                                <ul className="list-unstyled small">
                                    {
                                        menus && menus.map((m, i) => (
                                            m.menu?.menuSistema.startsWith('Reporte') && (
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
                    </ul>

                    <div className="nav_list">

                        <a href="#" className="nav_link">
                            <i className='bx bx-grid-alt nav_icon'></i>
                            <span className="nav_name">Inicio</span>
                        </a>

                        <a href="#" className="nav_link">
                            <i className='bx bx-user nav_icon'> </i>
                            <span className="nav_name">Users</span>
                        </a>

                        <a href="#" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Messages</span>
                        </a>

                        <a href="#" className="nav_link">
                            <i className='bx bx-bookmark nav_icon'></i>
                            <span className="nav_name">Bookmark</span>
                        </a>
                        <a href="#" className="nav_link">
                            <i className='bx bx-folder nav_icon'></i>
                            <span className="nav_name">Files</span>
                        </a>

                        <a href="#" className="nav_link">
                            <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span>
                        </a>
                    </div>
                </div>
                <a href="#" className="nav_link">
                    <i className='bx bx-log-out nav_icon'></i>
                    <span className="nav_name">Iniciar Sesion</span>
                </a>
            </nav >
        </div >
    )
}

export default Sidenav

