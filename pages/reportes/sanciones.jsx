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
    const [idAlumno, setIdAlumno] = useState(0)
    const { loading, authUser } = useAuth()
    const router = useRouter()


    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/')
            } else {
                listarAlumnos()
                listarSanciones()
            }
        }
    }, [usuario.id, usuario.rol, loading, authUser])

    if (usuario.rol === 'Estudiante') {
        let alumno = alumnos.find(a => a.idusuario === usuario.id)
        // setAlumnos(alumnos.id)
        console.log("estudiante", alumno.idusuario, "usuario", usuario.id)
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

    const handleAlumno = (e, newValue) => {
        if (newValue) {
            setIdAlumno(newValue.id);
        } else {
            setIdAlumno(0)
        }
    }

    return (
        <Layout>
            {
               !usuario?.rol?.tipo === 'Estudiante' && !usuario?.rol?.tipo === 'Tutor' (
                    <FormControl>
                        <h3>Buscar Alumno</h3>
                        <Grid container spacing={2} marginBottom={2}>
                            <Grid item xs={4}>
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
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={listarSanciones} variant="outlined" startIcon={<Search />} color="info" >
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                )
            }

            {/* <Box direction="row" rowSpacing={2}>
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

            </Box> */}

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
                                                {s.sancion?.motivo}
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
                                                {s.sancion?.usuario?.rol?.tipo}
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
                                                {s.sancion?.fecha}
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
                                                {s.sancion?.tiposancion?.tipo}
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