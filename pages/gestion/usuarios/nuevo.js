import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { authStateChanged, registrarse } from "../../../servicios/cuenta";

export default function NuevoUsuario() {
    // const router = useRouter()
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: 0,
        direccion: '', contrasenia: ''
    })
    const [mensaje, setMensaje] = useState("")

    const [rol, setRol] = useState(0)
    const [roles, setRoles] = useState([{ id: 0, tipo: '' }])

    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                axios.get('http://localhost:3000/api/gestion/roles')
                    .then(res => {
                        if (res.data) {
                            console.log(res.data);
                            setRoles(res.data)
                        }
                    })
            }
        })
    }, [])


    const handleForm = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    const handleSelect = (e) => {
        console.log(e.target.value);
        setRol(Number.parseInt(e.target.value))
    }

    const registrarUsuario = (e) => {
        e.preventDefault()
        usuario.idRol = rol
        console.log(usuario);
        registrarse(usuario.correo, usuario.contrasenia)
            .then(credencial => {
                console.log(credencial.user);

                axios.post('http://localhost:3000/api/gestion/cuenta', {
                    login: usuario.correo.split('@')[0],
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    dni: usuario.dni,
                    correo: usuario.correo,
                    localidad: usuario.localidad,
                    direccion: usuario.direccion,
                    telefono: usuario.telefono,
                    idRol: usuario.idRol,
                    contrasenia: usuario.contrasenia
                }).then(res => {
                    const creado = res.data
                    if (creado) {
                        setMensaje("Usuario creado!")
                    } else {
                        setMensaje("No se pudo crear al usuario")
                    }
                    setTimeout(() => { setMensaje("") }, 1200)
                }).catch(err => {
                    console.log(err);
                    setMensaje("Error al crear el usuario")
                    setTimeout(() => { setMensaje("") }, 1200)
                })
            })
    }
    return (
        <Layout>
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Nuevo Usuario</h3></div>
                <div className="card-body">
                    {
                        mensaje !== "" && (
                            <div className="alert alert-success">
                                <p>{mensaje}</p>
                            </div>
                        )
                    }
                    <form>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleForm} value={usuario.nombre} name="nombre" className="form-control" id="inputFirstName" type="text" />
                                    <label>Nombre</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input onChange={handleForm} value={usuario.apellido} name="apellido" className="form-control" id="inputLastName" type="text" />
                                    <label>Apellido</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleForm} value={usuario.correo} name="correo" className="form-control" id="inputEmail" type="email" />
                            <label>Correo electronico</label>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleForm} value={usuario.dni} name="dni" className="form-control" id="inputFirstName" type="text" />
                                    <label>Dni</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input onChange={handleForm} value={usuario.localidad} name="localidad" className="form-control" id="inputLastName" type="text" />
                                    <label>Localidad</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleForm} value={usuario.telefono} name="telefono" className="form-control" id="inputFirstName" type="tel" />
                                    <label>Telefono</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input onChange={handleForm} value={usuario.direccion} name="direccion" className="form-control" id="inputLastName" type="address" />
                                    <label>Dirección</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <select onChange={handleSelect} value={rol} name="idRol" className="form-control">
                                        {
                                            roles && roles.map((r, i) => (
                                                <option key={i} value={r.id}>{r.tipo}</option>
                                            ))
                                        }
                                    </select>
                                    <label>Rol</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleForm} value={usuario.contrasenia} name="contrasenia" className="form-control" id="inputPassword" type="password" />
                                    <label>Contraseña Temporal</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-0">
                            <div className="d-grid"><button className="btn btn-primary btn-block" onClick={registrarUsuario}>Registrar Usuario</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}