import axios from "axios";
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
    const [curso, setCurso] = useState({ idCurso: 0, idDivision: 0 })

    const handleCurso = (e) => {
        setCurso({ ...curso, [e.target.name]: Number.parseInt(e.target.value) })
    }

    const buscarSanciones = (e) => {
        e.preventDefault()
        console.log(curso);
    }

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }

        axios.get(`${process.env.BASE_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.BASE_URL}/gestion/sanciones`)
            .then(res => {
                if (res.data) {
                    setSanciones(res.data)
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
                        <div className="col-md-6">
                            <form method="post" >
                                <div className="form-group row m-2">
                                    <div className="col-md-3">
                                        <label htmlFor="inputNombre">
                                            <strong>Nombre:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control col-md-6" id="inputNombre" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="inputApellido">
                                            <strong>Apellido:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" className="form-control col-md-6" id="inputApellido" />
                                    </div>
                                </div>
                                <div className="form-group row m-2">
                                    <div className="col-md-3">
                                        <label htmlFor="inputCurso">
                                            <strong>Curso:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <select id="inputCurso" onChange={handleCurso} className="form-control col-md-6" name="idCurso" value={curso.idCurso}>
                                            {
                                                cursos && cursos.map((c, i) => (
                                                    <option key={i} value={c.curso?.id}>
                                                        {c.curso?.nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="inputDivision">
                                            <strong>Division:</strong>
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <select id="inputDivision" onChange={handleCurso} value={curso.idDivision} className="form-control col-md-6" name="idDivision">
                                            {
                                                cursos && cursos.map((c, i) =>
                                                (
                                                    <option key={i} value={c.division.id}>
                                                        {c.division.division}
                                                    </option>
                                                )
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <button onClick={buscarSanciones} className="btn btn-info m-1">
                                            <i className="fa fa-search"></i>
                                            Buscar
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-info m-1">Generar Sancion</button>
                                    </div>
                                    <div className="col-md-6 m-1">
                                        <button className="btn btn-outline-info">
                                            Generar Sancion Colectiva
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
                                sanciones.map((s, i) => {
                                    <tr key={i}>
                                        <td>{s.usuario.nombre}</td>
                                        <td>{s.usuario.apellido}</td>
                                        <td>{s.sancion.cursoXDivision.curso.nombre}</td>
                                        <td>{s.sancion.cursoXDivision.division.division}</td>
                                        <td>{s.sancion.fecha}</td>
                                        <td>
                                            <button className="btn btn-info">Detalles</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </Layout>
    )
}


export default Sanciones;