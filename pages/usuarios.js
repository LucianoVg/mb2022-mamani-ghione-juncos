import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/gestion/cuenta')
            .then(res => {
                setUsuarios(res.data)
            })
    }, [])

    return (
        <Layout>
            <div className="container-fluid px-4">
                {
                    usuarios && (
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid px-4">
                                    <h1 className="mt-4">Tables</h1>
                                    <ol className="breadcrumb mb-4">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Tables</li>
                                    </ol>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                                            <a target="_blank" href="https://datatables.net/">official DataTables documentation</a>
                                            .
                                        </div>
                                    </div>
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            DataTable Example
                                        </div>
                                        <div className="card-body">
                                            <input className="dataTable-input" placeholder="Search..." type="text" />
                                            <table id="datatablesSimple">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Apellido</th>
                                                        <th>Tutor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        usuarios && usuarios.map((u, i) => (
                                                            <tr>
                                                                <td>{u.nombre}</td>
                                                                <td>{u.apellido}</td>
                                                                <td>{u.tutor?.nombre}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </main>
                            <footer className="py-4 bg-light mt-auto">
                                <div className="container-fluid px-4">
                                    <div className="d-flex align-items-center justify-content-between small">
                                        <div className="text-muted">Copyright &copy; Your Website 2022</div>
                                        <div>
                                            <a href="#">Privacy Policy</a>
                                            &middot;
                                            <a href="#">Terms &amp; Conditions</a>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}


