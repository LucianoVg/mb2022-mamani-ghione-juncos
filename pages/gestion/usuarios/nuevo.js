import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

export default function NuevoUsuario() {
    const router = useRouter()
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: 0,
        direccion: '', contrasenia: '', idTutor: 0
    })
    // Ver si hay que dejar al tutor como un rol o como un dato adicional
    // del alumno
    // const [tutor, setTutor] = useState({
    //     nombre: '', apellido: '', dni: '',
    //     correo: '', localidad: '', telefono: ''
    // })
    const [mensaje, setMensaje] = useState("")
    const [esAlumno, setEsAlumno] = useState(false)

    const [rol, setRol] = useState(0)
    const [roles, setRoles] = useState([{ id: 0, tipo: '' }])
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.BASE_URL}/gestion/roles`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setRoles(res.data)
                }
            })
    }, [authUser, loading])


    const handleForm = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    const handleSelect = (e) => {
        console.log(e.target.value);
        setRol(Number.parseInt(e.target.value))
        setEsAlumno(e.target.value === '2')
    }

    const registrarUsuario = (e) => {
        e.preventDefault()
        usuario.idRol = rol
        console.log(usuario);
        axios.post(`${process.env.BASE_URL}/gestion/cuenta`, {
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
                setTimeout(() => { router.push('/gestion/usuarios/mantenimiento_usuario') }, 1200)
            } else {
                setMensaje("No se pudo crear al usuario")
                setTimeout(() => { setMensaje("") }, 1200)
            }

        }).catch(err => {
            console.log(err);
            setMensaje("Error al crear el usuario")
            setTimeout(() => { setMensaje("") }, 1200)
        })
    }
    return (
        <Layout title={'Nuevo Usuario'}>
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
                                    <label>Legajo</label>
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
                            {
                                esAlumno && (
                                    <div className="mt-3">
                                        <h3 className="text-center">Datos del Tutor</h3>
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
                                                    <label>Legajo</label>
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
                                    </div>
                                )
                            }
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