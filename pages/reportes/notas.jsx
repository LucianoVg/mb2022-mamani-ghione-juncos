import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Autocomplete, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import { Search } from "@mui/icons-material";
import { Container } from '@mui/system';
import Loading from '../../components/loading';

export default function Notas() {
    const [idMateria, setIdMateria] = useState(1);
    const [materias, setMaterias] = useState([])
    const [notaTrimestre, setNotaTrimestre] = useState([])
    const [promedioTrimestre, setPromedioTrimestre] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const { loading, authUser } = useAuth()
    const [idAlumno, setIdAlumno] = useState(1)
    const router = useRouter()
    const [cargando1, setCargando1] = useState(false)
    const [cargando2, setCargando2] = useState(false)

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerMaterias()
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
    const notasPorTrimestre = async () => {
        setCargando1(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/notas_trimestres/${idAlumno}/${idMateria}`)
        if (res.status === 200) {
            console.log(res.data);
            setNotaTrimestre(res.data)
        }
        setCargando1(false)
    }
    const promedioPorTrimestre = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/promedios_trimestres/${idAlumno}/${idMateria}`)
        if (res.status === 200) {
            console.log(res.data);
            setPromedioTrimestre(res.data)
        }
        setCargando2(false)
    }
    const listarAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumnos(res.data)
        }
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.status === 200) {
            setMaterias(res.data)
        }
    }

    const handleMateria = (e) => {
        setIdMateria(Number(e.target.value));
    };

    const handleAlumno = (e, newValue) => {
        if (newValue) {
            setIdAlumno(newValue.id);
        }
    }
    const handleSearch = async () => {
        await notasPorTrimestre()
        await promedioPorTrimestre()
    }
    return (
        <Layout>
            {
                !usuario.rol === 'Estudiante' && !usuario.rol === 'Tutor'(
                    <FormControl>
                        <h3>Buscar Alumno</h3>

                        <Box direction="row" rowSpacing={2}>
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
                            <FormControl sx={{ width: '150px' }}>
                                <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={idMateria}
                                    label="Materia"
                                    onChange={handleMateria}>
                                    {
                                        materias?.map(m => (
                                            <MenuItem key={m.id} value={m.id}>{m.nombre}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Button onClick={handleSearch} variant="outlined" startIcon={<Search />} color="info" sx={{ marginTop: '20px' }}>
                            Buscar
                        </Button>
                    </FormControl>
                )

            }


            <Grid container spacing={2}>
                <Grid item xs>
                    <h2>Notas por trimestre</h2>
                    <div sx={{ marginBottom: '100px' }}>
                        {
                            !cargando1 && notaTrimestre.length > 0 && (
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" colSpan={12}
                                                    sx={{
                                                        color: 'black',
                                                        backgroundColor: 'lightblue',
                                                    }}>
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
                            )
                        }
                        {
                            cargando1 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                    </div>
                </Grid>
                <Grid item xs>
                    <h2>Promedio por trimestre</h2>

                    <div sx={{ marginTop: '200px' }}>
                        {
                            !cargando2 && promedioTrimestre.length > 0 && (
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
                            )
                        }
                        {
                            cargando2 && (
                                <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                    </div>
                </Grid>
            </Grid>
        </Layout >
    );
}