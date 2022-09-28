import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
// import styles from "../../../styles/notas.module.css";
import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";

export default function Notas() {
    const [notas, setNotas] = useState()

    const [idTrimestre, setIdTrimestre] = useState("")
    const [idMateria, setIdMateria] = useState("")
    const [idCurso, setIdCurso] = useState("")
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")

    const [nota, setNota] = useState(1);

    const [columnName, setColumnName] = useState("");

    const [index, setIndex] = useState(0)
    const [cursos, setCursos] = useState()
    const [materias, setMaterias] = useState()
    const [trimestres, setTrimestres] = useState()

    const { loading, authUser } = useAuth()
    const router = useRouter()

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerCursos()
        traerMaterias()
        traerTrimestres()
        setIdTrimestre(trimestres && trimestres[0]?.id)
        setIdCurso(cursos && cursos[0]?.id)
        setIdMateria(materias && materias[0]?.id)
        defaultTrimestre()
    }, [idTrimestre, idMateria, idCurso, nombreAlumno, apellidoAlumno])


    const handleTrimestre = (e, value) => {
        setIndex(value)
        setIdTrimestre(trimestres[index].id)
        defaultTrimestre()
    }

    const handleMateria = (e) => {
        setIdMateria(e.target.value)
        defaultTrimestre()
    }

    const handleCurso = (e) => {
        setIdCurso(e.target.value)
        defaultTrimestre()
    }
    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
        defaultTrimestre()
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
        defaultTrimestre()
    }

    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.data) {
            setMaterias(res.data)
        }
    }
    const traerTrimestres = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`)
        if (res.data) {
            setTrimestres(res.data)
        }
    }

    const defaultTrimestre = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/${idTrimestre}/${idMateria}/${idCurso}/${nombreAlumno}/${apellidoAlumno}`)
            .then(res => {
                setNotas(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    const onEdit = (id) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
    }

    const updateNota = (id, newNota, columnName) => {
        axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/update/${id}`, {
            nota: newNota,
            nombreColumna: columnName
        })
            .then(res => {
                console.log(res.data);
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                defaultTrimestre();
            }).catch(err => {
                console.error(err);
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
        // reset the unit price state value
        setNota(0);
    }


    // const select = () => {
    //     var input = document.getElementById("select")
    //     input.select();
    //     input.focus();
    // }

    const onChangeNotaColumna = (e) => {
        setNota(Number.parseInt(e.target.value))
        setColumnName(e.target.name)
    }

    return (
        <Layout>
            <Container maxWidth={'xl'}>
                <Typography variant="h4">Notas</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel htmlFor="inputMateria">Materia</InputLabel>
                        <Select fullWidth id="inputMateria" name="idMateria" onChange={handleMateria} >
                            {
                                materias && materias?.map((m, i) => (

                                    <MenuItem selected={i === 0} key={i} value={m.id}>{m.nombre}</MenuItem>
                                ))
                            }
                        </Select>
                        <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                        <Select fullWidth id="inputCurso" name="idCurso" onChange={handleCurso} >
                            {
                                cursos && cursos?.map((c, i) => (

                                    <MenuItem selected={i === 0} key={i} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: '1.8mm' }}>
                        <TextField margin="normal"
                            fullWidth
                            name="nombreAlumno"
                            value={nombreAlumno}
                            onChange={handleNombreAlumno}
                            label="Nombre del alumno" />
                        <TextField margin="normal"
                            fullWidth
                            name="apellidoAlumno"
                            value={apellidoAlumno}
                            onChange={handleApellidoAlumno}
                            label="Apellido del alumno" />
                    </Grid>
                </Grid>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={index} onChange={handleTrimestre}>
                        <Tab label="Primer Trimestre" />
                        <Tab label="Segundo Trimestre" />
                        <Tab label="Tercer Trimestre" />
                    </Tabs>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Legajo</TableCell>
                                <TableCell align="right">Sexo</TableCell>
                                <TableCell align="right">Nombre</TableCell>
                                <TableCell align="right">Apellido</TableCell>
                                <TableCell align="right">Materia</TableCell>
                                <TableCell align="right">Nota 1</TableCell>
                                <TableCell align="right">Nota 2</TableCell>
                                <TableCell align="right">Nota 3</TableCell>
                                <TableCell align="right">Nota 4</TableCell>
                                <TableCell align="right">Nota 5</TableCell>
                                <TableCell align="right">Trimestre</TableCell>
                                <TableCell align="right">Operacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                notas && notas?.map((n, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">
                                            {n.alumnoXcursoXdivision?.usuario?.legajo}
                                        </TableCell>
                                        <TableCell align="left">
                                            {n.alumnoXcursoXdivision?.usuario?.sexo}
                                        </TableCell>
                                        <TableCell align="left">
                                            {n.alumnoXcursoXdivision?.usuario?.nombre}
                                        </TableCell>
                                        <TableCell align="left">
                                            {n.alumnoXcursoXdivision?.usuario?.apellido}
                                        </TableCell>
                                        <TableCell align="left">
                                            {n.materia?.nombre}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                    <TextField type="number"
                                                        margin="normal"
                                                        variant="standard"
                                                        name="nota1"
                                                        placeholder={n.nota1}
                                                        onChange={onChangeNotaColumna}

                                                    />
                                                ) :
                                                    (
                                                        n.nota1
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                    <TextField type="number"
                                                        name="nota2"
                                                        variant="standard"
                                                        placeholder={n.nota2}
                                                        onChange={onChangeNotaColumna}

                                                    />
                                                ) :
                                                    (
                                                        n.nota2
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                    <TextField type="number"
                                                        name="nota3"
                                                        variant="standard"
                                                        placeholder={n.nota3}
                                                        onChange={onChangeNotaColumna}

                                                    />
                                                ) :
                                                    (
                                                        n.nota3
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                    <TextField type="number"
                                                        name="nota4"
                                                        variant="standard"
                                                        placeholder={n.nota4}
                                                        onChange={onChangeNotaColumna}

                                                    />
                                                ) :
                                                    (
                                                        n.nota4
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (
                                                    <TextField type="number"
                                                        name="nota5"
                                                        variant="standard"
                                                        placeholder={n.nota5}
                                                        onChange={onChangeNotaColumna}

                                                    />
                                                ) :
                                                    (
                                                        n.nota5
                                                    )
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {n.trimestre?.trimestre}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                inEditMode.status && inEditMode.rowKey === i ? (

                                                    <React.Fragment>
                                                        <Grid container spacing={11}>
                                                            <Grid item xs={5} >
                                                                <Button variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={() => onSave(n.id, nota, columnName)}
                                                                >
                                                                    Guardar
                                                                </Button>
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="secondary"
                                                                    size="small"
                                                                    onClick={() => onCancel()}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </React.Fragment>
                                                ) : (
                                                    <Button
                                                        variant="contained"
                                                        color="info"
                                                        size="small"
                                                        onClick={() => setInEditMode({
                                                            status: true,
                                                            rowKey: i
                                                        })}
                                                    >
                                                        Editar
                                                    </Button>
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout >

    );

}