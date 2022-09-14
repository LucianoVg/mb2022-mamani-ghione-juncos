import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jQuery'
import { Box, Stack, FormControl, Button, Container, Grid, InputLabel, MenuItem, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
// DATEPICKER
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { color } from "@mui/system";


export default function Asistencias() {



    // const [idMateria, setIdMateria] = useState(1)


    // const [columnName, setColumnName] = useState("");


    // const updateNota = (id, newNota, columnName) => {
    //     axios.put(`http://localhost:3000/api/gestion/notas/update/${id}`, {
    //         nota: newNota,
    //         nombreColumna: columnName
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //             // reset inEditMode and unit price state values
    //             onCancel();

    //             // fetch the updated data
    //             defaultTrimestre();
    //         }).catch(err => {
    //             console.error(err);
    //         })

    // }

    // const onSave = (id, newNota, columnName) => {
    //     updateNota(id, newNota, columnName);
    // }

    // const onCancel = () => {
    //     // reset the inEditMode state value
    //     setInEditMode({
    //         status: false,
    //         rowKey: null
    //     })
    //     // reset the unit price state value
    //     setNota(0);
    // }


    // const select = () => {
    //     var input = document.getElementById("select")
    //     input.select();
    //     input.focus();
    // }

    // const onChangeNotaColumna = (e) => {
    //     setNota(Number.parseInt(e.target.value))
    //     setColumnName(e.target.name)
    // }
    const [idCurso, setIdCurso] = useState(1)
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")
    const [alumno, setAlumno] = useState("")
    const [desde, setDesde] = useState(new Date().toISOString())
    const [hasta, setHasta] = useState(new Date().toISOString())
    const [cursos, setCursos] = useState()

    useEffect(() => {
        listarAsistencias()
        listarCursos()

        // MARCAR UNO Y DESMARCAR LOS OTROS
        $(document).on('click', 'Switch[type="checkbox"]', function () {
            $('Switch[type="checkbox"]').not(this).prop('checked', false);
        });


    }, [alumno, idCurso, documento, desde, hasta])


    const [asistencias, setAsistencias] = useState()
    const listarAsistencias = () => {
        axios.get(`http://localhost:3000/api/gestion/asistencias/${alumno}/${idCurso}/${documento}/${new Date(desde).toISOString()}/${new Date(hasta).toISOString()}`)
            .then(res => {
                console.log(res.data);
                setAsistencias(res.data)
            }).catch(err => {
                console.error(err);
            })
    }


    const listarCursos = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/curso`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const handleCurso = (e) => {
        setIdCurso(Number.parseInt(e.target.value))
        listarAsistencias()
    }
    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
        listarAsistencias()
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
        listarAsistencias()
    }
    const handleDocumento = (e) => {
        setDocumento(e.target.value)
        listarAsistencias()
    }
    const handleDesde = (e) => {
        setDesde(e.target.value || new Date().toISOString())
        listarAsistencias()
    }
    const handleHasta = (e) => {
        setHasta(e.target.value || new Date().toISOString())
        listarAsistencias()
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
    const onEdit = (id) => {
        setInEditMode({
            status: true,
            rowKey: id
        })

    }

    const onSave = (id, newNota, columnName) => {
        updateNota(id, newNota, columnName);
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // // reset the unit price state value
        // setNota(0);
    }

    const [value, setValue] = useState(dayjs());

    const [age, setAge] = React.useState('');

    const handleChange = (e) => {
        setAge(e.target.value);

    }

    const [checked, setChecked] = React.useState(true);

    const handleChecked = (e) =>  {
        setChecked(event.target.checked);
    };


    // const IOSSwitch = styled((props = SwitchProps) => (
    //     <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    // ))(({ theme }) => ({
    //     width: 42,
    //     height: 26,
    //     padding: 0,
    //     '& .MuiSwitch-switchBase': {
    //         padding: 0,
    //         margin: 2,
    //         transitionDuration: '300ms',
    //         '&.Mui-checked': {
    //             transform: 'translateX(16px)',
    //             color: '#fff',
    //             '& + .MuiSwitch-track': {
    //                 backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
    //                 opacity: 1,
    //                 border: 0,
    //             },
    //             '&.Mui-disabled + .MuiSwitch-track': {
    //                 opacity: 0.5,
    //             },
    //         },
    //         '&.Mui-focusVisible .MuiSwitch-thumb': {
    //             color: '#33cf4d',
    //             border: '6px solid #fff',
    //         },
    //         '&.Mui-disabled .MuiSwitch-thumb': {
    //             color:
    //                 theme.palette.mode === 'light'
    //                     ? theme.palette.grey[100]
    //                     : theme.palette.grey[600],
    //         },
    //         '&.Mui-disabled + .MuiSwitch-track': {
    //             opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    //         },
    //     },
    //     '& .MuiSwitch-thumb': {
    //         boxSizing: 'border-box',
    //         width: 22,
    //         height: 22,
    //     },
    //     '& .MuiSwitch-track': {
    //         borderRadius: 26 / 2,
    //         backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    //         opacity: 1,
    //         transition: theme.transitions.create(['background-color'], {
    //             duration: 500,
    //         }),
    //     },
    // }));

    return (
        <Layout title={'Asistencias'}>
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
                                <strong>MD:</strong>Media Falta <br />
                                <strong>MDJ:</strong> Media Falta Justificada  <br />
                            </h5>

                        </Grid>
                    </Grid>

                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl sx={{ width: '18%' }}>
                            <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Curso"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
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
                                label="Fecha desde"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={8}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                label="Fecha hasta"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>Buscar Alumno:</h4>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            name="nombreAlumno"
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
                </Grid>


                <TableContainer component={Paper} fullWidth style={{ marginTop: '40px' }}>
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
                                asistencias && asistencias?.map((a, i) => (

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
                                                            type="checkbox"
                                                            checked={a.presente}
                                                            onChange={handleChecked}
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
                                            <TableCell style={{ backgroundColor: 'lightsteelblue', color: 'black' }} className="col-md-1 ">
                                                {
                                                    inEditMode.status && inEditMode.rowKey === i ? (



                                                        <Switch
                                                            type="checkbox"
                                                            checked={a.ausente}
                                                            onChange={handleChecked}
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
                                                            type="checkbox"
                                                            checked={a.ausenteJustificado}
                                                            onChange={handleChecked}
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
                                                            type="checkbox"
                                                            checked={a.llegadaTarde}
                                                            onChange={handleChecked}
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
                                                            type="checkbox"
                                                            checked={a.llegadaTardeJustificada}
                                                            onChange={handleChecked}
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
                                                            type="checkbox"
                                                            checked={a.mediaFalta}
                                                            onChange={handleChecked}
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
                                                            type="checkbox"
                                                            checked={a.mediaFaltaJustificada}
                                                            onChange={handleChecked}
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
                                                                href="http://localhost:3000/gestion/asistencias/mas_info">
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
                                                                type="checkbox"
                                                                checked={a.presente}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.ausente}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.ausenteJustificado}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.llegadaTarde}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.llegadaTardeJustificada}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.mediaFalta}
                                                                onChange={handleChecked}
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
                                                                type="checkbox"
                                                                checked={a.mediaFaltaJustificada}
                                                                onChange={handleChecked}
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

            </Container>

        </Layout >

    );

}



