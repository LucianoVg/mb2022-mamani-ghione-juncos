import { useEffect, useState } from 'react'


import { Layout } from "../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


import { Search } from "@mui/icons-material";


function createData(materia, notaFinal) {
    return { materia, notaFinal };
}

const rows = [
    createData('Lengua', 9),
    createData('Matematica', 9),
    createData('Ingles', 9),
    createData('Geografia', 9),
    createData('Historia', 9),
    createData('Formacion Humana Cristiana', 9),
];

export default function Preanalitico() {
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")

    const handleNombreAlumno = (e) => {
        setNombreAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    }

    const handleApellidoAlumno = (e) => {
        setApellidoAlumno(e.target.value)
        setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    }
    const handleDocumento = (e) => {
        setDocumento(e.target.value)
    }
    return (
        <Layout>
            <Grid container spacing={2} sx={{marginBottom: '50px'}}>
                <Grid item xs={12}>
                    <h3>Buscar Alumno</h3>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        name="documento"
                        value={documento}
                        onChange={handleDocumento}
                        label="Documento del alumno" />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        name="nombreAlumno"
                        value={nombreAlumno}
                        onChange={handleNombreAlumno}
                        label="Nombre del alumno" />

                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        name="apellidoAlumno"
                        value={apellidoAlumno}
                        onChange={handleApellidoAlumno}
                        label="Apellido del alumno" />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" startIcon={<Search />} color="info">
                        Buscar
                    </Button>
                </Grid>
            </Grid>

            <div sx={{ marginTop: '200px' }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="customized table" s >
                        <TableHead  >
                            <TableRow >
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue', }}>Sexto Año</TableCell>
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue' }}>Segundo Año</TableCell>
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue' }}>Tercer Año</TableCell>
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue' }}>Cuarto Año</TableCell>
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue' }}>Quinto Año</TableCell>
                                <TableCell align="center" colSpan={3} sx={{ color: 'black', backgroundColor: 'lightblue' }}>Sexto Año</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>


                                <TableCell colSpan={2} sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center" sx={{ color: 'black', backgroundColor: 'lightblue' }}>
                                    Nota
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {rows.map((row) => (
                                <TableRow key={row.materia}>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center">{row.notaFinal}</TableCell>

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
}


{/* <Grid container sx={{ marginBottom: '100px' }}>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Primer Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Segundo Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Tercer Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Cuarto Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Quinto Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
<Grid item xs={2}>
    <TableContainer component={Paper} >
        <Table aria-label="customized table" >
            <TableHead >
                <TableRow >
                    <TableCell align="center" colSpan={2} sx={{ color: 'white', backgroundColor: 'black' }}>Sexto Año</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell sx={{ color: 'white', backgroundColor: 'black' }}>Materia</TableCell>
                    <TableCell align="center" sx={{ color: 'white', backgroundColor: 'black' }}>Nota</TableCell>

                </TableRow>
            </TableHead>
            <TableBody xs={2}>
                {rows.map((row) => (
                    <TableRow key={row.materia}>
                        <TableCell component="th" scope="row">
                            {row.materia}
                        </TableCell >
                        <TableCell align="center">{row.notaFinal}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
</Grid> */}
