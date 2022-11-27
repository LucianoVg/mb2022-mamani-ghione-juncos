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
                <form className="row mt-3 g-3">
                    <div className="col-md-2">
                        <label htmlFor="inputFecha">Fecha</label>
                        <input
                            id="inputFecha"
                            className="form-control"
                            type={'date'}
                            placeholder="Fecha"
                            value={fecha}
                            onChange={handleFecha}
                            style={{ width: "170px" }}
                        />

                    </div>

                    <div className="col-md-12">
                        <h5>Buscar Docente:</h5>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <input className="form-control"
                                name="legajo"
                                value={legajo}
                                onChange={handleLegajo}
                                style={{ width: "170px" }}
                                required
                            />
                            <label>Legajo</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <input className="form-control"
                                name="nombreAlumno"
                                value={nombreDocente}
                                onChange={handleNombreDocente}
                                style={{ width: "170px" }}
                                required />
                            <label>Nombre Docente</label>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <input
                                className="form-control"
                                name="apellidoDocente"
                                value={apellidoDocente}
                                onChange={handleApellidoDocente}
                                style={{ width: "170px" }}
                                required
                            />
                            <label>Apellido Docente</label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button onClick={buscarAsistencias} className="button-61">
                            <FontAwesomeIcon
                                icon={faSearch} style={{ marginRight: "5px" }} />
                            Buscar
                        </button>
                    </div>

                    <div className="col-md-4" style={{ position: "absolute", marginLeft: "800px", marginTop: "-40px" }} >

                        <div className="bd-highlight">

                            <div className="d-flex flex-row bd-highlight">
                                <div className="p-2 bd-highlight">    <h5 >
                                    <strong>Asistencia modificada:</strong>
                                </h5></div>
                                <div className="p-2 bd-highlight">
                                    <button className="btn btn-primary"
                                        style={{ width: "170px", height: "40px", marginTop: "-7px", backgroundColor: "lightBlue", border: "none" }}
                                    ></button>
                                </div>

                            </div>
                            <h5 className="p-2" style={{ marginTop: "-10px" }}>
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
                </form>

                {
                    cargando && (
                        <div className="row">
                            <div className="col-md-4 m-auto">
                                <Loading />
                            </div>
                        </div>
                    )
                }
                {
                    !cargando && (
                        <div className="table-responsive w-auto" style={{ marginTop: "20px" }}>
                            <table className="table table-striped table-hover" aria-label="simple table">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Legajo</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Nombre</th>
                                        {/* <TableCell scope="col">Preceptor</TableCell> */}
                                        <th scope="col">P</th>
                                        <th scope="col">A</th>
                                        <th scope="col">AJ</th>
                                        <th scope="col">LT</th>
                                        <th scope="col">LTJ</th>
                                        <th scope="col">MF</th>
                                        <th scope="col">MFJ</th>
                                        <th scope="col">Acción</th>
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

                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="presente"
                                                                role={"switch"}
                                                                value={asistenciaActual.presente}
                                                                onChange={(e) => handlePresente(e, a)}

                                                            />
                                                        </div>

                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="ausente"
                                                                role={"switch"}
                                                                value={asistenciaActual.ausente}
                                                                onChange={(e) => handleAusente(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-1">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="aj"
                                                                role={"switch"}
                                                                value={asistenciaActual.aj}
                                                                onChange={(e) => handleAj(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="llegadaTarde"
                                                                role={"switch"}
                                                                value={asistenciaActual.llegadaTarde}
                                                                onChange={(e) => handleLlegadaTarde(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-1">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="ltj"
                                                                role={"switch"}
                                                                value={asistenciaActual.ltj}
                                                                onChange={(e) => handleLtj(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-1 ">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="mf"
                                                                role={"switch"}
                                                                value={asistenciaActual.mf}
                                                                onChange={(e) => handleMf(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-1">
                                                        <div className="form-check form-switch">
                                                            <input
                                                                className="form-check-input"
                                                                type={'checkbox'}
                                                                name="mfj"
                                                                role={"switch"}
                                                                value={asistenciaActual.mfj}
                                                                onChange={(e) => handleMfj(e, a)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="col-md-2">
                                                        {
                                                            <div className="bd-highlight">
                                                                <button className="button-61"
                                                                    style={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                    onClick={onUpdate}>
                                                                    Guardar
                                                                </button>
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            ) : (

                                                a.motivo ? (
                                                    < tr key={i} style={{ backgroundColor: 'lightsteelblue', color: 'black' }} >
                                                        <td className="col-md-1 text-capitalize">{a.creadoEn}</td>
                                                        <td className="col-md-1">{a.docenteXmateria?.usuario?.legajo}</td>
                                                        <td className="col-md-1 text-capitalize" >{a.docenteXmateria?.usuario?.apellido} </td>
                                                        <td className="col-md-1 text-capitalize">{a.docenteXmateria?.usuario?.nombre}</td>
                                                        {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={presente}
                                                                            onChange={handlePresente}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.presente}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={ausente}
                                                                            onChange={handleAusente}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.ausente}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {

                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={aj}
                                                                            onChange={handleAj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.ausenteJustificado}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={llegadaTarde}
                                                                            onChange={handleLlegadaTarde}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.llegadaTarde}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1">
                                                            {

                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={ltj}
                                                                            onChange={handleLtj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.llegadaTardeJustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }

                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={mf}
                                                                            onChange={handleMf}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.mediaFalta}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }

                                                        </td>
                                                        <td className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type={'checkbox'}
                                                                            checked={mfj}
                                                                            onChange={handleMfj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type={'checkbox'}
                                                                                checked={a.mediaFaltaJustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-2">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <React.Fragment>
                                                                        <div className="d-flex bd-highlight mb-2">
                                                                            <div className="bd-highlight">
                                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue", marginRight: "5px" }}
                                                                                    onClick={(e) => onUpdate(a?.id)}
                                                                                >
                                                                                    Actualizar
                                                                                </button>
                                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                            </div>
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "red" }}
                                                                                    onClick={() => onCancel()}
                                                                                >
                                                                                    Cancelar
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </React.Fragment>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        <div className="d-flex bd-highlight mb-2">
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue", marginRight: "5px" }}
                                                                                    onClick={() => setInEditMode({
                                                                                        status: true,
                                                                                        rowKey: i
                                                                                    })}
                                                                                >Actualizar</button>
                                                                            </div>
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue" }}
                                                                                    onClick={() => router.push(`/gestion/asistencias/${a?.id}`)}>
                                                                                    Info.
                                                                                </button>
                                                                            </div>

                                                                        </div>

                                                                    </React.Fragment>
                                                                )
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
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="presente"
                                                                            checked={presente}
                                                                            onChange={handlePresente}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.presente}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="ausente"
                                                                            checked={ausente}
                                                                            onChange={handleAusente}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.ausente}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            checked={aj}
                                                                            onChange={handleAj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.ausenteJustificado}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="llegadaTarde"
                                                                            checked={llegadaTarde}
                                                                            onChange={handleLlegadaTarde}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.llegadaTarde}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="ltj"
                                                                            checked={ltj}
                                                                            onChange={handleLtj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.llegadaTardeJustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1 ">
                                                            {

                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="mf"
                                                                            checked={mf}
                                                                            onChange={handleMf}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.mediaFalta}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            name="mfj"
                                                                            checked={mfj}
                                                                            onChange={handleMfj}
                                                                            role={"switch"}
                                                                        />
                                                                    </div>
                                                                ) :
                                                                    (
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                checked={a.mediaFaltaJustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                                role={"switch"}
                                                                            />
                                                                        </div>
                                                                    )
                                                            }
                                                        </td>
                                                        <td className="col-md-2">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <React.Fragment>
                                                                        <div className="d-flex bd-highlight mb-2">
                                                                            <div className="bd-highlight">
                                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue", marginRight: "5px" }}
                                                                                    onClick={(e) => onUpdate(a?.id)}
                                                                                >
                                                                                    Actualizar
                                                                                </button>
                                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                            </div>
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "red", marginLeft: 8 }}
                                                                                    onClick={() => onCancel()}
                                                                                >
                                                                                    Cancelar
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </React.Fragment>
                                                                ) : (
                                                                    <React.Fragment>
                                                                        <div className="d-flex bd-highlight mb-2">
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue", marginRight: "5px" }}
                                                                                    onClick={() => setInEditMode({
                                                                                        status: true,
                                                                                        rowKey: i
                                                                                    })}
                                                                                >Actualizar</button>
                                                                            </div>
                                                                            <div className="bd-highlight">
                                                                                <button
                                                                                    className="button-61"
                                                                                    style={{ color: "black", backgroundColor: "lightblue" }}
                                                                                    onClick={() => router.push(`/gestion/asistencias/${a?.id}`)}>
                                                                                    Info.
                                                                                </button>
                                                                            </div>

                                                                        </div>

                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                )

                                            )
                                        )
                                        )

                                    }
                                </tbody>
                            </table>
                        </div>


                    )
                }



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