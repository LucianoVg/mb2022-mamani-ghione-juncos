import { useEffect, useState } from 'react'


import { Layout } from "../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


import { Search } from "@mui/icons-material";


function createData(trimestre1, trimestre2, trimestre3) {
    return { trimestre1, trimestre2, trimestre3 };
}

const notas = [
    createData(6, 7, 8),
    createData(5, 6, 7),
    createData(9, 9, 8),
    createData(10, 3, 9),
    createData(6, 1, 10)
];
function createPromedio(promedio1, promedio2, promedio3) {
    return { promedio1, promedio2, promedio3 };
}

const promedio = [
    createPromedio(8, 7, 9),
  
  
];

export default function Notas() {
    const [nombreAlumno, setNombreAlumno] = useState("")
    const [apellidoAlumno, setApellidoAlumno] = useState("")
    const [documento, setDocumento] = useState("")
    const [materia, setMateria] = useState('Curso');

    const handleMateria = (e) => {
        setMateria(e.target.value);
    };

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
            <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
                <Grid item xs={12}>
                    <FormControl sx={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={materia}
                            label="Materia"
                            onChange={handleMateria}
                        >
                            <MenuItem value={10}>Lengua</MenuItem>
                            <MenuItem value={20}>Geografia</MenuItem>
                            <MenuItem value={30}>Historia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
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

            <h2>Notas por trimestre</h2>
            <div sx={{ marginTop: '200px' }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="customized table" s >
                        <TableHead  >
                            <TableRow>
                                <TableCell align="center" colSpan={12}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,

                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Lengua
                                </TableCell>
                            </TableRow>
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
                                    Primer Trimestre
                                </TableCell>
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
                                    Segundo Trimestre
                                </TableCell>

                                <TableCell colSpan={4} align="center"
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
                            {notas.map((row) => (
                                <TableRow key={row.nota1}>
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
                                        {row.trimestre1}
                                    </TableCell >
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
                                        {row.trimestre2}
                                    </TableCell >
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
                                        {row.trimestre3}
                                    </TableCell >

                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <h2>Promedio por trimestre</h2>
            
            <div sx={{ marginTop: '200px' }}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="customized table" s >
                        <TableHead  >
                            <TableRow>
                                <TableCell align="center" colSpan={12}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,

                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Lengua
                                </TableCell>
                            </TableRow>
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
                                    Primer Trimestre
                                </TableCell>
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
                                    Segundo Trimestre
                                </TableCell>

                                <TableCell colSpan={4} align="center"
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
                            {promedio.map((row) => (
                                <TableRow key={row.nota1}>
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
                                        {row.promedio1}
                                    </TableCell >
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
                                        {row.promedio2}
                                    </TableCell >
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
                                        {row.promedio3}
                                    </TableCell >
                                 
                                </TableRow>
                                
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout >
    );
}