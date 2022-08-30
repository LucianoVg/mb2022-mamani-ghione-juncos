import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";

export default function NuevaSancion() {
    const [sancion, setSancion] = useState({ idUsuario: 0, idCurso: 0, motivo: '', idTipoSancion: 1 })
    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.BASE_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })

        axios.get(`${process.env.BASE_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.BASE_URL}/gestion/sanciones/tipos`)
            .then(res => {
                if (res.data) {
                    setTipoSanciones(res.data)
                }
            })
    }, [])
    const handleSancion = (e) => {
        setSancion({ ...sancion, [e.target.name]: e.target.value })
    }
    const generarSancion = (e) => {
        e.preventDefault()
        console.log(sancion);
        axios.post(`${process.env.BASE_URL}/gestion/sanciones`, {
            idUsuario: sancion.idUsuario,
            idCurso: sancion.idCurso,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toUTCString()
        }).then(res => {
            if (res.data) {
                router.push('/gestion/sanciones')
            }
        })
    }
    return (
        <Layout title={'Nueva Sancion'}>
            <div className="card m-5">
                <div className="card-header">
                    <h3>Nueva Sancion</h3>
                </div>
                <div className="card-body p-5">
                    <form method="post" onSubmit={generarSancion}>
                        <div className="form-group mb-3">
                            <label htmlFor="inputCheckbox">Sancion Grupal</label>
                            <input type="checkbox" name="esSancionGrupal" id="inputCheckbox" className="form-check-input ms-3" value={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />
                        </div>
                        {
                            !esSancionGrupal && (
                                <div className="form-group row mb-3">
                                    <label htmlFor="inputAlumno"><strong>Alumno:</strong></label>
                                    <select value={sancion.idUsuario} className="form-control" onChange={handleSancion} name="idUsuario" id="inputAlumno">
                                        {
                                            alumnos && alumnos.map((a, i) => (
                                                <option key={i} value={a.usuario.id}>
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
                                    <label htmlFor="inputAlumno"><strong>Curso:</strong></label>
                                    <select value={sancion.idCurso} className="form-control" onChange={handleSancion} name="idCurso" id="inputAlumno">
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <option key={i} value={c.id}>
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
                            <select className="form-control" onChange={handleSancion} name="idTipoSancion" value={sancion.idTipoSancion} id="inputTipoSancion">
                                {
                                    tipoSanciones && tipoSanciones.map((t, i) => (
                                        <option key={i} value={t.id}>{t.tipo}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group row mb-3">
                            <label htmlFor="inputMotivo">
                                <strong>Motivo:</strong>
                            </label>
                            <textarea className="form-control" onChange={handleSancion} name="motivo" id="inputMotivo" cols="30" rows="5" value={sancion.motivo}></textarea>
                        </div>
                        <button className="btn btn-primary" type="submit">Generar Sancion</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}