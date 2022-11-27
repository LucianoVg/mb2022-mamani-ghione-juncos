import { Layout } from "../../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from "../../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../../components/Pagination/Pagination";
import Loading from "../../../../components/loading";

export default function Asistencias() {
    const [pagina, setPagina] = useState(0)
    const pageSize = 5

    const [presente, setPresente] = useState(false)
    const [ausente, setAusente] = useState(false)
    const [llegadaTarde, setLlegadaTarde] = useState(false)
    const [aj, setAj] = useState(false)
    const [ltj, setLtj] = useState(false)
    const [mf, setMf] = useState(false)
    const [mfj, setMfj] = useState(false)
    const [asistencias, setAsistencias] = useState([])

    const [nombreDocente, setNombreDocente] = useState("")
    const [apellidoDocente, setApellidoDocente] = useState("")
    const [legajo, setLegajo] = useState("")

    const [fecha, setFecha] = useState(new Date().toISOString())
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: 0 })
    const router = useRouter()
    let queryParams = []
    const [cargando, setCargando] = useState(false)
    const [asistenciaActual, setAsistenciaActual] = useState({
        id: 0,
        presente: false,
        ausente: false,
        llegadaTarde: false,
        aj: false,
        ltj: false,
        mf: false,
        mfj: false,
        motivo: ''
    })
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        listarAsistencias()
    }, [loading, authUser, usuario.id])

    const paginatedAsistencias = () => {
        return asistencias?.slice(pagina, pagina + pageSize)
    }

    const nextPage = () => {
        if (asistencias.length > pagina + pageSize) {
            setPagina(pagina => pagina + pageSize)
        }
    }
    const prevPage = () => {
        if (pagina > 0) {
            setPagina(pagina => pagina - pageSize)
        }
    }


    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const listarAsistencias = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente`)
        if (res.data) {
            setAsistencias(res.data)
        }
        setCargando(false)
    }

    const buscarAsistencias = async () => {
        if (nombreDocente) {
            queryParams.push({ nombreDocente })
        }
        if (apellidoDocente) {
            queryParams.push({ apellidoDocente })
        }
        if (legajo) {
            queryParams.push({ legajo })
        }
        let params = ""
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        console.log(params);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente?${params}`)
        if (res.data) {
            setAsistencias(res.data)
        }
    }

    const handleNombreDocente = (e) => {
        setNombreDocente(e.target.value)
    }

    const handleApellidoDocente = (e) => {
        setApellidoDocente(e.target.value)
    }
    const handleLegajo = (e) => {
        setLegajo(e.target.value)
    }
    const handleFecha = (value) => {
        setFecha(value || new Date().toUTCString())
    }

    const bloquearCheck = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )
    }
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const onUpdate = async () => {
        // const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente/update/${id}`, {
        //     presente: presente,
        //     ausente: ausente,
        //     ausenteJustificado: aj,
        //     llegadaTarde: llegadaTarde,
        //     llegadaTardeJustificada: ltj,
        //     mediaFalta: mf,
        //     mediaFaltaJustificada: mfj,
        //     idUsuario: usuario.id
        // })
        // onCancel()
        // listarAsistencias()
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(false)
        setMf(false)
        setMfj(false)
    }

    const handlePresente = (e, checked) => {
        setPresente(checked)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(false)
        setMf(false)
        setMfj(false)
    }
    const handleAusente = (e, checked) => {
        setPresente(false)
        setAusente(checked)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(false)
        setMf(false)
        setMfj(false)
    }
    const handleLlegadaTarde = (e, checked) => {
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(checked)
        setAj(false)
        setLtj(false)
        setMf(false)
        setMfj(false)
    }
    const handleAj = (e, checked) => {
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(checked)
        setLtj(false)
        setMf(false)
        setMfj(false)
    }
    const handleLtj = (e, checked) => {
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(checked)
        setMf(false)
        setMfj(false)
    }
    const handleMf = (e, checked) => {
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(false)
        setMf(checked)
        setMfj(false)
    }
    const handleMfj = (e, checked) => {
        setPresente(false)
        setAusente(false)
        setLlegadaTarde(false)
        setAj(false)
        setLtj(false)
        setMf(false)
        setMfj(checked)
    }

    return (
        <Layout>
            <div className="container">
                <h3 className="mb-2">Asistencia Docente</h3>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="inputFecha">Fecha</label>
                            <input id="inputFecha" className="form-control" type="date" name="fecha" value={fecha} onChange={handleFecha} />
                        </div>

                        <h5 className="mt-2">Buscar Docente:</h5>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <input name="legajo"
                                    value={legajo}
                                    onChange={handleLegajo}
                                    type="text"
                                    placeholder="Legajo"
                                    className="form-control" />
                            </div>
                            <div className="form-group col-md-4">
                                <input
                                    name="nombreDocente"
                                    value={nombreDocente}
                                    onChange={handleNombreDocente}
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control" />
                            </div>
                            <div className="form-group col-md-4">
                                <input
                                    name="apellidoDocente"
                                    value={apellidoDocente}
                                    onChange={handleApellidoDocente}
                                    type="text"
                                    placeholder="Apellido"
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <button
                                className="btn btn-outline-primary mt-2"
                                onClick={buscarAsistencias}>
                                <FontAwesomeIcon
                                    icon={faSearch} />
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-3">
                                <h5 ><strong>Asistencia modificada:</strong> </h5>
                            </div>
                            <div className="col-md-3">
                                <button disabled style={{ fontSize: '20px', backgroundColor: 'lightsteelblue', color: 'transparent', height: '40px', marginTop: '10px' }}>Contained</button>
                            </div>
                            <div className="col-md-6">
                                <h5 style={{ marginTop: '-10px' }}>
                                    <strong>P:</strong>Presente  <br />
                                    <strong>A:</strong>Ausente <br />
                                    <strong>AJ:</strong> Ausente Justificado <br />
                                    <strong>LT:</strong>Llegada Tarde <br />
                                    <strong>LTJ:</strong> Llegada Tarde Justificada <br />
                                    <strong>MF:</strong>Media Falta <br />
                                    <strong>MFJ:</strong> Media Falta Justificada  <br />
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-2">
                    {
                        !cargando && (
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <td scope="col">Fecha</td>
                                        <td scope="col">Legajo</td>
                                        <td scope="col">Apellido</td>
                                        <td scope="col">Nombre</td>
                                        {/* <TableCell scope="col">Preceptor</TableCell> */}
                                        <td scope="col">P</td>
                                        <td scope="col">A</td>
                                        <td scope="col">AJ</td>
                                        <td scope="col">LT</td>
                                        <td scope="col">LTJ</td>
                                        <td scope="col">MF</td>
                                        <td scope="col">MFJ</td>
                                        <td scope="col">Acción</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedAsistencias().map((a, i) => (
                                            !a.presente && !a.ausente && !a.ausenteJustificado && !a.llegadaTarde && !a.llegadaTardeJustificada && !a.mediaFalta && !a.mediaFaltaJustificadaa ? (
                                                <tr key={i} >
                                                    <td className="col-md-1 text-capitalize">{a.creadoEn}</td>
                                                    <td className="col-md-1">{a.docenteXmateria?.usuario?.legajo}</td>
                                                    <td className="col-md-1 text-capitalize" >{a.docenteXmateria?.usuario?.apellido} </td>
                                                    <td className="col-md-1 text-capitalize">{a.docenteXmateria?.usuario?.nombre}</td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="presente"
                                                            value={asistenciaActual.presente}
                                                            onChange={(e) => handlePresente(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="ausente"
                                                            value={asistenciaActual.ausente}
                                                            onChange={(e) => handleAusente(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="aj"
                                                            value={asistenciaActual.aj}
                                                            onChange={(e) => handleAj(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="llegadaTarde"
                                                            value={asistenciaActual.llegadaTarde}
                                                            onChange={(e) => handleLlegadaTarde(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="ltj"
                                                            value={asistenciaActual.ltj}
                                                            onChange={(e) => handleLtj(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="mf"
                                                            value={asistenciaActual.mf}
                                                            onChange={(e) => handleMf(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            name="mfj"
                                                            value={asistenciaActual.mfj}
                                                            onChange={(e) => handleMfj(e, a)}
                                                        />
                                                    </td>
                                                    <td className="col-md-2">
                                                        {
                                                            <button className="btn btn-outline-secondary"
                                                                style={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                onClick={onUpdate}>
                                                                Guardar
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={i} >
                                                    <td className="col-md-1 text-capitalize">{a.creadoEn}</td>
                                                    <td className="col-md-1">{a.docenteXmateria?.usuario?.legajo}</td>
                                                    <td className="col-md-1 text-capitalize" >{a.docenteXmateria?.usuario?.apellido} </td>
                                                    <td className="col-md-1 text-capitalize">{a.docenteXmateria?.usuario?.nombre}</td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.presente}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.ausente}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.ausenteJustificado}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.llegadaTarde}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.llegadaTardeJustificada}
                                                        />
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.mediaFalta}
                                                        />
                                                    </td>
                                                    <td className="col-md-1">
                                                        <input
                                                            className="form-check-input"
                                                            type={'checkbox'}
                                                            checked={a?.mediaFaltaJustificada}
                                                        />
                                                    </td>
                                                    <td className="col-md-2">
                                                        {
                                                            <button className="btn btn-outline-secondary"
                                                                style={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                onClick={onUpdate}>
                                                                Guardar
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                    {
                        cargando && (
                            <div className="row">
                                <div className="col-md-4 m-auto">
                                    <Loading />
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    !cargando && asistencias.length > 0 && (
                        <div className="row">
                            <div className="col-md-4 m-auto">
                                <Pagination
                                    onNextPage={nextPage}
                                    onPrevPage={prevPage} />
                            </div>
                        </div>
                    )
                }
            </div>

        </Layout>
    );
}