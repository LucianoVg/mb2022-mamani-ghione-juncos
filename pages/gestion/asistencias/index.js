import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Autocomplete, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination, Typography } from "@mui/material";
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

export default function Asistencias() {
    const [pagina, setPagina] = useState(1)
    const pageSize = 5
    const [presente, setPresente] = useState(false)
    const [ausente, setAusente] = useState(false)
    const [llegadaTarde, setLlegadaTarde] = useState(false)
    const [aj, setAj] = useState(false)
    const [ltj, setLtj] = useState(false)
    const [mf, setMf] = useState(false)
    const [mfj, setMfj] = useState(false)
    const [motivo, setMotivo] = useState(false)
    const [asistencias, setAsistencias] = useState([])
    const cantidadPaginas = Math.ceil(asistencias?.length / pageSize)
    const paginacion = usePagination(asistencias || [], pageSize)

    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")
    const [alumno, setAlumno] = useState("")
    const [fecha, setFecha] = useState(new Date().toISOString())
    const [cursos, setCursos] = useState()
    const [idCurso, setIdCurso] = useState("")
    const { loading, authUser } = useAuth()
    const [usuario, setUsuario] = useState({ id: '' })
    const router = useRouter()
    const [asistenciaActual, setAsistenciaActual] = useState()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        listarCursos()
        listarAsistencias()
    }, [loading, authUser, alumno, idCurso, documento, fecha, usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
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
        if (res.data) {
            setAsistencias(res.data)
        }
    }

    const buscarAsistencias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/${fecha}/${idCurso}/${alumno}/${documento}`)
        if (res.data) {
            setAsistencias(res.data)
        }
    }
    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }

    const handleCurso = (e) => {
        setIdCurso(e.target.value)
    }
    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    }
    const handleDocumento = (e) => {
        setDocumento(e.target.value)
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


    // const usuariosOptions = asistencias.map((asistencia, i) => ({
    //     id: asistencia.alumnoXcursoXdivision.usuario.id,
    //     label: asistencia.alumnoXcursoXdivision.usuario.nombre + ' ' + asistencia.alumnoXcursoXdivision.usuario.apellido
    // }))

    // const defaultOptions = {
    //     options: usuariosOptions,
    //     getOptionLabel: (option) => option.label,
    // }

    // const [value, setValue] = useState(null)
    // const handleValue = (e, newValue) => {
    //     setValue(newValue)
    //     if (newValue) {
    //         setAsistencias((asistencia) => asistencia.filter(u => u.id === newValue?.id))
    //     } else {
    //         traerUsuarios()
    //     }
    // };



    return (
        <Layout>
            <Container
                style={{ position: 'relative', }}
            >

                <Typography variant="h3" sx={{ marginBottom: '20px' }}>Asistencias</Typography>


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

                        <h4>Buscar Alumno:</h4>

                        {/* <Autocomplete
                            sx={{ width: '200px' }}
                            {...defaultOptions}
                            freeSolo
                            // isOptionEqualToValue={(option, value) => option.id === value.id}
                            multiple={false}
                            id="controlled-demo"
                            value={value}
                            onChange={handleValue}

                            renderInput={(params) => <TextField {...params} label="Alumnos" variant="outlined" />}

                        /> */}

                        <Box direction='row'>
                            <TextField
                                sx={{ width: '100px', marginRight: '20px', marginBottom: '20px' }}

                                name="documento"
                                value={documento}
                                onChange={handleDocumento}
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

                            <Stack direction="row" spacing={2}>
                                <h5 >
                                    <strong>Asistencia modificada:</strong>
                                    <Button variant="contained" disabled style={{ marginRight: '20px', fontSize: '20px', backgroundColor: 'lightsteelblue', color: 'transparent', height: '40px', marginTop: '10px' }}>Contained</Button>
                                </h5>

                            </Stack >
                            <h5 style={{ marginTop: '-10px' }}>
                                <strong>P:</strong>Presente  <br />
                                <strong>A:</strong>Ausente <br />
                                <strong>AJ:</strong> Ausente Justificado <br />
                                <strong>LT:</strong>Llegada Tarde <br />
                                <strong>LTJ:</strong> Llegada Tarde Justificada <br />
                                <strong>MF:</strong>Media Falta <br />
                                <strong>MFJ:</strong> Media Falta Justificada  <br />
                            </h5>
                        </Box>
                    </Grid>
                </Grid>


                <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell scope="col">Fecha</TableCell>
                                <TableCell scope="col">Legajo</TableCell>
                                <TableCell scope="col">Apellido</TableCell>
                                <TableCell scope="col">Nombre</TableCell>
                                {/* <TableCell scope="col">Preceptor</TableCell> */}
                                <TableCell scope="col">P</TableCell>
                                <TableCell scope="col">A</TableCell>
                                <TableCell scope="col">AJ</TableCell>
                                <TableCell scope="col">LT</TableCell>
                                <TableCell scope="col">LTJ</TableCell>
                                <TableCell scope="col">MF</TableCell>
                                <TableCell scope="col">MFJ</TableCell>
                                <TableCell scope="col">Acción</TableCell>
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
                                                    checked={presente}
                                                    onChange={handlePresente}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1 ">
                                                <Switch
                                                    checked={ausente}
                                                    onChange={handleAusente}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1 ">
                                                <Switch
                                                    checked={aj}
                                                    onChange={handleAj}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1 ">
                                                <Switch
                                                    checked={llegadaTarde}
                                                    onChange={handleLlegadaTarde}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1">
                                                <Switch
                                                    checked={ltj}
                                                    onChange={handleLtj}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1 ">
                                                <Switch
                                                    checked={mf}
                                                    onChange={handleMf}
                                                />
                                            </TableCell>
                                            <TableCell className="col-md-1">
                                                <Switch
                                                    checked={mfj}
                                                    onChange={handleMfj}
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
                                                </TableCell>
                                                <TableCell className="col-md-1 ">
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
                                                </TableCell>
                                                <TableCell className="col-md-1 ">
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
                                                </TableCell>
                                                <TableCell className="col-md-1">
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

                                                </TableCell>
                                                <TableCell className="col-md-1 ">
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

                                                </TableCell>
                                                <TableCell className="col-md-1">
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
                                                </TableCell>
                                                <TableCell className="col-md-2">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <React.Fragment>
                                                                <Stack spacing={1} direction="row">
                                                                    <Button variant="contained" color="success"
                                                                        onClick={(e) => onSave(a?.id)}>
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1 ">
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
                                                    </TableCell>
                                                    <TableCell className="col-md-1">
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
                                                    </TableCell>
                                                    <TableCell className="col-md-2">
                                                        {

                                                            inEditMode.status && inEditMode.rowKey === i ? (

                                                                <React.Fragment>
                                                                    <Stack spacing={1} direction="row">
                                                                        <Button variant="contained" color="success"
                                                                            onClick={() => onSave(a?.id)}
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
                {
                    asistencias && asistencias.length > 0 && (
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