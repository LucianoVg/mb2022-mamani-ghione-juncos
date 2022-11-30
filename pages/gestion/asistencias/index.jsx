import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Modal, TextareaAutosize, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';
// DATEPICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
import { usePagination } from "../../../components/hooks/paginationHook";
import { Search } from "@mui/icons-material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import Loading from '../../../components/loading';

export default function Asistencias() {
    const [pagina, setPagina] = useState(1)
    const pageSize = 5
    // const [presente, setPresente] = useState(false)
    // const [ausente, setAusente] = useState(false)
    // const [llegadaTarde, setLlegadaTarde] = useState(false)
    // const [aj, setAj] = useState(false)
    // const [ltj, setLtj] = useState(false)
    // const [mf, setMf] = useState(false)
    // const [mfj, setMfj] = useState(false)
    // const [motivo, setMotivo] = useState('')
    const [asistencias, setAsistencias] = useState([])
    const cantidadPaginas = Math.ceil(asistencias?.length / pageSize)
    const paginacion = usePagination(asistencias || [], pageSize)

    const [legajo, setLegajo] = useState("")
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [cursos, setCursos] = useState()
    const [fecha, setFecha] = useState(new Date())
    const [idCurso, setIdCurso] = useState("")
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: '' })
    const router = useRouter()
    const [asistencia, setAsistencia] = useState({
        presente: false,
        ausente: false,
        ausenteJustificado: false,
        llegadaTarde: false,
        llegadaTardeJustificada: false,
        mediaFalta: false,
        mediaFaltaJustificada: false,
        motivo: ''
    })
    const [asistenciaActual, setAsistenciaActual] = useState({
        id: 0,
        presente: false,
        ausente: false,
        ausenteJustificado: false,
        llegadaTarde: false,
        llegadaTardeJustificada: false,
        mediaFalta: false,
        mediaFaltaJustificada: false,
        motivo: ''
    })

    const [cargandoInfo, setCargandoInfo] = useState(false)
    let queryParams = []

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        listarCursos()
        listarAsistencias()
    }, [loading, authUser, idCurso, usuario.id])

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
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias`)
        // console.log(res);
        if (res.data) {
            setAsistencias(res.data)
        }
        setCargandoInfo(false)
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
    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
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
        console.log({
            id: id,
            presente: asistencia.presente,
            ausente: asistencia.ausente,
            ausenteJustificado: asistencia.ausenteJustificado,
            llegadaTarde: asistencia.llegadaTarde,
            llegadaTardeJustificada: asistencia.llegadaTardeJustificada,
            mediaFalta: asistencia.mediaFalta,
            mediaFaltaJustificada: asistencia.mediaFaltaJustificada,
            idUsuario: usuario.id
        });
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${id}`, {
            presente: asistencia.presente,
            ausente: asistencia.ausente,
            ausenteJustificado: asistencia.ausenteJustificado,
            llegadaTarde: asistencia.llegadaTarde,
            llegadaTardeJustificada: asistencia.llegadaTardeJustificada,
            mediaFalta: asistencia.mediaFalta,
            mediaFaltaJustificada: asistencia.mediaFaltaJustificada,
            idUsuario: usuario.id
        })
        console.log(res.data);
        onCancel()
        listarAsistencias()
    }

    const onUpdate = async (id) => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${id}`, {
            presente: asistenciaActual.presente,
            ausente: asistenciaActual.ausente,
            ausenteJustificado: asistenciaActual.ausenteJustificado,
            llegadaTarde: asistenciaActual.llegadaTarde,
            llegadaTardeJustificada: asistenciaActual.llegadaTardeJustificada,
            mediaFalta: asistenciaActual.mediaFalta,
            mediaFaltaJustificada: asistenciaActual.mediaFaltaJustificada,
            motivo: asistenciaActual.motivo,
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
    }
    const handleAsistencia = (e) => {
        setAsistencia((asistencia) => ({ ...asistencia, [e.target.name]: Boolean(e.target.value) }))
    }
    const handleAsistenciaActual = (e) => {
        setAsistenciaActual({ ...asistenciaActual, [e.target.name]: e.target.value })
    }
    const [open, setOpen] = useState(false);
    const handleOpen = (asistencia) => {
        setAsistenciaActual({
            ...asistenciaActual,
            id: asistencia.id,
            presente: asistencia.presente,
            ausente: asistencia.ausente,
            ausenteJustificado: asistencia.ausenteJustificado,
            llegadaTarde: asistencia.llegadaTarde,
            llegadaTardeJustificada: asistencia.llegadaTardeJustificada,
            mediaFalta: asistencia.mediaFalta,
            mediaFaltaJustificada: asistencia.mediaFaltaJustificada
        })
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
            <Container
                style={{ position: 'relative', }}>

                <Typography variant="h3" sx={{ marginBottom: '20px' }}>Asistencias</Typography>

                {/* MODAL----------------------------------------------------------------------------------------------------------- */}
                {/* <Button onClick={handleOpen} sx={{ mb: 3 }} variant="contained">Actualizar</Button> */}
                <Modal
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
                            value={asistenciaActual.motivo}
                            onChange={handleAsistenciaActual}
                        >

                        </TextareaAutosize>

                        <Stack direction="row">

                            <Button variant="contained" type="submit"
                                style={{ marginLeft: "48px", marginTop: "10px" }}
                                // onClick={handleClose}
                                onClick={() => onUpdate(asistenciaActual.id)}
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
                </Modal>
                {/* MODAL------------------------------------------------------------------------------------------------- */}

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box sx={{ marginBottom: '20px' }}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                                <Select
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
                                            <MenuItem selected={i === 0} value={c.id} key={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    label="Fecha"
                                    value={fecha}
                                    onChange={handleFecha}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Buscar Alumno:
                        </Typography>

                        <Box direction='row'>
                            <TextField
                                sx={{ width: '100px', marginRight: '20px', marginBottom: '20px' }}
                                name="legajo"
                                value={legajo}
                                onChange={handleLegajo}
                                label="Legajo" />
                            <TextField
                                sx={{ width: '150px', marginRight: '20px', marginBottom: '20px' }}
                                name="nombreAlumno"
                                value={nombreAlumno}
                                onChange={handleNombreAlumno}
                                label="Nombre" />
                            <TextField
                                sx={{ width: '150px', marginRight: '20px' }}
                                name="apellidoAlumno"
                                value={apellidoAlumno}
                                onChange={handleApellidoAlumno}
                                label="Apellido" />
                        </Box>
                        <Box sx={{ marginTop: '20px' }}>
                            <Button variant="outlined" onClick={buscarAsistencias} startIcon={<Search />} color="info">
                                Buscar
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box component="span">
                            <div style={{ fontFamily: "roboto", fontSize: "20px" }}>
                                <Stack spacing={1} direction="row" >
                                    <h5 ><strong>Asistencia modificada:</strong> </h5>
                                    <Button variant="contained" disabled style={{ fontSize: '20px', backgroundColor: 'lightsteelblue', color: 'transparent', height: '40px', marginTop: '25px' }}>Contained</Button>
                                </Stack >
                                <h5 style={{ marginTop: '-10px' }}>
                                    <hr />
                                    <strong>P:</strong> Presente     <hr />
                                    <strong>A:</strong> Ausente    <hr />
                                    <strong>AJ:</strong> Ausente Justificado    <hr />
                                    <strong>LT:</strong> Llegada Tarde    <hr />
                                    <strong>LTJ:</strong> Llegada Tarde Justificada   <hr />
                                    <strong>MF:</strong> Media Falta    <hr />
                                    <strong>MFJ:</strong> Media Falta Justificada    <hr />
                                </h5>
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                {
                    cargandoInfo && (
                        <Container sx={{ m: 'auto', textAlign: 'center' }}>
                            <Loading size={80} />
                        </Container>
                    )
                }
                {
                    !cargandoInfo && (
                        <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" scope="col">Fecha</TableCell>
                                        <TableCell align="center" scope="col">Legajo</TableCell>
                                        <TableCell align="center" scope="col">Apellido</TableCell>
                                        <TableCell align="center" scope="col">Nombre</TableCell>
                                        {/* <TableCell scope="col">Preceptor</TableCell> */}
                                        <TableCell align="center" scope="col">P</TableCell>
                                        <TableCell align="center" scope="col">A</TableCell>
                                        <TableCell align="center" scope="col">AJ</TableCell>
                                        <TableCell  align="center"scope="col">LT</TableCell>
                                        <TableCell align="center" scope="col">LTJ</TableCell>
                                        <TableCell  align="center"scope="col">MF</TableCell>
                                        <TableCell align="center" scope="col">MFJ</TableCell>
                                        <TableCell align="center" scope="col">Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        paginacion.dataActual().map((a, i) => (
                                            !a.presente && !a.ausente && !a.ausenteJustificado && !a.llegadaTarde && !a.llegadaTardeJustificada && !a.mediaFalta && !a.mediaFaltaJustificadaa ? (
                                                <TableRow key={i} >
                                                    <TableCell className="col-md-1 text-capitalize">{a.creadoEn}</TableCell>
                                                    <TableCell className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</TableCell>
                                                    <TableCell className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </TableCell>
                                                    <TableCell className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        <Switch
                                                            name="presente"
                                                            value={asistencia.presente}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        <Switch
                                                            name="ausente"
                                                            value={asistencia.ausente}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        <Switch
                                                            name="ausenteJustificado"
                                                            value={asistencia.ausenteJustificado}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        <Switch
                                                            name="llegadaTarde"
                                                            value={asistencia.llegadaTarde}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
                                                        <Switch
                                                            name="llegadaTardeJustificada"
                                                            value={asistencia.llegadaTardeJustificada}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        <Switch
                                                            name="mediaFalta"
                                                            value={asistencia.mediaFalta}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
                                                        <Switch
                                                            name="mediaFaltaJustificada"
                                                            value={asistencia.mediaFaltaJustificada}
                                                            onChange={handleAsistencia}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="col-md-2">
                                                        {
                                                            <Stack spacing={1} direction="row">
                                                                <Button variant="contained"
                                                                    sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                    onClick={() => onSave(a?.id)}>
                                                                    Guardar
                                                                </Button>
                                                            </Stack>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                a.motivo ? (
                                                    <TableRow
                                                        key={i} style={{ backgroundColor: 'lightsteelblue', color: 'black' }} >
                                                        <TableCell className="col-md-1 text-capitalize">{a.creadoEn}</TableCell>
                                                        <TableCell className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</TableCell>
                                                        <TableCell className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </TableCell>
                                                        <TableCell className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</TableCell>
                                                        {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="presente"
                                                                        value={asistenciaActual.presente}
                                                                        onChange={handleAsistenciaActual}
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
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="ausente"
                                                                        value={asistenciaActual.ausente}
                                                                        onChange={handleAsistenciaActual}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={asistenciaActual.ausente}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="ausenteJustificado"
                                                                        value={asistenciaActual.ausenteJustificado}
                                                                        onChange={handleAsistenciaActual}
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
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="llegadaTarde"
                                                                        value={llegadaTarde}
                                                                        onChange={handleAsistenciaActual}
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
                                                        </TableCell>
                                                        <TableCell className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (

                                                                    <Switch
                                                                        name="llegadaTardeJustificada"
                                                                        value={asistenciaActual.llegadaTardeJustificada}
                                                                        onChange={handleAsistenciaActual}
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

                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="mediaFalta"
                                                                        value={asistenciaActual.mediaFalta}
                                                                        onChange={handleAsistenciaActual}
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

                                                        </TableCell>
                                                        <TableCell className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <Switch
                                                                        name="mediaFaltaJustificada"
                                                                        value={asistenciaActual.mediaFaltaJustificada}
                                                                        onChange={handleAsistenciaActual}
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
                                                        </TableCell>
                                                        <TableCell className="col-md-2">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                                    <React.Fragment>
                                                                        <Stack spacing={1} direction="row">

                                                                            {/* IRIA ACA-------------------------------------------- */}
                                                                            <Button variant="contained" color="info"
                                                                                onClick={() => handleOpen(a)}>
                                                                                Editar
                                                                            </Button>
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
                                                        </TableCell>
                                                    </TableRow>
                                                ) :
                                                    (
                                                        < TableRow key={i} >

                                                            <TableCell className="col-md-1 text-capitalize">{a.creadoEn}</TableCell>
                                                            <TableCell className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.legajo}</TableCell>
                                                            <TableCell className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </TableCell>
                                                            <TableCell className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</TableCell>
                                                            {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                                        <Switch
                                                                            name="presente"
                                                                            value={asistenciaActual.presente}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                                        <Switch
                                                                            name="ausente"
                                                                            value={asistenciaActual.ausente}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                                        <Switch
                                                                            name="ausenteJustificado"
                                                                            value={asistenciaActual.ausenteJustificado}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                                        <Switch
                                                                            name="llegadaTarde"
                                                                            value={asistenciaActual.llegadaTarde}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                                        <Switch
                                                                            name="llegadaTardeJustificada"
                                                                            value={asistenciaActual.llegadaTardeJustificada}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (
                                                                        <Switch
                                                                            name="mediaFalta"
                                                                            value={asistenciaActual.mediaFalta}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                                        <Switch
                                                                            name="mediaFaltaJustificada"
                                                                            value={asistenciaActual.mediaFaltaJustificada}
                                                                            onChange={handleAsistenciaActual}
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
                                                            </TableCell>
                                                            <TableCell className="col-md-2">
                                                                {

                                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                                        <React.Fragment>
                                                                            <Stack spacing={1} direction="row">
                                                                                {/* IRIA ACA-------------------------------------------- */}
                                                                                <Button variant="contained" color="info"
                                                                                    onClick={handleOpen}>
                                                                                    Editar
                                                                                </Button>
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
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                            )
                                        )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
                {
                    !cargandoInfo && asistencias && asistencias.length > 0 && (
                        <Pagination
                            sx={{ marginTop: 2 }}
                            count={cantidadPaginas}
                            size='large'
                            page={pagina}
                            variant="outlined"
                            shape='circular'
                            onChange={handlerCambioPagina} />
                    )
                }
            </Container>

        </Layout>
    );
}