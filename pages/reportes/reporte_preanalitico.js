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
    createData('Portugues', 9),
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
            <h3>Buscar Alumno</h3>

            <Box direction="row" rowSpacing={2}>
                <TextField
                    sx={{ width: '150px', marginRight: '20px', marginBottom: '20px' }}
                    name="documento"
                    value={documento}
                    onChange={handleDocumento}
                    label="Documento" />
                <TextField
                    sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}
                    name="nombreAlumno"
                    value={nombreAlumno}
                    onChange={handleNombreAlumno}
                    label="Nombre" />
                <TextField
                    sx={{ width: '200px', marginBottom: '20px' }}
                    name="apellidoAlumno"
                    value={apellidoAlumno}
                    onChange={handleApellidoAlumno}
                    label="Apellido" />

            </Box>
            <Box sx={{marginBottom: '20px'}}>
                <Button variant="outlined" startIcon={<Search />} color="info" >
                    Buscar
                </Button>
            </Box>


            <div>
                <TableContainer component={Paper} >
                    <Table sx aria-label="customized table" >
                        <TableHead  >
                            <TableRow >
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1, borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Primer Año
                                </TableCell>
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1, borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Segundo Año
                                </TableCell>
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Tercer Año
                                </TableCell>
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Cuarto Año
                                </TableCell>
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}

                                >
                                    Quinto Año
                                </TableCell>
                                <TableCell align="center" colSpan={3}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderLeftColor: 'black',
                                        borderLeft: 1,
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Sexto Año
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>
                                <TableCell colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>

                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderLeftColor: 'black',
                                        borderLeft: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}>
                                    Nota
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {rows.map((row) => (
                                <TableRow key={row.materia}>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderRightColor: 'black',
                                            borderRight: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderRightColor: 'black',
                                            borderRight: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderRightColor: 'black',
                                            borderRight: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderRightColor: 'black',
                                            borderRight: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderRightColor: 'black',
                                            borderRight: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>
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
                                        {row.materia}
                                    </TableCell >
                                    <TableCell colSpan={1} align="center"
                                        sx={{
                                            borderLeftColor: 'black',
                                            borderLeftt: 1,
                                            borderTop: 1,
                                            borderTopColor: 'black',
                                            borderBottom: 1,
                                            borderBottomColor: 'black'

                                        }}
                                    >
                                        {row.notaFinal}</TableCell>

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout >
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
