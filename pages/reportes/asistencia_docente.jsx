import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Search } from "@mui/icons-material";
import { Col, Row } from 'devextreme-react/responsive-box';
import Loading from '../../components/loading';

export default function AsistenciasDocentes() {
    const [docentes, setDocentes] = useState([])
    const [listado, setListado] = useState([])
    const [mensual, setMensual] = useState([])
    const [anual, setAnual] = useState([])
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const { loading, authUser } = useAuth()
    const [idDocente, setIdDocente] = useState(0)
    const [mes, setMes] = useState(0)
    const router = useRouter()
    const [cargando1, setCargando1] = useState(false)
    const [cargando2, setCargando2] = useState(false)
    const [cargando3, setCargando3] = useState(false)
    let queryParams = []

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/')
            } else {
                listarDocentes()
                listadoAsistencias()
                listarAsistenciasAnuales()
                listarAsistenciasMensuales()
            }
        }
    }, [usuario.id, usuario.rol, loading, authUser])


    const listarAsistenciasAnuales = async (params = "") => {
        setCargando3(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/asistencias_docente/conteo_anual?${params}`)
        if (res.status === 200) {
            console.log(res.data);
            setAnual(res.data)
        }
        setCargando3(false)
    }
    const listarAsistenciasMensuales = async (params = "") => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/asistencias_docente/conteo_mensual?${params}`)
        if (res.status === 200) {
            console.log(res.data);
            setMensual(res.data)
        }
        setCargando2(false)
    }
    const listadoAsistencias = async (params = "") => {
        setCargando1(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/asistencias_docente/listado_mensual?${params}`)
        if (res.status === 200) {
            console.log(res.data);
            setListado(res.data)
        }
        setCargando1(false)
    }

    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Director'
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

    const listarDocentes = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes`)
        if (res.status === 200) {
            setDocentes(res.data)
        }
    }

    const handleDocente = (e, newValue) => {
        if (newValue) {
            setIdDocente(newValue.id);
        }
    }
    const handleMes = (e) => {
        setMes(Number(e.target.value || 0))
    }

    const handleSearch = async () => {
        if (idDocente > 0) {
            queryParams.push({ idDocente })
        }
        if (mes > 0) {
            queryParams.push({ mes })
        }
        let params = ""
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        listarAsistenciasAnuales(params)
        listarAsistenciasMensuales(params)
        listadoAsistencias(params)
    }
    return (
        <Layout>
            <h3>Buscar Alumno</h3>
            <FormControl style={{ marginRight: "20px" }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    // value={value}
                    name="idDocente"
                    onChange={handleDocente}
                    getOptionLabel={(docentes) => `${docentes?.apellido} ${docentes?.nombre}`}
                    options={docentes}
                    sx={{ width: "250px" }}
                    isOptionEqualToValue={(option, value) =>
                        option?.apellido === value?.apellido
                    }
                    noOptionsText={"No existe un docente con ese nombre"}
                    renderOption={(props, docentes) => (
                        <Box component="li" {...props} key={docentes?.id}>
                            {docentes?.apellido} {docentes?.nombre}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Docente" />}
                />
            </FormControl>
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
            <div sx={{ marginTop: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        {
                            cargando2 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                        {
                            !cargando2 && (
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
                                            {
                                                mensual.map(m => (
                                                    <TableRow key={m.id} >
                                                        <TableCell>{m?.presente}</TableCell>
                                                        <TableCell>{m?.ausente} </TableCell>
                                                        <TableCell>{m?.llegadatarde}</TableCell>
                                                        <TableCell>{m?.mediafalta}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                    </Grid>
                    <Grid item xs>
                        {
                            cargando3 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                        {
                            !cargando3 && (
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
                                            {
                                                anual?.map(a => (
                                                    <TableRow key={a.id}>
                                                        <TableCell>{a?.presente}</TableCell>
                                                        <TableCell>{a?.ausente} </TableCell>
                                                        <TableCell>{a?.llegadatarde}</TableCell>
                                                        <TableCell>{a?.mediafalta}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            cargando1 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={80} />
                                </Container>
                            )
                        }
                        {
                            !cargando1 && (
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
                                                listado.map((l, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center" className="col-md-1 text-capitalize">{l.creadoen}</TableCell>
                                                        {/* <TableCell className="col-md-1">{a.alumnoxcursoxdivision?.usuario?.legajo}</TableCell> */}
                                                        {/* <TableCell align="center" className="col-md-1 text-capitalize" >{l.apellido} </TableCell>
                                                <TableCell align="center" className="col-md-1 text-capitalize">{l.nombre}</TableCell> */}
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
                    </Grid>
                </Grid>
            </div>
        </Layout >
    );
}