import { useEffect, useState } from 'react'


import { Layout } from "../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


import { Search } from "@mui/icons-material";


function createData(motivo, autoridad, fecha, tipo) {
    return { motivo, autoridad, fecha, tipo };
}

const rows = [
    createData('Tiro un papel en la cabeza un alumno', 'Docente', '2022-09-23', 'Firma'),
    createData('Falto el respeto a un profesor', 'Docente', '2022-09-23', 'Firma'),
    createData('Golpeo a un compañero', 'Direccion','2022-09-23', 'Amonestacion')
 
];

export default function Sancion() {
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
            <Grid container spacing={2} sx={{ marginBottom: '50px' }}>
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
                            {rows.map((row) => (
                                <TableRow key={row.motivo}>
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
                                        {row.motivo}
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
                                        {row.autoridad}
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
                                        {row.fecha}
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
                                        {row.tipo}
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