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
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <Link href="/">
                            <a className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                        </Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Gestion
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav" id="c">
                                {
                                    menus && menus.map((m: any, i: number) => (
                                        !m.menu?.menuSistema?.startsWith('Reporte') && (
                                            <Link key={i} href={m.menu?.url}>
                                                <a className="nav-link active" >{m.menu?.menuSistema}</a>
                                            </Link>
                                        )
                                    ))
                                }
                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1" aria-expanded="false" aria-controls="collapseLayouts1">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Reportes
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion2">
                            <nav className="sb-sidenav-menu-nested nav">
                                {
                                    menus && menus.map((m: any, i: number) => (
                                        m.menu?.menuSistema?.startsWith('Reporte') && (
                                            <Link key={i} href={m.menu?.url}>
                                                <a className="nav-link active" >{m.menu?.menuSistema}</a>
                                            </Link>
                                        )
                                    ))
                                }
                            </nav >
                        </div >
                    </div>
                </div >

                {/* <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div> */}
            </nav >
        </div >
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/gestion/submenu')
    const menus = res.data
    console.log(menus);

    return {
        props: {
            menus
        }
    }
}
export default Sidenav

