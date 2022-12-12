import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Search } from "@mui/icons-material";
import Loading from '../../components/loading';

export default function Asistencias() {
    const [alumnos, setAlumnos] = useState([])
    const [listado, setListado] = useState([])
    const [mensual, setMensual] = useState([])
    const [anual, setAnual] = useState([])
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const { loading, authUser } = useAuth()
    const [idAlumno, setIdAlumno] = useState(1)
    const [mes, setMes] = useState(3);
    const router = useRouter()
    const [cargando1, setCargando1] = useState(false)
    const [cargando2, setCargando2] = useState(false)
    const [cargando3, setCargando3] = useState(false)

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
                listadoAsistencias()
                conteoAsistenciasAnuales()
                conteoAsistenciasMensuales()
            }
        }
    }, [usuario.id, usuario.rol, loading, authUser])


    const conteoAsistenciasAnuales = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/conteo_anual/${idAlumno}`)
        if (res.status === 200) {
            console.log(res.data);
            setAnual(res.data)
        }
        setCargando2(false)
    }
    const conteoAsistenciasMensuales = async () => {
        setCargando1(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/conteo_mensual/${idAlumno}/${mes}`)
        if (res.status === 200) {
            console.log(res.data);
            setMensual(res.data)
        }
        setCargando1(false)
    }
    const listadoAsistencias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/listado_mensual/${idAlumno}/${mes}`)
        if (res.status === 200) {
            console.log(res.data);
            setListado(res.data)
        }
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
        }
    }

    const handleMes = (event) => {
        setMes(Number(event.target.value))
    };

    const handleSearch = async () => {
        await conteoAsistenciasAnuales()
        await conteoAsistenciasMensuales()
        await listadoAsistencias()
    }
    return (
        <Layout>
            {
                !usuario?.rol === 'Estudiante' && !usuario?.rol === 'Tutor'(
                    <FormControl>
                        <h3>Buscar Alumno</h3>
                        <FormControl style={{ marginRight: "20px" }}>
                            <Autocomplete
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
                    </FormControl>
                )

            }

            <FormControl>
                <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mes}
                    label="Mes"
                    onChange={handleMes}
                    style={{ width: "160px" }}
                >
                    <MenuItem value={3}>Marzo</MenuItem>
                    <MenuItem value={4}>Abril</MenuItem>
                    <MenuItem value={5}>Mayo</MenuItem>
                    <MenuItem value={6}>Junio</MenuItem>
                    <MenuItem value={7}>Julio</MenuItem>
                    <MenuItem value={8}>Agosto</MenuItem>
                    <MenuItem value={9}>Septiembre</MenuItem>
                    <MenuItem value={10}>Octubre</MenuItem>
                    <MenuItem value={11}>Noviembre</MenuItem>
                    <MenuItem value={12}>Diciembre</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ marginBottom: '20px', marginTop: 2 }}>
                <Button onClick={handleSearch} variant="outlined" startIcon={<Search />} color="info" >
                    Buscar
                </Button>
            </Box>

            <div sx={{ marginTop: '200px' }}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        {
                            !cargando1 && (
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
                                                    Total de Asistencias Mensuales
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <TableRow >
                                                <TableCell>Presente</TableCell>
                                                <TableCell>Ausente</TableCell>
                                                <TableCell>Llegada Tarde</TableCell>
                                                <TableCell>Media Falta</TableCell>

                                            </TableRow>
                                            <TableRow >
                                                <TableCell>{mensual[0]?.presente}</TableCell>
                                                <TableCell>{mensual[0]?.ausente} </TableCell>
                                                <TableCell>{mensual[0]?.llegadatarde}</TableCell>
                                                <TableCell>{mensual[0]?.mediafalta}</TableCell>

                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                        {
                            cargando1 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                    </Grid>
                    <Grid item xs>
                        {
                            !cargando2 && (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6}
                                                    sx={{
                                                        color: 'black',
                                                        backgroundColor: 'lightblue',
                                                    }}
                                                >
                                                    Total de Asistencias Anuales
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <TableRow >
                                                <TableCell>Presente</TableCell>
                                                <TableCell>Ausente</TableCell>
                                                <TableCell>Llegada Tarde</TableCell>
                                                <TableCell>Media Falta</TableCell>

                                            </TableRow>
                                            <TableRow >
                                                <TableCell>{anual[0]?.presente}</TableCell>
                                                <TableCell>{anual[0]?.ausente} </TableCell>
                                                <TableCell>{anual[0]?.llegadatarde}</TableCell>
                                                <TableCell>{anual[0]?.mediafalta}</TableCell>

                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                        {
                            cargando2 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !cargando3 && (
                                <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" scope="col">Fecha</TableCell>
                                                <TableCell align="center" scope="col">Asistencia</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                listado && listado.map((l, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center" className="col-md-1 text-capitalize">{l.creadoen}</TableCell>
                                                        <TableCell align="center" className="col-md-1 ">
                                                            {
                                                                l.presente ? (
                                                                    "Presente"
                                                                ) : (
                                                                    l.ausente ? (
                                                                        "Ausente"
                                                                    ) : (
                                                                        l.ausentejustificado ? (
                                                                            "Ausente Justificado"
                                                                        ) : (
                                                                            l.llegadatarde ? (
                                                                                "Llegada Tarde"
                                                                            ) : (
                                                                                l.llegadatardejustificada ? (
                                                                                    "Llegada Tarde Justificada"

                                                                                ) : (
                                                                                    l.mediafalta ? (
                                                                                        "Media Falta"
                                                                                    ) : (
                                                                                        l.mediafaltajustificada ? (
                                                                                            "Media Falta Justificada"
                                                                                        ) : (
                                                                                            "No tiene asistencia cargada"
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )

                                                            }

                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                        {
                            cargando3 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        </Layout >
    );
}