import { Search } from "@mui/icons-material";
import { Box, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
    const [idCurso, setIdCurso] = useState(1)
    const [idAlumno, setIdAlumno] = useState(1)
    const [alumnos, setAlumnos] = useState()


    const handleCurso = (e) => {
        setIdCurso(Number.parseInt(e.target.value))
    }
    const handleAlumno = (e) => {
        setIdAlumno(Number.parseInt(e.target.value))
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
            <Container maxWidth={'md'}>
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={3}>
                        <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                        <Select
                            name="idAlumno"
                            id="inputAlumno"
                            onChange={handleAlumno}
                            label="Alumno"
                            value={idAlumno}
                            fullWidth>
                            {
                                alumnos && alumnos.map((a, i) => (
                                    <MenuItem key={i} value={a.id}>
                                        {a.usuario?.nombre} {a.usuario?.apellido}
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                        <Select
                            name="idCurso"
                            id="inputCurso"
                            onChange={handleCurso}
                            label="Curso"
                            value={idCurso}
                            fullWidth>
                            {
                                cursos && cursos.map((c, i) => (
                                    <MenuItem key={i} value={c.id}>
                                        {c.curso?.nombre} {c.division.division}
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </Grid>
                </Grid>
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={3}>
                        <Button startIcon={<Search />} variant="outlined" onClick={buscarSanciones}>Buscar</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={(e) => {
                            e.preventDefault()
                            router.push('/gestion/sanciones/nueva_sancion')
                        }}>Nueva Sancion</Button>
                    </Grid>
                </Grid>
            </Container>
            {
                !loading && sanciones && (
                    <TableContainer component={Paper}>
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
                                                s.alumnoXCursoXDivision?.usuario !== undefined ?
                                                    s.alumnoXCursoXDivision?.usuario?.nombre : '--'
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.usuario !== undefined ?
                                                    s.alumnoXCursoXDivision?.usuario?.apellido : '--'
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.cursoXDivision != undefined ?
                                                    s.alumnoXCursoXDivision?.cursoXDivision?.curso?.nombre
                                                    : '--'
                                            }</TableCell>
                                            <TableCell align="right">{
                                                s.alumnoXCursoXDivision?.cursoXDivision != undefined ?
                                                    s.alumnoXCursoXDivision?.cursoXDivision?.division?.division
                                                    : '--'
                                            }</TableCell>
                                            <TableCell align="right">{new Date(s.fecha).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link href={`/gestion/sanciones/${s.id}`}>
                                                    <a className="btn btn-info">Detalles</a>
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