import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Loading from '../../components/loading';
import { Search } from "@mui/icons-material";


export default function Sancion() {
    const [alumnos, setAlumnos] = useState([])
    const [sanciones, setSanciones] = useState([])
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const [cargando, setCargando] = useState(false)
    const [idAlumno, setIdAlumno] = useState(1)
    const [idCurso, setIdCurso] = useState(1)
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/')
            } else {
                if (usuario.rol === 'Estudiante') {
                    traerAlumno()
                } else {
                    traerCursos()
                    listarAlumnos()
                }
                listarSanciones()
            }
        }
    }, [usuario.id, usuario.rol, loading, authUser])

    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.status === 200) {
            setCursos(res.data)
        }
    }
    const traerAlumno = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario.id}`)
        if (res.data) {
            setIdAlumno(res.data?.id)
        }
    }
    const listarSanciones = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/sanciones/${idAlumno}`)
        if (res.status === 200) {
            console.log(res.data);
            setSanciones(res.data)
        }
        setCargando(false)
    }

    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Director'
            || usuario.rol === 'Vicedirector'
            || usuario.rol === 'Estudiante'
            || usuario.rol === 'Tutor'
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }

    const listarAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumnos(res.data)
        }
    }
    const buscarAlumnos = async (idCurso) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${idCurso}`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumnos(res.data)
        }
    }

    const handleAlumno = (e, newValue) => {
        if (newValue) {
            setIdAlumno(newValue.id);
        } else {
            setIdAlumno(0)
        }
    }

    const handleCurso = (e) => {
        console.log(e.target.value);
        buscarAlumnos(Number(e.target.value))
    }

    return (
        <Layout>
            {
                usuario?.rol !== 'Estudiante'
                && usuario?.rol !== 'Tutor' && (
                    <Box>
                        <h3>Buscar Alumno</h3>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 5 }}
                            sx={{ marginBottom: '30px' }}
                        >
                            <FormControl style={{ marginRight: "20px" }} size={'small'}>
                                <InputLabel htmlFor='selectCurso'>Curso</InputLabel>
                                <Select
                                    sx={{ width: 120 }}
                                    onChange={handleCurso}>
                                    {
                                        cursos.map(c => (
                                            <MenuItem key={c.id} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl style={{ marginRight: "20px" }}>
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    id="combo-box-demo"
                                    // value={value}
                                    name="idAlumno"
                                    onChange={handleAlumno}
                                    getOptionLabel={(alumnos) => `${alumnos?.usuario?.apellido} ${alumnos?.usuario?.nombre}`}
                                    options={alumnos}
                                    sx={{ width: "250px" }}
                                    isOptionEqualToValue={(option, value) =>
                                        option?.apellido === value?.apellido
                                    }
                                    noOptionsText={"No existe un alumno con ese nombre"}
                                    renderOption={(props, alumnos) => (
                                        <Box component="li" {...props} key={alumnos?.id}>
                                            {alumnos?.usuario?.apellido} {alumnos?.usuario?.nombre}
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Alumno" />}
                                />
                            </FormControl>
                            <Button onClick={listarSanciones} variant="outlined" startIcon={<Search />} color="info" >
                                Buscar
                            </Button>

                        </Stack>

                    </Box>
                )
            }

            <div sx={{ marginTop: '200px' }}>
                {
                    !cargando && (
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="customized table" s >
                                <TableHead  >
                                    <TableRow>
                                        <TableCell colSpan={4}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}
                                        >
                                            Motivo
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
                                            Autoridad
                                        </TableCell>

                                        <TableCell colSpan={1} align="center"
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}>
                                            Fecha
                                        </TableCell>
                                        <TableCell colSpan={1}
                                            sx={{
                                                color: 'black',
                                                backgroundColor: 'lightblue',
                                                borderRightColor: 'black',
                                                borderRight: 1,

                                                borderBottom: 1,
                                                borderBottomColor: 'black'
                                            }}
                                        >
                                            Tipo
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {sanciones && sanciones.map((s, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={4} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {s?.motivo}
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
                                                {s?.usuario?.rol?.tipo}
                                            </TableCell >
                                            <TableCell colSpan={1} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {s?.fecha}
                                            </TableCell >
                                            <TableCell colSpan={1} component="th" scope="row"
                                                sx={{
                                                    borderRightColor: 'black',
                                                    borderRight: 1,
                                                    borderTop: 1,
                                                    borderTopColor: 'black',
                                                    borderBottom: 1,
                                                    borderBottomColor: 'black'

                                                }}
                                            >
                                                {s?.tiposancion?.tipo}
                                            </TableCell >
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
                {
                    cargando && (
                        <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                            <Loading size={80} />
                        </Container>
                    )
                }
            </div>
        </Layout >
    );
}