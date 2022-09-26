import { Search } from "@mui/icons-material";
import { Button, Container, Box, Grid, InputLabel, MenuItem,FormControl, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

const Sanciones = () => {
    const [sanciones, setSanciones] = useState()
    const [cursos, setCursos] = useState()
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [idCurso, setIdCurso] = useState('')
    const [idAlumno, setIdAlumno] = useState('')
    const [alumnos, setAlumnos] = useState()


    const handleCurso = (e) => {
        setIdCurso(e.target.value)
    }
    const handleAlumno = (e) => {
        setIdAlumno(e.target.value)
    }
    const buscarSanciones = (e) => {
        e.preventDefault()
        console.log(idCurso, idAlumno);

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/buscar/${idCurso}/${idAlumno}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setSanciones(res.data)
                }
            })
    }

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setSanciones(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })
    }, [loading, authUser])

    return (
        <Layout>
            <Typography variant="h4" textAlign={'center'}>Sanciones</Typography>

            <Box sx={{ flexDirection: 'row' }}>
                <FormControl>
                    <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                    <Select

                        sx={{ width: '230px', marginRight: '20px', marginBottom: '20px' }}
                        name="idAlumno"
                        id="inputAlumno"
                        onChange={handleAlumno}
                        label="Alumno"
                        value={idAlumno}
                    >
                        <MenuItem value={idAlumno}>Seleccione un alumno</MenuItem>
                        {
                            alumnos && alumnos.map((a, i) => (
                                <MenuItem key={i} value={a.id}>
                                    {a.usuario?.nombre} {a.usuario?.apellido}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
                <FormControl>

                    <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                    <Select

                        sx={{ width: '100px', marginRight: '20px', marginBottom: '20px' }}
                        name="idCurso"
                        id="inputCurso"
                        onChange={handleCurso}
                        label="Curso"
                        value={idCurso}
                    >
                        <MenuItem value={idCurso}>Seleccione un curso</MenuItem>
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

            <Box sx={{ flexDirection: 'row' }}>
                <Button startIcon={<Search />} variant="outlined"
                    onClick={buscarSanciones}
                    sx={{ marginRight: '20px' }}
                >
                    Buscar</Button>
                <Button variant="contained" onClick={(e) => {
                    e.preventDefault()
                    router.push('/gestion/sanciones/nueva_sancion')
                }}>Nueva Sancion</Button>
            </Box>


            {
                !loading && sanciones && (
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
                                    sanciones?.map((s, i) => (
                                        <TableRow key={i}>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.usuario?.nombre
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.usuario?.apellido
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.cursoXdivision?.curso?.nombre
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.cursoXdivision?.division?.division
                                            }</TableCell>
                                            <TableCell align="right">{s.fecha}</TableCell>
                                            <TableCell align="right">
                                                <Link href={`/gestion/sanciones/${s.id}`}>
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
        </Layout>
    )
}


export default Sanciones;