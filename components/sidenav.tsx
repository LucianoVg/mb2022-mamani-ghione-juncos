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
                                {/* <Link href="/gestion/estudiantes">
                                    <a className="nav-link" >Estudiantes</a>
                                </Link>
                                <Link href="/gestion/empleados">
                                    <a className="nav-link" >Empleados</a>
                                </Link>
                                <Link href="/gestion/notas">
                                    <a className="nav-link" >Notas</a>
                                </Link>
                                <Link href="/gestion/asistencias">
                                    <a className="nav-link" >Asistencias</a>
                                </Link>
                                <Link href="/gestion/asistencias_docente">
                                    <a className="nav-link" >Asistencia Docente</a>
                                </Link>
                                <Link href="/gestion/sanciones">
                                    <a className="nav-link" >Sanciones</a>
                                </Link>
                                <Link href="/gestion/material_estudio">
                                    <a className="nav-link" >Material de Estudio</a>
                                </Link>
                                <Link href="/gestion/certificado_servicio">
                                    <a className="nav-link" >Certificado de Servicio</a>
                                </Link>
                                <Link href="/gestion/fecha_examen">
                                    <a className="nav-link" >Fecha de Examen</a>
                                </Link>
                                <Link href="/gestion/generar_ficha_institucional">
                                    <a className="nav-link" > Generar Ficha Institucional</a>
                                </Link> */}
                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1" aria-expanded="false" aria-controls="collapseLayouts1">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Reportes
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <div className="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion2">
                                <nav className="sb-sidenav-menu-nested nav">

                                    <Link href="/reportes/reporte_notas">
                                        <a className="nav-link active" >Reporte Notas</a>
                                    </Link>
                                    <Link href="/reportes/reporte_asistencias">
                                        <a className="nav-link active" >Reporte Asistencias</a>
                                    </Link >
                                    <Link href="/reportes/reporte_asistencia_Docente">
                                        <a className="nav-link active" >Reporte Asistencia Docente</a>
                                    </Link>
                                    <Link href="/reportes/reporte_sanciones">
                                        <a className="nav-link active" >Reporte Sanciones</a>
                                    </Link>
                                    <Link href="/reportes/reporte_preanalitico">
                                        <a className="nav-link active" >Reporte Preanalitico</a>
                                    </Link>

                                    <Link href="/reportes/reporte_mejor_promedio">
                                        <a className="nav-link active" >Reporte Mejor Promedio</a>
                                    </Link>
                                </nav >
                            </div >

                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <a className="nav-link" href="charts.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                            <a className="nav-link" href="tables.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </a>
                        </div >
                    </div>
                </div >

                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
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

