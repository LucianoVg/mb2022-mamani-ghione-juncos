import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

export default function NuevoUsuario() {
    const router = useRouter()
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: '',
        direccion: '', contrasenia: '', idTutor: 0, sexo: 'M', idCurso: ''
    })
    const [cursos, setCursos] = useState()
    const [tutor, setTutor] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: 7,
        direccion: '', contrasenia: '', sexo: 'M'
    })
    const [curso, setCurso] = useState('')
    const [rol, setRol] = useState('')

    const [mensaje, setMensaje] = useState("")
    const [esAlumno, setEsAlumno] = useState(false)
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
        axios.get(`${process.env.BASE_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
    }, [authUser, loading, router])

    const handleTutor = (e) => {
        setTutor({ ...tutor, [e.target.name]: e.target.value })
    }
    const handleForm = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleRol = (e) => {
        setRol(e.target.value)
        setEsAlumno(e.target.value === '2')
    }
    const handleCurso = (e) => {
        setCurso(e.target.value)
    }

    const registrarUsuario = (e) => {
        e.preventDefault()
        usuario.idRol = rol
        usuario.idCurso = curso

        console.log("Tutor:", tutor);
        console.log("Estudiante:", usuario);
        // axios.post(`${process.env.BASE_URL}/gestion/cuenta`, {
        //     login: tutor.correo.split('@')[0],
        //     nombre: tutor.nombre,
        //     apellido: tutor.apellido,
        //     dni: tutor.dni,
        //     telefono: tutor.telefono,
        //     correo: tutor.correo,
        //     direccion: tutor.direccion,
        //     localidad: tutor.localidad,
        //     idRol: tutor.idRol,
        //     sexo: tutor.sexo,
        //     contrasenia: tutor.contrasenia
        // }).then(res => {
        //     if (res.data) {
        //         usuario.idTutor = res.data.id
        //         axios.post(`${process.env.BASE_URL}/gestion/cuenta`, {
        //             login: usuario.correo.split('@')[0],
        //             nombre: usuario.nombre,
        //             apellido: usuario.apellido,
        //             dni: usuario.dni,
        //             telefono: usuario.telefono,
        //             correo: usuario.correo,
        //             direccion: usuario.direccion,
        //             localidad: usuario.localidad,
        //             idRol: usuario.idRol,
        //             idTutor: usuario.idTutor,
        //             sexo: usuario.sexo,
        //             contrasenia: usuario.contrasenia
        //         }).then(res => {
        //             if (res.data && res.data.id) {
        //                 setMensaje("Usuario creado!")
        //                 setTimeout(() => {
        //                     router.push('/gestion/usuarios/mantenimiento_usuario')
        //                 }, 1300);
        //             }
        //         })
        //     }
        // })
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
                        {
                            esAlumno && (
                                <div className="form-floating row mb-3">
                                    <select onChange={handleCurso} value={curso} name="curso" className="form-control">
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <option key={i} value={c.id}>{c.curso.nombre} {c.division.division}</option>
                                            ))
                                        }
                                    </select>
                                    <label>Curso</label>
                                </div>
                            )
                        }
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
                        <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                                <select onChange={handleForm} value={usuario.sexo} name="sexo" className="form-control">
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                                <label>Sexo</label>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <select onChange={handleRol} value={rol} name="rol" className="form-control">
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
                                                    <input onChange={handleTutor} value={tutor.nombre} name="nombre" className="form-control" id="inputFirstName" type="text" />
                                                    <label>Nombre</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input onChange={handleTutor} value={tutor.apellido} name="apellido" className="form-control" id="inputLastName" type="text" />
                                                    <label>Apellido</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input onChange={handleTutor} value={tutor.correo} name="correo" className="form-control" id="inputEmail" type="email" />
                                            <label>Correo electronico</label>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <select onChange={handleTutor} value={tutor.sexo} name="sexo" className="form-control">
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                </select>
                                                <label>Sexo</label>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input onChange={handleTutor} value={tutor.dni} name="dni" className="form-control" id="inputFirstName" type="text" />
                                                    <label>Dni</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input onChange={handleTutor} value={tutor.localidad} name="localidad" className="form-control" id="inputLastName" type="text" />
                                                    <label>Localidad</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input onChange={handleTutor} value={tutor.telefono} name="telefono" className="form-control" id="inputFirstName" type="tel" />
                                                    <label>Telefono</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input onChange={handleTutor} value={tutor.direccion} name="direccion" className="form-control" id="inputLastName" type="address" />
                                                    <label>Dirección</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input onChange={handleTutor} value={tutor.contrasenia} name="contrasenia" className="form-control" id="inputPassword" type="password" />
                                                <label>Contraseña Temporal</label>
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