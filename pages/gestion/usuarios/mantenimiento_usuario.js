
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { authStateChanged } from "../../../servicios/cuenta";


export default function MantenimientoUsuario() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()

    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                axios.get('http://localhost:3000/api/gestion/usuarios')
                    .then(res => {
                        setUsuarios(res.data)
                    })
            } else {
                router.push('/gestion/cuenta/login')
            }
        })
    }, [])

    return (
        <Layout title={'Mantenimiento de Usuarios'}>
            <h1 className="text-center mt-1"><strong>Mantenimiento de Usuarios</strong></h1>
            <a className="btn btn-primary m-2" href="/gestion/usuarios/nuevo">Nuevo Usuario</a>

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Usuarios del Sistema
                </div>
                <div className="card-body">
                    <table id="datatablesSimple" className="table table-active">
                        <thead>
                            <tr>
                                <th>Dni</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Localidad</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Dni</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Localidad</th>
                                <th>Rol</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                usuarios && usuarios.map((u, i) => (
                                    <tr key={i}>
                                        <td>{u.dni}</td>
                                        <td>{u.nombre}</td>
                                        <td>{u.apellido}</td>
                                        <td>{u.direccion}</td>
                                        <td>{u.telefono}</td>
                                        <td>{u.localidad}</td>
                                        <td>{u.rol?.tipo}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}