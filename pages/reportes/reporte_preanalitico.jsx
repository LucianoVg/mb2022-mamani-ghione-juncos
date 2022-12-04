import { useEffect, useState } from 'react'


import { Layout } from "../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


import { Search } from "@mui/icons-material";
import axios from 'axios'

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
    useEffect(() => {
        traerPreanalitico()
    }, [])

    const [preanalitico, setPreanalitico] = useState([])

    const traerPreanalitico = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/preanalitico`)
        if (res.data) {
            setPreanalitico(res.data)
        }
    }

    const primerAño = preanalitico.filter(p => p.curso === 1)
    const segundoAño = preanalitico.filter(p => p.curso === 2)
    const tercerAño = preanalitico.filter(p => p.curso === 3)
    const cuartoAño = preanalitico.filter(p => p.curso === 4)
    const quintoAño = preanalitico.filter(p => p.curso === 5)
    const sextoAño = preanalitico.filter(p => p.curso === 6)


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

            <Box direction="row">
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
            <Box sx={{ marginBottom: '20px' }}>
                <Button variant="outlined" startIcon={<Search />} color="info" >
                    Buscar
                </Button>
            </Box>


            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="customized table" >
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
                            {preanalitico && preanalitico.map((p, i) => (
                                <TableRow key={i}>
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
                                        {
                                            p.curso === 1 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 1 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
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
                                        {
                                            p.curso === 2 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 2 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
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
                                        {
                                            p.curso === 3 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 3 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
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
                                        {
                                            p.curso === 4 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 4 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
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
                                        {
                                            p.curso === 5 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 5 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
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
                                        {
                                            p.curso === 6 && (
                                                p.materia
                                            )
                                        }
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
                                        {
                                            p.curso === 6 && (
                                                Math.round(p.notafinal)
                                            )
                                        }
                                    </TableCell >

                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Grid container sx={{ marginBottom: '100px' }}>
                <Grid item xs>
                    <TableContainer component={Paper} style={{ borderRadius: "none" }}>
                        <Table aria-label="customized table"  >
                            <TableHead >
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

                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" colSpan={2}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Materia
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Nota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody xs={2}>
                                {
                                    primerAño && primerAño.map((p, i) => (

                                        <TableRow key={i}>
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
                                                {p.materia}
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
                                                {Math.round(p.notafinal)}
                                            </TableCell>

                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs >
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table" >
                            <TableHead >
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
                                        Segundo Año
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" colSpan={2}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Materia
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Nota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody xs={2}>
                                {
                                    segundoAño && segundoAño.map((p, i) => (

                                        <TableRow key={i}>
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
                                                {p.materia}
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
                                                {Math.round(p.notafinal)}
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs >
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table" >
                            <TableHead >
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
                                        Tercer Año
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" colSpan={2}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Materia
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Nota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody xs={2}>
                                {
                                    tercerAño && tercerAño.map((p, i) => (

                                        <TableRow key={i}>
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
                                                {p.materia}
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
                                                {Math.round(p.notafinal)}
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs >
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table" >
                            <TableHead >
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
                                        Cuarto Año
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" colSpan={2}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Materia
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Nota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody xs={2}>
                                {
                                    cuartoAño && cuartoAño.map((p, i) => (

                                        <TableRow key={i}>
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
                                                {p.materia}
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
                                                {Math.round(p.notafinal)}
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs >
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table" >
                            <TableHead >
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
                                        Quinto Año
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell align="center" colSpan={2}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Materia
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                            borderRightColor: 'black',
                                            borderRight: 1, borderBottom: 1,
                                            borderBottomColor: 'black'
                                        }}
                                    >
                                        Nota
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody xs={2}>
                                {
                                    quintoAño && quintoAño.map((p, i) => (

                                        <TableRow key={i}>
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
                                                {p.materia}
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
                                                {Math.round(p.notafinal)}
                                            </TableCell>


                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs >
                    <TableContainer component={Paper} >
                        <Table aria-label="customized table" >
                            <TableHead >
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
                                    Sexto Año
                                </TableCell>

                            </TableRow>
                            <TableRow >
                                <TableCell align="center" colSpan={2}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1, borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Materia
                                </TableCell>
                                <TableCell align="center" colSpan={1}
                                    sx={{
                                        color: 'black',
                                        backgroundColor: 'lightblue',
                                        borderRightColor: 'black',
                                        borderRight: 1, borderBottom: 1,
                                        borderBottomColor: 'black'
                                    }}
                                >
                                    Nota
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody xs>
                            {
                                sextoAño && sextoAño.map((p, i) => (

                                    <TableRow key={i}>
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
                                            {p.materia}
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
                                            {Math.round(p.notafinal)}
                                        </TableCell>


                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

        </Layout >
    );
}


