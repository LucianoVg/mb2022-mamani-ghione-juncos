import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Pagination } from "@mui/material";
import Switch from '@mui/material/Switch';
// DATEPICKER
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select from '@mui/material/Select';
import { usePagination } from "../../../components/hooks/paginationHook";
import { Search } from "@mui/icons-material";


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
    const [asistencias, setAsistencias] = useState()
    const cantidadPaginas = Math.ceil(asistencias?.length / pageSize)
    const paginacion = usePagination(asistencias || [], pageSize)
    const [idCurso, setIdCurso] = useState("")
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")
    const [alumno, setAlumno] = useState("")
    const [fecha, setFecha] = useState(new Date().toISOString())
    const [cursos, setCursos] = useState()

    useEffect(() => {
        listarAsistencias()
        listarCursos()
    }, [alumno, idCurso, documento, fecha])

    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }

    const listarAsistencias = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/${idCurso}/${fecha}/${alumno}/${documento}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setAsistencias(res.data)
                }

            }).catch(err => {
                console.error(err);
            })
    }


    const listarCursos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/curso`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(err);
            })
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
        setFecha(value || new Date().toISOString())
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
    // const onEdit = (id) => {
    //     setInEditMode({
    //         status: true,
    //         rowKey: id
    //     })

    // }

    const onSave = (id, newNota, columnName) => {
        updateNota(id, newNota, columnName);
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
        // reset the unit price state value
        // setNota(0);
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
            <Container
                style={{ position: 'relative', }}
            >

                <h1><strong>Asistencias</strong></h1>
                <Box component="span">
                    <Grid container
                        style={{ position: 'absolute', marginTop: '-100px' }}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-end"

                    >
                        <Grid item >
                            <Stack spacing={1} direction="row" >
                                <h5 ><strong>Asistencia modificada:</strong> </h5>
                                <Button variant="contained" disabled style={{ fontSize: '20px', backgroundColor: 'lightsteelblue', color: 'transparent', height: '40px', marginTop: '10px' }}>Contained</Button>
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

                        </Grid>
                    </Grid>

                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ width: '18%' }}>
                            <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idCurso}
                                name="idCurso"
                                label="Curso"
                                onChange={handleCurso}
                            >
                                {
                                    cursos && cursos.map((c) => (
                                        <MenuItem value={c.id} key={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                    ))
                                }
                            </Select>

                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha"
                                value={fecha}
                                onChange={handleFecha}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item xs={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha hasta"
                                value={hasta}
                                onChange={handleHasta}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid> */}
                    <Grid item xs={12}>
                        <h4>Buscar Alumno:</h4>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="documento"
                            value={documento}
                            onChange={handleDocumento}
                            label="Documento del alumno" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="nombreAlumno"
                            value={nombreAlumno}
                            onChange={handleNombreAlumno}
                            label="Nombre del alumno" />

                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="apellidoAlumno"
                            value={apellidoAlumno}
                            onChange={handleApellidoAlumno}
                            label="Apellido del alumno" />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="outlined" onClick={listarAsistencias} startIcon={<Search />} color="info">
                            Buscar
                        </Button>
                    </Grid>
                </Grid>


                <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell scope="col">Fecha</TableCell>
                                <TableCell scope="col">Documento</TableCell>
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

                                    a.motivo != null ? (

                                        < TableRow
                                            key={i} >

                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 text-capitalize">{new Date(a.creadoEn).toLocaleDateString('en-GB')}</TableCell>
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.dni}</TableCell>
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </TableCell>
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</TableCell>
                                            {/* <TableCell className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</TableCell> */}
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
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
                                                                defaultChecked={a.presente}
                                                                disabled={bloquearCheck(a)}
                                                            />


                                                        )
                                                }




                                            </TableCell>
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                        <Switch
                                                            name="aj"
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1">
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1">
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-2">
                                                {

                                                    inEditMode.status && inEditMode.rowKey === i ? (

                                                        <React.Fragment>
                                                            <Stack spacing={1} direction="row">
                                                                <Button variant="contained" color="success"

                                                                // onClick={() => onSave(n.id, nota, columnName)}
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
                                                                href={`/gestion/asistencias/mas_info`}>
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

                                                <TableCell className="col-md-1 text-capitalize">{new Date(a.creadoEn).toLocaleDateString('en-GB')}</TableCell>
                                                <TableCell className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.dni}</TableCell>
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
                                                                name="aj"
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

                                                                    // onClick={() => onSave(n.id, nota, columnName)}
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
                                                                    href="http://localhost:3000/gestion/asistencias/mas_info">
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
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    asistencias && (
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

        </Layout >

    );

}



