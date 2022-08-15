import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import { registrarse, registrarUsuario } from "../../../servicios/cuenta";

export default function Registro() {
    const router = useRouter()
    const [error, setError] = useState("")
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '',
        direccion: '', contrasenia: '', confirmarContrasenia: ''
    })

    const handleForm = (e: any) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    const registroUsuario = (e: any) => {
        e.preventDefault()
        if (usuario.contrasenia === usuario.confirmarContrasenia) {
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
                        telefono: usuario.telefono
                    }).then(res => {
                        const creado = res.data as boolean
                        if (creado) {
                            router.push('/')
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                })
        } else {
            setError("Las contraseñas no coinciden")
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Cuenta</h3></div>
                            <div className="card-body">
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
                                                <input onChange={handleForm} value={usuario.contrasenia} name="contrasenia" className="form-control" id="inputPassword" type="password" />
                                                <label>Contraseña</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input onChange={handleForm} value={usuario.confirmarContrasenia} name="confirmarContrasenia" className="form-control" id="inputPasswordConfirm" type="password" />
                                                <label>Confirmar Contraseña</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-0">
                                        <div className="d-grid"><button className="btn btn-primary btn-block" onClick={registroUsuario}>Crear Cuenta</button></div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center py-3">
                                <div className="small"><a type="button" onClick={() => router.push('login')}>Ya tiene una cuenta? Inicie Sesion</a></div>
                            </div>
                            {
                                error !== "" && (
                                    <div className="alert alert-warning">
                                        {error}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}