import { Search } from "@mui/icons-material";
import { Button, Container, Box, Grid,TextField, Autocomplete, InputLabel, MenuItem, FormControl, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Pagination } from "@mui/material";
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
    const queryParams = []

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
    // const handleAlumno = (e) => {
    //     if (Number(e.target.value) > 0) {
    //         queryParams.push({ idAlumno: Number(e.target.value) })
    //     } else {
    //         traerSanciones()
    //     }
    //     console.log(e.target.value);
    // }
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
        console.log(res.data);
        setSanciones(res.data)
        setCargandoInfo(false)
    }
    const traerCursos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
    }
    const traerSanciones = async () => {
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`)
        if (res.data) {
            console.log(res.data);
            setSanciones(res.data)
        }
        setCargandoInfo(false)
    }
    const traerAlumnos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })
    }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }
        traerCursos()
        traerAlumnos()
        traerSanciones()
    }, [loading, authUser])




    const [idAlumno, setIdAlumno] = useState(0)



    const handleAlumno = (e, newValue) => {
        if (Number(e.target.value) > 0) {
            queryParams.push({ idAlumno: newValue.id })

        }
    }




    return (
        <Layout>
            <Typography variant="h4" textAlign={'center'}>Sanciones</Typography>

            <Box direction='row' sx={{ marginBottom: '10px' }}>
                {/* <FormControl>
                    <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                    <Select
                        sx={{ width: '230px', marginRight: '20px', marginBottom: '20px' }}
                        id="inputAlumno"
                        name="idAlumno"
                        onChange={handleAlumno}
                        label="Alumno"
                    >
                        <MenuItem value={0}>Seleccione un alumno</MenuItem>
                        {
                            alumnos && alumnos.map((a, i) => (
                                <MenuItem key={i} value={a.id}>
                                    {a.usuario?.nombre} {a.usuario?.apellido}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl> */}
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
                <FormControl>
                    <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                    <Select
                        sx={{ width: '100px', marginRight: '20px' }}
                        id="inputCurso"
                        name="idCurso"
                        onChange={handleCurso}
                        label="Curso"
                    >
                        <MenuItem value={0}>Seleccione un curso</MenuItem>
                        {
                            cursos && cursos.map((c, i) => (
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
                                    <TableCell align="right">Operaciones</TableCell>
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