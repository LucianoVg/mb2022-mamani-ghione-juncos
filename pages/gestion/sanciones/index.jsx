import { Search } from "@mui/icons-material";
import { Button, Container, Box, Grid, TextField, Autocomplete, InputLabel, MenuItem, FormControl, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { usePagination } from "../../../components/hooks/paginationHook";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

const Sanciones = () => {
    const [sanciones, setSanciones] = useState()
    const [cursos, setCursos] = useState()
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [alumnos, setAlumnos] = useState([])
    const [cargandoInfo, setCargandoInfo] = useState(false)
    const pageSize = 5
    const cantidadPaginas = Math.ceil(sanciones?.length / pageSize)
    const paginacion = usePagination(sanciones || [], pageSize)
    const [pagina, setPagina] = useState(1)
    const [usuario, setUsuario] = useState({ rol: '' })
    let queryParams = []

    const handlerCambioPagina = (e, pagina) => {
        setPagina(pagina)
        paginacion.saltar(pagina)
    }
    const handleCurso = (e) => {
        if (Number(e.target.value) > 0) {
            queryParams.push({ idCurso: Number(e.target.value) })
        } else {
            traerSanciones()
        }
        console.log(e.target.value);
    }
    const buscarSanciones = async () => {
        let params = ""
        console.log(queryParams);
        queryParams.forEach(qp => {
            for (const key in qp) {
                params += `${key}=${qp[key]}&`
            }
        })
        setCargandoInfo(true)
        console.log(params);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones?${params}`)
        queryParams = []
        console.log(res.data);
        setSanciones(res.data)
        setCargandoInfo(false)
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerSanciones = async () => {
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`)
        if (res.data) {
            setSanciones(res.data)
        }
        setCargandoInfo(false)
    }
    const traerAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
        console.log(res.data);
        if (res.data) {
            setAlumnos(res.data)
        }
    }
    // const traerUsuario = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    //     if (res.data) {
    //         setUsuario({ rol: res.data?.rol?.tipo })
    //         console.log(usuario);
    //     }
    // }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }
        // traerUsuario()
        if (authUser.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerCursos()
                traerAlumnos()
                traerSanciones()
            }
        }
    }, [loading, authUser, authUser.rol])
    const tienePermisos = () => {
        return authUser.rol === 'Administrador'
            || authUser.rol === 'Director'
            || authUser.rol === 'Vicedirector'
            || authUser.rol === 'Preceptor'
            || authUser.rol === 'Docente'
    }
    const handleAlumno = (e, newValue) => {
        if (newValue) {
            queryParams.push({ idAlumno: newValue.id })
        } else {
            traerSanciones()
        }
    }

    return (
        <Layout>
            <Typography variant="h4" 
            sx={{marginBottom:"20px"}}
            >
                Sanciones</Typography>

            <Box direction='row' sx={{ marginBottom: '10px' }}>
                <FormControl style={{ marginRight: "20px" }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        // value={value}
                        name="idAlumno"
                        onChange={handleAlumno}
                        getOptionLabel={(alumno) => `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre}`}
                        options={alumnos}
                        sx={{ width: "250px" }}
                        isOptionEqualToValue={(option, value) =>
                            option?.usuario?.apellido === value?.usuario?.apellido
                        }
                        noOptionsText={"No existe un estudiante con ese nombre"}
                        renderOption={(props, alumno) => (
                            <Box component="li" {...props} key={alumno?.id}>
                                {alumno?.usuario?.apellido} {alumno?.usuario?.nombre}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Estudiante" />}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                    <Select
                        sx={{ width: '200px', marginRight: '20px' }}
                        id="inputCurso"
                        name={'idCurso'}
                        defaultValue={0}
                        onChange={handleCurso}
                        label="Curso"
                        MenuProps= {{ disableScrollLock: true } }
                        >
                        <MenuItem value={0}>Seleccione un curso</MenuItem>
                        {
                            cursos && cursos?.map((c, i) => (
                                <MenuItem key={i} value={c.id}>
                                    {c.curso?.nombre} {c.division.division}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Box direction='row'>
                <FormControl sx={{ marginRight: '20px', marginBottom: '10px' }}>
                    <Button startIcon={<Search />} variant="outlined"
                        onClick={buscarSanciones}>
                        Buscar
                    </Button>
                </FormControl>
                <FormControl>
                    <Button variant="contained"
                        sx={{ width: '150px' }}
                        onClick={(e) => {
                            e.preventDefault()
                            router.push('/gestion/sanciones/nueva_sancion')
                        }}>Nueva Sancion</Button>
                </FormControl>

            </Box>

            {
                cargandoInfo && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Loading size={80} />
                    </Container>
                )
            }
            {
                !cargandoInfo && (
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Nombre</TableCell>
                                    <TableCell align="right">Apellido</TableCell>
                                    <TableCell align="right">Curso</TableCell>
                                    <TableCell align="right">Division</TableCell>
                                    <TableCell align="right">Fecha</TableCell>
                                    <TableCell align="right">Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    paginacion.dataActual()?.map((s, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="right">{
                                                s.alumnoxcursoxdivision?.usuario?.nombre
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoxcursoxdivision?.usuario?.apellido
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoxcursoxdivision?.cursoxdivision?.curso?.nombre
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoxcursoxdivision?.cursoxdivision?.division?.division
                                            }</TableCell>
                                            <TableCell align="right">{s.sancion?.fecha}</TableCell>
                                            <TableCell align="right">
                                                <Link href={`/gestion/sanciones/${s.sancion?.id}`}>
                                                    <Button variant="outlined" component="label" color="info">
                                                        Detalles
                                                    </Button>
                                                </Link>
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
                !cargandoInfo && sanciones && sanciones?.length > 0 && (
                    <Container maxWidth={'lg'}
                        sx={{ marginTop: 2, width: 'fit-content', textAlign: 'center' }} >
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
        </Layout >
    )
}


export default Sanciones;