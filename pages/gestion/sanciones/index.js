import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

const Sanciones = () => {
    const [sanciones, setSanciones] = useState()
    const [cursos, setCursos] = useState()
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [idCurso, setIdCurso] = useState(1)
    const [idAlumno, setIdAlumno] = useState(1)
    const [alumnos, setAlumnos] = useState()


    const handleCurso = (e) => {
        setIdCurso(Number.parseInt(e.target.value))
    }
    const handleAlumno = (e) => {
        setIdAlumno(Number.parseInt(e.target.value))
    }
    const buscarSanciones = (e) => {
        e.preventDefault()
        console.log(idCurso, idAlumno);

        axios.get(`${process.env.BASE_URL}/gestion/sanciones/buscar/${idCurso}/${idAlumno}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setSanciones(res.data)
                }
            })
    }

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setSanciones(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })
    }, [loading, authUser])

    return (
        <Layout title={'Sanciones'}>
            <div className="card mt-3 mb-3">
                <div className="card-header">
                    <h3 className="card-title">Sanciones</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10">
                            <form method="post" >
                                <div className="form-group row m-2">
                                    <div className="col-md-4">
                                        <label htmlFor="inputAlumno">
                                            <strong>Alumno:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <select value={idAlumno} onChange={handleAlumno} className="form-control" name="idAlumno" id="inputAlumno">
                                            {
                                                alumnos && alumnos.map((a, i) => (
                                                    <option key={i} value={a.id}>{a.usuario?.nombre} {a.usuario?.apellido}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row m-2">
                                    <div className="col-md-4">
                                        <label htmlFor="inputCurso">
                                            <strong>Curso:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <select id="inputCurso" onChange={handleCurso} className="form-control" name="idCurso" value={idCurso}>
                                            {
                                                cursos && cursos.map((c, i) => (
                                                    <option key={i} value={c.id}>
                                                        {c.curso?.nombre} {c.division.division}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <button onClick={buscarSanciones} className="btn btn-info m-1">
                                            <i className="fa fa-search"></i>
                                            Buscar
                                        </button>
                                    </div>
                                    <div className="col-md-4">
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            router.push('/gestion/sanciones/nueva_sancion')
                                        }} type="button" className="btn btn-info m-1">
                                            Nueva Sancion
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading && (
                    <Loading />
                )
            }
            {
                !loading && sanciones && (
                    <table className="table table-active">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Curso</th>
                                <th>Division</th>
                                <th>Fecha</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sanciones && sanciones.map((s, i) => (
                                    <tr key={i}>
                                        <td>{
                                            s.alumnoXCursoXDivision?.usuario !== undefined ?
                                                s.alumnoXCursoXDivision?.usuario?.nombre : '--'
                                        }</td>
                                        <td>{
                                            s.alumnoXCursoXDivision?.usuario !== undefined ?
                                                s.alumnoXCursoXDivision?.usuario?.apellido : '--'
                                        }</td>
                                        <td>{
                                            s.alumnoXCursoXDivision?.cursoXDivision != undefined ?
                                                s.alumnoXCursoXDivision?.cursoXDivision?.curso?.nombre
                                                : '--'
                                        }</td>
                                        <td>{
                                            s.alumnoXCursoXDivision?.cursoXDivision != undefined ?
                                                s.alumnoXCursoXDivision?.cursoXDivision?.division?.division
                                                : '--'
                                        }</td>
                                        <td>{new Date(s.fecha).toLocaleDateString()}</td>
                                        <td>
                                            <Link href={`/gestion/sanciones/${s.id}`}>
                                                <a className="btn btn-info">Detalles</a>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </Layout>
    )
}


export default Sanciones;