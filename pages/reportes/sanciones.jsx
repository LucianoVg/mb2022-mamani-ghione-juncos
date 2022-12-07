import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


import { Search } from "@mui/icons-material";


function createData(motivo, autoridad, fecha, tipo) {
    return { motivo, autoridad, fecha, tipo };
}

const rows = [
    createData('Tiro un papel en la cabeza un alumno', 'Docente', '2022-09-23', 'Firma'),
    createData('Falto el respeto a un profesor', 'Docente', '2022-09-23', 'Firma'),
    createData('Golpeo a un compañero', 'Direccion', '2022-09-23', 'Amonestacion')

];

export default function Sancion() {

    const [alumnos, setAlumnos] = useState([])
    const [sanciones, setSanciones] = useState([])
    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()

    
    useEffect(() => {
        listarAlumnos()
        listarSanciones()
       }, [])
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }

    }, [usuario.id, loading, authUser])


    const listarSanciones = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/sanciones/`)
            .then(res => {
                console.log(res.data);
                setSanciones(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
  

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id })
        }
    }

    const listarAlumnos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/`)
            .then(res => {
                console.log(res.data);
                setAlumnos(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

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


    const [idAlumno, setIdAlumno] = useState(0)



    const handleAlumno = (e, newValue) => {
        if (newValue) {
            setIdAlumno(newValue.id);
        }
    }

 
    return (
        <Layout>
            <h3>Buscar Alumno</h3>
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
            <Box sx={{ marginBottom: '20px', }}>
                <Button variant="outlined" startIcon={<Search />} color="info" >
                    Buscar
                </Button>
            </Box>


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
                            {sanciones && sanciones.map((s,i) => (
                             
                                <TableRow key={i}>
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
                                        {s.motivo}
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
                                        {s.usuario?.rol?.tipo}
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
                                        {s.fecha}
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
                                        {s.tiposancion?.tipo}
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