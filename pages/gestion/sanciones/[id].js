import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

export default function DetalleSancion() {
    const [sancion, setSancion] = useState()
    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)
    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()
    const [loadSancion, setLoadSancion] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({ id: res.data.id })
                    console.log(usuario);
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/${id}`)
            .then(res => {
                if (res.data) {
                    setSancion(res.data)
                    setLoadSancion(false)
                    setEsSancionGrupal(res.data.cursoXDivision)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/tipos`)
            .then(res => {
                if (res.data) {
                    setTipoSanciones(res.data)
                }
            })
    }, [loading, authUser, id, usuario])
    const handleSancion = (e) => {
        setSancion({ ...sancion, [e.target.name]: e.target.value })
        setEditMode(true)
    }
    const actualizarSancion = (e) => {
        e.preventDefault()
        console.log(sancion);
        axios.put(`${process.env.BASE_URL}/gestion/sanciones/${sancion.id}`, {
            idUsuario: usuario.id,
            idCurso: sancion.idCursoXDivision,
            idAlumno: sancion.idAlumnoXCursoXDivision,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toUTCString()
        }).then(res => {
            if (res.data) {
                router.push('/gestion/sanciones')
            }
        }).catch(err => {
            console.error(err);
        })
    }
    return (
        <Layout title={'Detalles de la Sancion'}>
            {
                loadSancion && (
                    <Loading />
                )
            }
            {
                !loadSancion && (
                    <div className="card-body p-5">
                        <form method="post" onSubmit={actualizarSancion}>
                            <div className="form-group mb-3">
                                <label htmlFor="inputCheckbox">Sancion Grupal</label>
                                <input checked={esSancionGrupal} type="checkbox" name="esSancionGrupal" id="inputCheckbox" className="form-check-input ms-3" value={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />
                            </div>
                            {
                                !esSancionGrupal && (
                                    <div className="form-group row mb-3">
                                        <label htmlFor="inputAlumno">
                                            <strong>Alumno:</strong>
                                        </label>
                                        <select value={sancion?.idAlumnoXCursoXDivision} className="form-control" name="idAlumnoXCursoXDivision" id="inputAlumno" onChange={handleSancion}>
                                            {
                                                alumnos && alumnos.map((a, i) => (
                                                    <option selected={a.id === sancion?.idAlumnoXCursoXDivision} key={i} value={a.id}>
                                                        {a.usuario.nombre} {a.usuario.apellido}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            }
                            {
                                esSancionGrupal && (
                                    <div className="form-group row mb-3">
                                        <label htmlFor="inputCurso">
                                            <strong>Curso:</strong>
                                        </label>

                                        <select value={sancion?.idCursoXDivision} className="form-control" onChange={handleSancion} name="idCursoXDivision" id="inputCurso">
                                            {
                                                cursos && cursos.map((c, i) => (
                                                    <option selected={c.id === sancion?.idCursoXDivision} key={i} value={c.id}>
                                                        {c.curso.nombre} {c.division.division}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            }
                            <div className="form-group row mb-3">
                                <label htmlFor="inputTipoSancion">
                                    <strong>Tipo Sancion:</strong>
                                </label>
                                <select className="form-control" onChange={handleSancion} name="idTipoSancion" value={sancion?.idTipoSancion} id="inputTipoSancion">
                                    {
                                        tipoSanciones && tipoSanciones.map((t, i) => (
                                            <option selected={t.id === sancion?.idTipoSancion} key={i} value={t.id}>{t.tipo}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group row mb-3">
                                <label htmlFor="inputMotivo">
                                    <strong>Motivo:</strong>
                                </label>
                                <textarea className="form-control" onChange={handleSancion} name="motivo" id="inputMotivo" cols="30" rows="5" value={sancion?.motivo}></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <button disabled={!editMode} className="btn btn-primary" type="submit">Actualizar Sancion</button>
                                </div>
                                <div className="col-md-6">
                                    <Link href={'/gestion/sanciones'}>
                                        <a className="btn btn-secondary">Volver</a>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </Layout>
    )
}