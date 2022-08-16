import Link from 'next/link'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Sidenav = () => {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/submenu?idRol=${6}`)
            .then(r => {
                console.log(r.data);
                setMenus(r.data)
            })
    }, [])

    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Instituto "El Salvador"</h3>
            </div>

            <ul className="list-unstyled components">
                <p>Contenido</p>
                <li className="active">
                    <Link href={'/'}>
                        <a>Inicio</a>
                    </Link>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                        className="dropdown-toggle">Gestion</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        {
                            menus && menus.map((m, i) => (
                                !m.menu?.menuSistema.startsWith('Reportes') && (
                                    <li key={i}>
                                        <Link href={m.menu?.url}>
                                            <a>{m.menu?.menuSistema}</a>
                                        </Link>
                                    </li>
                                )
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <a href="#pageSubmenu2" data-toggle="collapse" aria-expanded="false"
                        className="dropdown-toggle">Reportes</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu2">
                        {
                            menus && menus.map((m, i) => (
                                m.menu?.menuSistema.startsWith('Reportes') && (
                                    <li key={i}>
                                        <Link href={m.menu?.url}>
                                            <a>{m.menu?.menuSistema}</a>
                                        </Link>
                                    </li>
                                )
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <a href="#">Portfolio</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Sidenav

