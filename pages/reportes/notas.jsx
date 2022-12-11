import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { Search } from "@mui/icons-material";


function createData(trimestre1, trimestre2, trimestre3) {
    return { trimestre1, trimestre2, trimestre3 };
}

const notas = [
    createData(6, 7, 8),
    createData(5, 6, 7),
    createData(9, 9, 8),
    createData(10, 3, 9),
    createData(6, 1, 10)
];

function createNota(id, nota1, nota2, nota3, nota4, nota5) {
    return { id, nota1, nota2, nota3, nota4, nota5 };
}

const puntos = [
    createNota(1, 6, 7, 8, 5, 6),
    createNota(2, 5, 6, 7, 4, 6),
    createNota(3, 9, 9, 8, 7, 8),

];

function createPromedio(promedio1, promedio2, promedio3) {
    return { promedio1, promedio2, promedio3 };
}

const promedio = [
    createPromedio(8, 7, 9),


];

export default function Notas() {
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")
    const [materia, setMateria] = useState("");

    const [notaTrimestre, setNotaTrimestre] = useState([])
    const [promedioTrimestre, setPromedioTrimestre] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const { loading, authUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                listarAlumnos()
                promedioPorTrimestre()
                notasPorTrimestre()
            }
        }
    }, [usuario.id, usuario.rol, loading, authUser])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }
    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Director'
            || usuario.rol === 'Vicedirector'
            || usuario.rol === 'Estudiante'
            || usuario.rol === 'Tutor'
    }
    const notasPorTrimestre = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/notas_trimestres/`)
            .then(res => {
                console.log(res.data);
                setNotaTrimestre(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const promedioPorTrimestre = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/promedios_trimestres/`)
            .then(res => {
                console.log(res.data);
                setPromedioTrimestre(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const listarAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumnos(res.data)
        }
    }

    const handleMateria = (e) => {
        setMateria(e.target.value);
    };

    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
    }
    const handleDocumento = (e) => {
        setDocumento(e.target.value)
    }
    return (
        <Layout>
            <Box>
                <FormControl sx={{ width: '150px' }}>
                    <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={materia}
                        label="Materia"
                        onChange={handleMateria}
                    >
                        <MenuItem value={10}>Lengua</MenuItem>
                        <MenuItem value={20}>Geografia</MenuItem>
                        <MenuItem value={30}>Historia</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <h3>Buscar Alumno</h3>

            <Box direction="row" rowSpacing={2}>
                <TextField
                    sx={{ width: '150px', marginRight: '20px', marginBottom: '20px' }}
                    name="documento"
                    value={documento}
                    onChange={handleDocumento}
                    label="Documento" />
                <TextField
                    sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}
                    name="nombreAlumno"
                    value={nombreAlumno}
                    onChange={handleNombreAlumno}
                    label="Nombre" />
                <TextField
                    sx={{ width: '200px', marginBottom: '20px' }}
                    name="apellidoAlumno"
                    value={apellidoAlumno}
                    onChange={handleApellidoAlumno}
                    label="Apellido" />

            </Box>
            <Button variant="outlined" startIcon={<Search />} color="info" sx={{ marginTop: '20px' }}>
                Buscar
            </Button>

            <Grid container spacing={2}>
                <Grid item xs>
                    <h2>Notas por trimestre</h2>
                    <div sx={{ marginBottom: '100px' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={12}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',



                                            }}
                                        >
                                            {notaTrimestre[0]?.materia}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        notaTrimestre.map((n, i) => (
                                            n.id == 1 ? (
                                                <TableRow key={i}>
                                                    <TableCell variant="head"
                                                        sx={{
                                                            color: 'black',
                                                            backgroundColor: 'lightblue',
                                                        }}
                                                    >
                                                        Primer Trimestre
                                                    </TableCell>
                                                    <TableCell>{n.nota1}</TableCell>
                                                    <TableCell>{n.nota2}</TableCell>
                                                    <TableCell>{n.nota3}</TableCell>
                                                    <TableCell>{n.nota4}</TableCell>
                                                    <TableCell>{n.nota5}</TableCell>
                                                </TableRow>
                                            ) : (
                                                n.id === 2 ? (
                                                    <TableRow key={i}>
                                                        <TableCell variant="head"
                                                            sx={{
                                                                color: 'black',
                                                                backgroundColor: 'lightblue',
                                                            }}
                                                        >
                                                            Segundo Trimestre
                                                        </TableCell>
                                                        <TableCell>{n.nota1}</TableCell>
                                                        <TableCell>{n.nota2}</TableCell>
                                                        <TableCell>{n.nota3}</TableCell>
                                                        <TableCell>{n.nota4}</TableCell>
                                                        <TableCell>{n.nota5}</TableCell>
                                                    </TableRow>
                                                ) : (
                                                    <TableRow key={i}>
                                                        <TableCell variant="head"
                                                            sx={{
                                                                color: 'black',
                                                                backgroundColor: 'lightblue',
                                                            }}
                                                        >
                                                            Tercer Trimestre
                                                        </TableCell>
                                                        <TableCell>{n.nota1}</TableCell>
                                                        <TableCell>{n.nota2}</TableCell>
                                                        <TableCell>{n.nota3}</TableCell>
                                                        <TableCell>{n.nota4}</TableCell>
                                                        <TableCell>{n.nota5}</TableCell>
                                                    </TableRow>
                                                )
                                            )

                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                <Grid item xs>
                    <h2>Promedio por trimestre</h2>

                    <div sx={{ marginTop: '200px' }}>
                        <TableContainer component={Paper} >
                            <Table aria-label="customized table" s >
                                <TableHead  >
                                    <TableRow>
                                        <TableCell align="center" colSpan={6}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}
                                        >
                                            {promedioTrimestre[0]?.materia}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}
                                        >
                                            Primer Trimestre
                                        </TableCell>
                                        <TableCell colSpan={2}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}
                                        >
                                            Segundo Trimestre
                                        </TableCell>

                                        <TableCell colSpan={2} align="center"
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}>
                                            Tercer Trimestre
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {

                                        <TableRow>
                                            <TableCell colSpan={2} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {Number(promedioTrimestre[0]?.promedio).toFixed(2)}
                                            </TableCell >
                                            <TableCell colSpan={2} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {Number(promedioTrimestre[1]?.promedio).toFixed(2)}
                                            </TableCell >
                                            <TableCell colSpan={2} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {Number(promedioTrimestre[2]?.promedio).toFixed(2)}
                                            </TableCell >
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </Layout >
    );
}