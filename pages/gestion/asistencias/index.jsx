import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { Box, Modal, TextareaAutosize, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination, Typography } from "@mui/material";
// import Switch from '@mui/material/Switch';
// DATEPICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
// import { usePagination } from "../../../components/hooks/paginationHook";
// import { Search } from "@mui/icons-material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import Pagination from "../../../components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
import Loading from '../../../components/loading';
import useWindowSize from "../../../components/hooks/windowSizeHook";
=======
>>>>>>> parent of 021b5a9 (quitando material del proyecto)

export default function Asistencias() {
    // const [pagina, setPagina] = useState(1)
    // const pageSize = 5
    const [presente, setPresente] = useState(false)
    const [ausente, setAusente] = useState(false)
    const [llegadaTarde, setLlegadaTarde] = useState(false)
    const [aj, setAj] = useState(false)
    const [ltj, setLtj] = useState(false)
    const [mf, setMf] = useState(false)
    const [mfj, setMfj] = useState(false)
    const [motivo, setMotivo] = useState('')
    const [asistencias, setAsistencias] = useState([])

    const [legajo, setLegajo] = useState("")
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [cursos, setCursos] = useState()
    const [fecha, setFecha] = useState(new Date())
    const [idCurso, setIdCurso] = useState("")
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: '' })
    const router = useRouter()
    const [asistenciaActual, setAsistenciaActual] = useState()
    let queryParams = []
    const [page, setPage] = useState(0)

    const paginatedAsistencias = () => {
        return asistencias?.slice(page, 10)
    }

    const nextPage = () => {
        if (countries.length > page + 10) {
            setPage(page => page + 10)
        }
    }
    const prevPage = () => {
        if (page > 0) {
            setPage(page => page - 10)
        }
    }




    const windowSize = useWindowSize()
   

    const IndicePc = <div className="col-md-4" style={{ position: "absolute", marginLeft: "800px", marginTop: "-40px" }} >

        <div className="bd-highlight">

            <div className="d-flex flex-row bd-highlight">
                <div className="p-2 bd-highlight">   
                 <h6 >
                    <strong>Asistencia modificada:</strong>
                </h6>
                </div>
                <div className="p-2 bd-highlight">
                    <button className="btn btn-primary"
                        style={{ width: "170px", height: "40px", marginTop: "-7px", backgroundColor: "lightBlue", border: "none" }}
                    ></button>
                </div>

            </div>
            <h6 className="p-2" style={{ marginTop: "-10px" }}>
                <strong>P:</strong>Presente  <br />
                <strong>A:</strong>Ausente <br />
                <strong>AJ:</strong> Ausente Justificado <br />
                <strong>LT:</strong>Llegada Tarde <br />
                <strong>LTJ:</strong> Llegada Tarde Justificada <br />
                <strong>MF:</strong>Media Falta <br />
                <strong>MFJ:</strong> Media Falta Justificada  <br />
            </h6>
        </div>
    </div>

    const indiceMobile = <div className="col-md-4" >

        <div className="bd-highlight">

            <div className="d-flex flex-row bd-highlight">
                <div className="p-2 bd-highlight">    
                <h6 >
                    <strong>Asistencia modificada:</strong>
                </h6>
                </div>
                <div className="p-2 bd-highlight">
                    <button className="btn btn-primary"
                        style={{ width: "170px", height: "40px", marginTop: "-7px", backgroundColor: "lightBlue", border: "none" }}
                    ></button>
                </div>

            </div>
            <h6 className="p-2" style={{ marginTop: "-10px" }}>
                <strong>P:</strong>Presente  <br />
                <strong>A:</strong>Ausente <br />
                <strong>AJ:</strong> Ausente Justificado <br />
                <strong>LT:</strong>Llegada Tarde <br />
                <strong>LTJ:</strong> Llegada Tarde Justificada <br />
                <strong>MF:</strong>Media Falta <br />
                <strong>MFJ:</strong> Media Falta Justificada  <br />
            </h6>
        </div>
    </div>

const [indice, setIndice] = useState(IndicePc)

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        listarCursos()
        listarAsistencias()
<<<<<<< HEAD
<<<<<<< HEAD
        setIndice(windowSize.width <= 440 ? setIndice(indiceMobile) : setIndice(IndicePc))
=======
        setIndice(windowSize.width <= 440 ? " " : "position: \"absolute\", marginLeft: \"-150px\", marginTop: \"-40px\"")
>>>>>>> parent of 6cf86a6 (modificando detalles)
    }, [loading, authUser, usuario.id])
=======
    }, [loading, authUser, idCurso, usuario.id])
>>>>>>> parent of 021b5a9 (quitando material del proyecto)

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const listarCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }

    const listarAsistencias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias`)
        // console.log(res);
        if (res.data) {
            setAsistencias(res.data)
        }
    }

    const buscarAsistencias = async () => {
        if (nombreAlumno) {
            queryParams.push({ nombreAlumno })
        }
        if (apellidoAlumno) {
            queryParams.push({ apellidoAlumno })
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias?${params}`)
        console.log(res.data);
        if (res.data) {
            setAsistencias(res.data)
        }
    }

    const handleCurso = (e) => {
        queryParams.push({ idCurso: Number(e.target.value) })
    }
    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
    }
    const handleLegajo = (e) => {
        setLegajo(e.target.value)
    }
    const handleFecha = (value) => {

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

    const onSave = async (id) => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${id}`, {
            presente: presente,
            ausente: ausente,
            ausenteJustificado: aj,
            llegadaTarde: llegadaTarde,
            llegadaTardeJustificada: ltj,
            mediaFalta: mf,
            mediaFaltaJustificada: mfj,
            idUsuario: usuario.id
        })
        console.log(res.data);
        onCancel()
        listarAsistencias()
    }

    const onUpdate = async (id) => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${id}`, {
            presente: presente,
            ausente: ausente,
            ausenteJustificado: aj,
            llegadaTarde: llegadaTarde,
            llegadaTardeJustificada: ltj,
            mediaFalta: mf,
            mediaFaltaJustificada: mfj,
            motivo: motivo,
            idUsuario: usuario.id
        })
        console.log(res.data);
        onCancel()
        listarAsistencias()
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleMotivo = (e) => {
        setMotivo(e.target.value)
    }
    return (
        <Layout>
<<<<<<< HEAD
            <div className="container">
                <h1>Asistencias</h1>
=======
            <Container
                style={{ position: 'relative', }}
            >

                <h3>Asistencias</h3>
>>>>>>> parent of 021b5a9 (quitando material del proyecto)

                {/* MODAL----------------------------------------------------------------------------------------------------------- */}
                <button className="button-61">Actualizar</button>
                {/* <Modal
                    open={open}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">

                    <Box style={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: "320px",
                        width: "min(100% - 15px, 500px)",
                        margin: "0 auto",
                        borderRadius: "25px",
                        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
                    }}>
                        <h1 style={{ textAlign: "center" }}>Ingrese motivo</h1>
                        <TextareaAutosize
                            style={{
                                border: "2px solid #ccc",
                                borderRadius: "10px",
                                height: "150px",
                                width: "min(100% - 15px, 410px)",
                                margin: "auto",
                                maxLenght: '300',
                                resize: "none",
                                display: "flex",
                                alignItems: "center",
                                fontSize: '20px',

                            }}
                            name="motivo"
                            value={motivo}
                            onChange={handleMotivo}
                        >

                        </TextareaAutosize>

                        <Stack direction="row">

                            <Button variant="contained" type="submit"
                                style={{ marginLeft: "48px", marginTop: "10px" }}
                            // onClick={handleClose}
                            // onClick={onUpdate(a?.id)}
                            >
                                Guardar
                            </Button>
                            <Button variant="contained" color="error" type="submit"
                                style={{ marginLeft: "10px", marginTop: "10px" }}
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </Box>
                </Modal> */}
                {/* MODAL------------------------------------------------------------------------------------------------- */}

<<<<<<< HEAD
                <form className="row g-3">

                    <div className="col-md-2">
                        <label htmlFor="demo-simple-select">Curso</label>
                        <select
                            className="form-select"
                            style={{ width: '90px', marginRight: '20px' }}
                            id="demo-simple-select"
                            value={idCurso}
                            name="idCurso"
                            onChange={handleCurso}
                        >
                            {
                                cursos && cursos.map((c, i) => (
                                    <option value={i === 0} key={c.id}>{c.curso?.nombre} {c.division?.division}</option>
                                ))
                            }
                        </select>
                    </div>
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
                        <h4>Buscar Alumno:</h4>
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
                                value={nombreAlumno}
                                onChange={handleNombreAlumno}
                                style={{ width: "170px" }}
                                required />
                            <label>Nombre Alumno</label>
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="col-md-3 ">
=======
                    <div className="col-md-2">
>>>>>>> parent of 6cf86a6 (modificando detalles)
                        <div className="form-group">
                            <input
                                className="form-control"
                                name="apellidoAlumno"
                                value={apellidoAlumno}
                                onChange={handleApellidoAlumno}
                                style={{ width: "170px" }}
                                required
                            />
                            <label>Apellido Alumno</label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button onClick={buscarAsistencias} className="button-61">
                            <FontAwesomeIcon
                                icon={faSearch} style={{marginRight: "5px"}} />
                             Buscar
                        </button>
                    </div>

                    {
                        indice
                    }
                  


                    {/* <div className="col-md-4" style={{ position: "absolute", marginLeft: "800px", marginTop: "-40px" }} >

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
                    </div> */}

                </form>


<<<<<<< HEAD
=======



>>>>>>> parent of 6cf86a6 (modificando detalles)
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
                                                    <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                                    <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                    <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
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
                                                        <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                                        <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                        <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
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
                                                        <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                                        <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                        <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                                        {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
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
=======
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="demo-simple-select">Curso</label>
                            <select
                                sx={{ width: '90px', marginRight: '20px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idCurso}
                                name="idCurso"
                                label="Curso"
                                onChange={handleCurso}
                            >
                                {
                                    cursos && cursos.map((c, i) => (
                                        <option selected={i === 0} value={c.id} key={c.id}>{c.curso?.nombre} {c.division?.division}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha"
                                value={fecha}
                                onChange={handleFecha}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <h4>Buscar Alumno:</h4>

                    <div className='row'>
                        <input className="form-control"
                            name="legajo"
                            value={legajo}
                            onChange={handleLegajo}
                            placeholder="Legajo" />
                        <input className="form-control"
                            name="nombreAlumno"
                            value={nombreAlumno}
                            onChange={handleNombreAlumno}
                            placeholder="Nombre" />
                        <input
                            className="form-control"
                            name="apellidoAlumno"
                            value={apellidoAlumno}
                            onChange={handleApellidoAlumno}
                            placeholder="Apellido" />

                        <button onClick={buscarAsistencias} className="btn btn-info">
                            <FontAwesomeIcon
                                icon={faSearch} />
                            Buscar
                        </button>
                    </div>
                    <div className="row">
                        <div className="row">
                            <h5 >
                                <strong>Asistencia modificada:</strong>
                            </h5>
                            <button disabled className="btn btn-outline-info">Contained</button>

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

                <table className="table table-responsive" aria-label="simple table">
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
                                        <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                        <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                        <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                        <td className="col-md-1 ">
                                            <Switch
                                                checked={presente}
                                                onChange={handlePresente}
                                            />
                                        </td>
                                        <td className="col-md-1 ">
                                            <Switch
                                                checked={ausente}
                                                onChange={handleAusente}
                                            />
                                        </td>
                                        <td className="col-md-1 ">
                                            <Switch
                                                checked={aj}
                                                onChange={handleAj}
                                            />
                                        </td>
                                        <td className="col-md-1 ">
                                            <Switch
                                                checked={llegadaTarde}
                                                onChange={handleLlegadaTarde}
                                            />
                                        </td>
                                        <td className="col-md-1">
                                            <Switch
                                                checked={ltj}
                                                onChange={handleLtj}
                                            />
                                        </td>
                                        <td className="col-md-1 ">
                                            <Switch
                                                checked={mf}
                                                onChange={handleMf}
                                            />
                                        </td>
                                        <td className="col-md-1">
                                            <Switch
                                                checked={mfj}
                                                onChange={handleMfj}
                                            />
                                        </td>
                                        <td className="col-md-2">
                                            {
                                                <Stack spacing={1} direction="row">
                                                    <Button variant="contained"
                                                        sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                        onClick={() => onSave(a?.id)}>
                                                        Guardar
                                                    </Button>
                                                </Stack>
                                            }
                                        </td>
                                    </tr>
                                ) : (
                                    a.motivo ? (
                                        <tr
                                            key={i} style={{ backgroundColor: 'lightsteelblue', color: 'black' }} >
                                            <td className="col-md-1 text-capitalize">{a.creadoEn}</td>
                                            <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                            <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                            <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                            {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                            <td className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={presente}
                                                            onChange={handlePresente}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.presente}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }
                                            </td>
                                            <td className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={ausente}
                                                            onChange={handleAusente}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.ausente}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }
                                            </td>
                                            <td className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={aj}
                                                            onChange={handleAj}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.ausenteJustificado}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }
                                            </td>
                                            <td className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={llegadaTarde}
                                                            onChange={handleLlegadaTarde}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.llegadaTarde}
                                                                disabled={bloquearCheck(a)}
                                                            />


                                                        )
                                                }
                                            </td>
                                            <td className="col-md-1">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                        <Switch
                                                            checked={ltj}
                                                            onChange={handleLtj}
                                                        />

                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.llegadaTardeJustificada}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }

                                            </td>
                                            <td className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={mf}
                                                            onChange={handleMf}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.mediaFalta}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }

                                            </td>
                                            <td className="col-md-1">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <Switch
                                                            checked={mfj}
                                                            onChange={handleMfj}
                                                        />
                                                    ) :
                                                        (
                                                            <Switch
                                                                type="checkbox"
                                                                checked={a.mediaFaltaJustificada}
                                                                disabled={bloquearCheck(a)}
                                                            />
                                                        )
                                                }
                                            </td>
                                            <td className="col-md-2">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                        <React.Fragment>
                                                            <Stack spacing={1} direction="row">

                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                <Button variant="contained" color="success"
                                                                    onClick={(e) => onSave(a?.id)}

                                                                >
                                                                    Actualizar
                                                                </Button>
                                                                {/* IRIA ACA-------------------------------------------- */}


                                                                <Button variant="contained" color="error"
                                                                    style={{ marginLeft: 8 }}
                                                                    onClick={() => onCancel()}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            </Stack>
                                                        </React.Fragment>
                                                    ) : (
                                                        <Stack spacing={1} direction="row">
                                                            <Button variant="contained"
                                                                onClick={() => setInEditMode({
                                                                    status: true,
                                                                    rowKey: i
                                                                })}
                                                            >Editar</Button>
                                                            <Button variant="contained"
                                                                sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                onClick={() => router.push(`/gestion/asistencias/${a?.id}`)}>
                                                                Info.
                                                            </Button>
                                                        </Stack>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ) :
                                        (
                                            <tr key={i} >

                                                <td className="col-md-1 text-capitalize">{a.creadoEn}</td>
                                                <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</td>
                                                <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                                {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                                <td className="col-md-1 ">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <Switch
                                                                name="presente"
                                                                checked={presente}
                                                                onChange={handlePresente}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.presente}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1 ">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <Switch
                                                                name="ausente"
                                                                checked={ausente}
                                                                onChange={handleAusente}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.ausente}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1 ">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <Switch
                                                                checked={aj}
                                                                onChange={handleAj}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.ausenteJustificado}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1 ">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <Switch
                                                                name="llegadaTarde"
                                                                checked={llegadaTarde}
                                                                onChange={handleLlegadaTarde}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.llegadaTarde}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <Switch
                                                                name="ltj"
                                                                checked={ltj}
                                                                onChange={handleLtj}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.llegadaTardeJustificada}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1 ">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <Switch
                                                                name="mf"
                                                                checked={mf}
                                                                onChange={handleMf}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.mediaFalta}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-1">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <Switch
                                                                name="mfj"
                                                                checked={mfj}
                                                                onChange={handleMfj}
                                                            />
                                                        ) :
                                                            (
                                                                <Switch
                                                                    type="checkbox"
                                                                    checked={a.mediaFaltaJustificada}
                                                                    disabled={bloquearCheck(a)}
                                                                />
                                                            )
                                                    }
                                                </td>
                                                <td className="col-md-2">
                                                    {

                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <React.Fragment>
                                                                <Stack spacing={1} direction="row">
                                                                    {/* IRIA ACA-------------------------------------------- */}
                                                                    <Button variant="contained" color="success"
                                                                        onClick={(e) => onSave(a?.id)}

                                                                    >
                                                                        Actualizar
                                                                    </Button>
                                                                    {/* IRIA ACA-------------------------------------------- */}


                                                                    <Button variant="contained" color="error"
                                                                        style={{ marginLeft: 8 }}
                                                                        onClick={() => onCancel()}
                                                                    >
                                                                        Cancelar
                                                                    </Button>
                                                                </Stack>
                                                            </React.Fragment>
                                                        ) : (
                                                            <Stack spacing={1} direction="row">

                                                                <Button variant="contained"
                                                                    onClick={() => setInEditMode({
                                                                        status: true,
                                                                        rowKey: i
                                                                    })}
                                                                >Editar</Button>
                                                                <Button variant="contained"
                                                                    sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                    onClick={() => router.push(`/gestion/asistencias/${a?.id}`)}>
                                                                    Info.
                                                                </Button>
                                                            </Stack>
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
>>>>>>> parent of 021b5a9 (quitando material del proyecto)
                {
                    asistencias && asistencias.length > 0 && (
                        <Pagination
                            onNextPage={nextPage}
                            onPrevPage={prevPage} />
                    )
                }
<<<<<<< HEAD
            </div>
        </Layout >
=======
            </Container>

        </Layout>
>>>>>>> parent of 021b5a9 (quitando material del proyecto)
    );
}