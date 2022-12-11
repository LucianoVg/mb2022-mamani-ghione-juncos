import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Modal, TextareaAutosize, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination, Typography, IconButton } from "@mui/material";
import Switch from '@mui/material/Switch';
// DATEPICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
import { usePagination } from "../../../components/hooks/paginationHook";
import { Add, Search } from "@mui/icons-material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import Loading from '../../../components/loading';

export default function Asistencias() {
    const [pagina, setPagina] = useState(1)
    const pageSize = 5
    const [asistencias, setAsistencias] = useState([])
    const cantidadPaginas = Math.ceil(asistencias?.length / pageSize)
    const paginacion = usePagination(asistencias || [], pageSize)

    const [legajo, setLegajo] = useState("")
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [cursos, setCursos] = useState()
    const [idCurso, setIdCurso] = useState(0)
    const [fecha, setFecha] = useState(null)
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const router = useRouter()
    const [guardando, setGuardando] = useState(false)
    const [cargandoInfo, setCargandoInfo] = useState(false)
    const [presente, setPresente] = useState(false)
    const [ausente, setAusente] = useState(false)
    const [llegadaTarde, setLlegadaTarde] = useState(false)
    const [aj, setAj] = useState(false)
    const [ltj, setLtj] = useState(false)
    const [mf, setMf] = useState(false)
    const [mfj, setMfj] = useState(false)
    const [motivo, setMotivo] = useState("")
    const [asistenciaId, setAsistenciaId] = useState(0)
    let queryParams = []

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                listarCursos()
                listarAsistencias()
            }
        }
    }, [loading, authUser, usuario.id, usuario.rol])

    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Director'
            || usuario.rol === 'Preceptor'
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
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
            queryParams.push({ nombreAlumno: nombreAlumno })
        }
        if (apellidoAlumno) {
            queryParams.push({ apellidoAlumno: apellidoAlumno })
        }
        if (legajo) {
            queryParams.push({ legajo: legajo })
        }
        if (idCurso) {
            queryParams.push({ idCurso: idCurso })
        }
        if (fecha) {
            queryParams.push({ fecha: fecha.toLocaleDateString('es-AR').split('T')[0] })
        }
        let params = ""
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        console.log(params);
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias?${params}`)
        console.log(res.data);
        if (res.data) {
            setAsistencias(res.data)
        }
        setCargandoInfo(false)
        resetValues()
        queryParams = []
    }
    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }

    const handleCurso = (e) => {
        setIdCurso(Number(e.target.value))
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
        setFecha(new Date(value))
    }

    const bloquearCheck = (a) => {
        return (
            a.presente || a.ausente || a.ausentejustificado || a.llegadatarde || a.llegadatardejustificada || a.mediafalta || a.mediafaltajustificada
        )
    }
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: 0
    });

    const resetValues = () => {
        setIdCurso(0)
        setFecha(null)
        setLegajo("")
        setNombreAlumno("")
        setApellidoAlumno("")
    }
    const onSave = async (id) => {
        // console.log({
        //     id: id,
        //     presente: asistencia.presente,
        //     ausente: asistencia.ausente,
        //     ausenteJustificado: asistencia.ausenteJustificado,
        //     llegadaTarde: asistencia.llegadaTarde,
        //     llegadaTardeJustificada: asistencia.llegadaTardeJustificada,
        //     mediaFalta: asistencia.mediaFalta,
        //     mediaFaltaJustificada: asistencia.mediaFaltaJustificada,
        //     idUsuario: usuario.id
        // });
        setGuardando(true)
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${id}`, {
            presente: presente,
            ausente: ausente,
            ausenteJustificado: aj,
            llegadaTarde: llegadaTarde,
            llegadaTardeJustificada: ltj,
            mediaFalta: mf,
            mediaFaltaJustificada: mfj,
            idUsuario: usuario.id,
            motivo: motivo
        })
        setGuardando(false)
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

        if (open) {
            handleClose()
        }
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
    const handleMotivo = (e) => {
        setMotivo(e.target.value)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (asistencia) => {
        setMotivo(asistencia.motivo)
        setAsistenciaId(asistencia.id)
        setOpen(true);
    }

    const handleClose = () => {
        setMotivo("")
        setAsistenciaId(0)
        setOpen(false);
    };

    return (
        <Layout>
            <Container maxWidth="xl"
                style={{ position: 'relative', }}>

                <Typography variant="h3" sx={{ marginBottom: '20px' }}>Asistencias</Typography>

                {/* MODAL----------------------------------------------------------------------------------------------------------- */}
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
                        height: "250px",
                        width: "min(100% - 15px, 500px)",
                        margin: "0 auto",
                        borderRadius: "25px",
                        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
                    }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>Ingrese motivo</Typography>
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
                            onChange={handleMotivo}>
                        </TextareaAutosize>

                        <Stack direction="row">
                            <Button variant="contained" type="submit"
                                style={{ marginLeft: "48px", marginTop: "10px" }}
                                // onClick={handleClose}
                                onClick={() => onSave(asistenciaId)}>
                                Guardar
                            </Button>
                            <Button variant="contained" color="error" type="submit"
                                style={{ marginLeft: "10px", marginTop: "10px" }}
                                onClick={handleClose}>
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
                                    label="Curso"
                                    name="idCurso"
                                    value={idCurso}
                                    onChange={handleCurso}>
                                    <MenuItem value={0}>Seleccione un curso</MenuItem>
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
                                    name="fecha"
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
                                type="number"
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
                                        <TableCell align="center" scope="col">LT</TableCell>
                                        <TableCell align="center" scope="col">LTJ</TableCell>
                                        <TableCell align="center" scope="col">MF</TableCell>
                                        <TableCell align="center" scope="col">MFJ</TableCell>
                                        <TableCell align="center" scope="col">
                                            {
                                                guardando
                                                    ? <Loading size={30} />
                                                    : <span>Accion</span>
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        paginacion.dataActual().map((a, i) => (
                                            !a.presente && !a.ausente && !a.ausentejustificado && !a.llegadatarde && !a.llegadatardejustificada && !a.mediafalta && !a.mediafaltajustificada ? (
                                                <TableRow key={a.id} >
                                                    <TableCell className="col-md-1 text-capitalize">{a.creadoen}</TableCell>
                                                    <TableCell className="col-md-1">{a.alumnoxcursoxdivision?.usuario?.legajo}</TableCell>
                                                    <TableCell className="col-md-1 text-capitalize" >{a.alumnoxcursoxdivision?.usuario?.apellido} </TableCell>
                                                    <TableCell className="col-md-1 text-capitalize">{a.alumnoxcursoxdivision?.usuario?.nombre}</TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (

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
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                <Switch
                                                                    checked={aj}
                                                                    onChange={handleAj}
                                                                />
                                                            ) :
                                                                (
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={a.ausentejustificado}
                                                                        disabled={bloquearCheck(a)}
                                                                    />
                                                                )
                                                        }
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                <Switch
                                                                    name="llegadaTarde"
                                                                    checked={llegadaTarde}
                                                                    onChange={handleLlegadaTarde}
                                                                />
                                                            ) :
                                                                (
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={a.llegadatarde}
                                                                        disabled={bloquearCheck(a)}
                                                                    />
                                                                )
                                                        }
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                <Switch
                                                                    name="ltj"
                                                                    checked={ltj}
                                                                    onChange={handleLtj}
                                                                />
                                                            ) :
                                                                (
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={a.llegadatardejustificada}
                                                                        disabled={bloquearCheck(a)}
                                                                    />
                                                                )
                                                        }
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                <Switch
                                                                    name="mf"
                                                                    checked={mf}
                                                                    onChange={handleMf}
                                                                />
                                                            ) :
                                                                (
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={a.mediafalta}
                                                                        disabled={bloquearCheck(a)}
                                                                    />
                                                                )
                                                        }
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                <Switch
                                                                    name="mfj"
                                                                    checked={mfj}
                                                                    onChange={handleMfj}
                                                                />
                                                            ) :
                                                                (
                                                                    <Switch
                                                                        type="checkbox"
                                                                        checked={a.mediafaltajustificada}
                                                                        disabled={bloquearCheck(a)}
                                                                    />
                                                                )
                                                        }
                                                    </TableCell>

                                                    <TableCell className="col-md-2">
                                                        {
                                                            inEditMode.status
                                                                && inEditMode.rowKey === a?.id
                                                                ? (
                                                                    <Stack spacing={1} direction="row">
                                                                        <Button variant="contained"
                                                                            sx={{ backgroundColor: 'lightblue', color: 'black' }}
                                                                            onClick={() => onSave(a?.id)}>
                                                                            Cargar
                                                                        </Button>
                                                                        <Button variant="contained"
                                                                            color="secondary"
                                                                            onClick={() => onCancel()}>
                                                                            Cancelar
                                                                        </Button>
                                                                    </Stack>
                                                                ) :
                                                                (
                                                                    <Stack spacing={1} direction="row">
                                                                        <IconButton
                                                                            size="large"
                                                                            onClick={() => setInEditMode({
                                                                                status: true,
                                                                                rowKey: a?.id
                                                                            })}
                                                                            color="success">
                                                                            <Add />
                                                                        </IconButton>
                                                                    </Stack>
                                                                )
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                a.motivo ? (
                                                    <TableRow
                                                        key={a.id} style={{ backgroundColor: 'lightsteelblue', color: 'black' }} >
                                                        <TableCell className="col-md-1 text-capitalize">{a.creadoen}</TableCell>
                                                        <TableCell className="col-md-1">{a.alumnoxcursoxdivision?.usuario?.legajo}</TableCell>
                                                        <TableCell className="col-md-1 text-capitalize" >{a.alumnoxcursoxdivision?.usuario?.apellido} </TableCell>
                                                        <TableCell className="col-md-1 text-capitalize">{a.alumnoxcursoxdivision?.usuario?.nombre}</TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (

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
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (
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
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                    <Switch
                                                                        checked={aj}
                                                                        onChange={handleAj}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={a.ausentejustificado}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                    <Switch
                                                                        name="llegadaTarde"
                                                                        checked={llegadaTarde}
                                                                        onChange={handleLlegadaTarde}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={a.llegadatarde}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                    <Switch
                                                                        name="ltj"
                                                                        checked={ltj}
                                                                        onChange={handleLtj}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={a.llegadatardejustificada}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-1 ">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                    <Switch
                                                                        name="mf"
                                                                        checked={mf}
                                                                        onChange={handleMf}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={a.mediafalta}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-1">
                                                            {
                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                    <Switch
                                                                        name="mfj"
                                                                        checked={mfj}
                                                                        onChange={handleMfj}
                                                                    />
                                                                ) :
                                                                    (
                                                                        <Switch
                                                                            type="checkbox"
                                                                            checked={a.mediafaltajustificada}
                                                                            disabled={bloquearCheck(a)}
                                                                        />
                                                                    )
                                                            }
                                                        </TableCell>
                                                        <TableCell className="col-md-2">
                                                            {

                                                                inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                    <React.Fragment>
                                                                        <Stack spacing={1} direction="row">
                                                                            <Button variant="contained" color="success"
                                                                                onClick={() => handleOpen(a)}
                                                                            >
                                                                                Guardar
                                                                            </Button>

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
                                                                                rowKey: a?.id
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
                                                        <TableRow key={a.id} >

                                                            <TableCell className="col-md-1 text-capitalize">{a.creadoen}</TableCell>
                                                            <TableCell className="col-md-1">{a.alumnoxcursoxdivision?.usuario?.legajo}</TableCell>
                                                            <TableCell className="col-md-1 text-capitalize" >{a.alumnoxcursoxdivision?.usuario?.apellido} </TableCell>
                                                            <TableCell className="col-md-1 text-capitalize">{a.alumnoxcursoxdivision?.usuario?.nombre}</TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (

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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (
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
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                        <Switch
                                                                            checked={aj}
                                                                            onChange={handleAj}
                                                                        />
                                                                    ) :
                                                                        (
                                                                            <Switch
                                                                                type="checkbox"
                                                                                checked={a.ausentejustificado}
                                                                                disabled={bloquearCheck(a)}
                                                                            />
                                                                        )
                                                                }
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                        <Switch
                                                                            name="llegadaTarde"
                                                                            checked={llegadaTarde}
                                                                            onChange={handleLlegadaTarde}
                                                                        />
                                                                    ) :
                                                                        (
                                                                            <Switch
                                                                                type="checkbox"
                                                                                checked={a.llegadatarde}
                                                                                disabled={bloquearCheck(a)}
                                                                            />
                                                                        )
                                                                }
                                                            </TableCell>
                                                            <TableCell className="col-md-1">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                        <Switch
                                                                            name="ltj"
                                                                            checked={ltj}
                                                                            onChange={handleLtj}
                                                                        />
                                                                    ) :
                                                                        (
                                                                            <Switch
                                                                                type="checkbox"
                                                                                checked={a.llegadatardejustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                            />
                                                                        )
                                                                }
                                                            </TableCell>
                                                            <TableCell className="col-md-1 ">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (
                                                                        <Switch
                                                                            name="mf"
                                                                            checked={mf}
                                                                            onChange={handleMf}
                                                                        />
                                                                    ) :
                                                                        (
                                                                            <Switch
                                                                                type="checkbox"
                                                                                checked={a.mediafalta}
                                                                                disabled={bloquearCheck(a)}
                                                                            />
                                                                        )
                                                                }
                                                            </TableCell>
                                                            <TableCell className="col-md-1">
                                                                {
                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                        <Switch
                                                                            name="mfj"
                                                                            checked={mfj}
                                                                            onChange={handleMfj}
                                                                        />
                                                                    ) :
                                                                        (
                                                                            <Switch
                                                                                type="checkbox"
                                                                                checked={a.mediafaltajustificada}
                                                                                disabled={bloquearCheck(a)}
                                                                            />
                                                                        )
                                                                }
                                                            </TableCell>
                                                            <TableCell className="col-md-2">
                                                                {

                                                                    inEditMode.status && inEditMode.rowKey === a?.id ? (

                                                                        <React.Fragment>
                                                                            <Stack spacing={1} direction="row">
                                                                                <Button variant="contained" color="success"
                                                                                    onClick={() => handleOpen(a)}
                                                                                >
                                                                                    Guardar
                                                                                </Button>

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
                                                                                    rowKey: a?.id
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
                        <Container
                            sx={{ marginTop: 2, width: 'fit-content', textAlign: 'center' }}>
                            <Pagination
                                count={cantidadPaginas}
                                size='large'
                                page={pagina}
                                variant="outlined"
                                shape='circular'
                                onChange={handlerCambioPagina} />
                        </Container>
                    )
                }
            </Container>
        </Layout>
    );
}