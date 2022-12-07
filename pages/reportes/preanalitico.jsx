import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from '../../components/context/authUserProvider';
import { Layout } from "../../components/layout";
import { Box, Button, Stack, Autocomplete, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
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


    const [alumnos, setAlumnos] = useState([])
    const alumnos2 = alumnos.filter(a => a.cursoxdivision?.curso?.id === 6)

    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()
    useEffect(() => {
        listarAlumnos()
        traerPreanalitico()
    }, [])
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }

    }, [usuario.id, loading, authUser])


    const [preanalitico, setPreanalitico] = useState([])

    const traerPreanalitico = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/preanalitico?${idAlumno}`)
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

            <Box direction="row">
                <FormControl style={{ marginRight: "20px" }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        // value={value}
                        name="idAlumno"
                        onChange={handleAlumno}
                        getOptionLabel={(alumnos2) => `${alumnos2?.usuario?.apellido} ${alumnos2.usuario?.nombre}`}
                        options={alumnos2}
                        sx={{ width: "250px" }}
                        isOptionEqualToValue={(option, value) =>
                            option?.apellido === value?.apellido
                        }
                        noOptionsText={"No existe un alumno con ese nombre"}
                        renderOption={(props, alumnos2) => (
                            <Box component="li" {...props} key={alumnos2?.id}>
                                {alumnos2?.usuario?.apellido} {alumnos2?.usuario?.nombre}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} label="Alumno" />}
                    />
                </FormControl>


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
                    <Table size="small" aria-label="customized table"
                    style={{minWidth: "600px"}}
                    >
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
                                <TableCell align="center" colSpan={2}
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

                                <TableCell align="center" colSpan={1}
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
                                <TableCell align="center" colSpan={2}
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
                                <TableCell align="center" colSpan={2}
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
                                <TableCell align="center" colSpan={2}
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
                                <TableCell align="center" colSpan={2}
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
                                <TableCell align="center" colSpan={2}
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

                        {/* -------------------------------------------------------------------------------------------------------------------
 ------------------------------------------------------------------------------------------------------------------- 
 -------------------------------------------------------------------------------------------------------------------     */}

                        <TableBody >

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
                                    {
                                        preanalitico[0]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[0]?.notafinal)

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
                                        preanalitico[10]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[10]?.notafinal)

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
                                        preanalitico[20]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[20]?.notafinal)

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
                                        preanalitico[31]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[31]?.notafinal)

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
                                        preanalitico[43]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[43]?.notafinal)

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
                                        preanalitico[57]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[57]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>











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
                                    {
                                        preanalitico[1]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[1]?.notafinal)

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
                                        preanalitico[11]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[11]?.notafinal)

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
                                        preanalitico[21]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[21]?.notafinal)

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
                                        preanalitico[32]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[32]?.notafinal)

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
                                        preanalitico[44]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[44]?.notafinal)

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
                                        preanalitico[58]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[58]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>







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
                                    {
                                        preanalitico[2]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[2]?.notafinal)

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
                                        preanalitico[12]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[12]?.notafinal)

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
                                        preanalitico[22]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[22]?.notafinal)

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
                                        preanalitico[33]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[33]?.notafinal)

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
                                        preanalitico[45]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[45]?.notafinal)

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
                                        preanalitico[59]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[59]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>








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
                                    {
                                        preanalitico[3]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[3]?.notafinal)

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
                                        preanalitico[13]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[13]?.notafinal)

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
                                        preanalitico[23]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[23]?.notafinal)

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
                                        preanalitico[34]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[34]?.notafinal)

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
                                        preanalitico[46]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[46]?.notafinal)

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
                                        preanalitico[60]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[60]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>







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
                                    {
                                        preanalitico[4]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[4]?.notafinal)

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
                                        preanalitico[14]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[14]?.notafinal)

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
                                        preanalitico[24]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[24]?.notafinal)

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
                                        preanalitico[35]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[35]?.notafinal)

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
                                        preanalitico[47]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[47]?.notafinal)

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
                                        preanalitico[61]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[61]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>












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
                                    {
                                        preanalitico[5]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[5]?.notafinal)

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
                                        preanalitico[15]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[15]?.notafinal)

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
                                        preanalitico[25]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[25]?.notafinal)

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
                                        preanalitico[36]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[36]?.notafinal)

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
                                        preanalitico[48]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[48]?.notafinal)

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
                                        preanalitico[62]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[62]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>











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
                                    {
                                        preanalitico[6]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[6]?.notafinal)

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
                                        preanalitico[16]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[16]?.notafinal)

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
                                        preanalitico[26]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[26]?.notafinal)

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
                                        preanalitico[37]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[37]?.notafinal)

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
                                        preanalitico[49]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[49]?.notafinal)

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
                                        preanalitico[63]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[63]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>












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
                                    {
                                        preanalitico[7]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[7]?.notafinal)

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
                                        preanalitico[17]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[17]?.notafinal)

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
                                        preanalitico[27]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[27]?.notafinal)

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
                                        preanalitico[38]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[38]?.notafinal)

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
                                        preanalitico[50]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[50]?.notafinal)

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
                                        preanalitico[64]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[64]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>















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
                                    {
                                        preanalitico[8]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[8]?.notafinal)

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
                                        preanalitico[18]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[18]?.notafinal)

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
                                        preanalitico[28]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[28]?.notafinal)

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
                                        preanalitico[39]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[39]?.notafinal)

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
                                        preanalitico[51]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[51]?.notafinal)

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
                                        preanalitico[65]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[65]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>











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
                                    {
                                        preanalitico[9]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[9]?.notafinal)

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
                                        preanalitico[19]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[19]?.notafinal)

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
                                        preanalitico[29]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[29]?.notafinal)

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
                                        preanalitico[40]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[40]?.notafinal)

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
                                        preanalitico[52]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[52]?.notafinal)

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
                                        preanalitico[66]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[66]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>













                            <TableRow>
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[9]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[9]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[19]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"


                                    }}
                                >
                                    {

                                        Math.round(preanalitico[19]?.notafinal)

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
                                        preanalitico[30]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[30]?.notafinal)

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
                                        preanalitico[41]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[41]?.notafinal)

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
                                        preanalitico[53]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[53]?.notafinal)

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
                                        preanalitico[67]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[67]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>
















                            <TableRow>
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[9]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[9]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[19]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"


                                    }}
                                >
                                    {

                                        Math.round(preanalitico[19]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[30]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[30]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',

                                    }}
                                >
                                    {
                                        preanalitico[42]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',


                                    }}
                                >
                                    {

                                        Math.round(preanalitico[42]?.notafinal)

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
                                        preanalitico[54]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[54]?.notafinal)

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
                                        preanalitico[68]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[68]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>
















                            <TableRow>
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[9]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[9]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[19]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"


                                    }}
                                >
                                    {

                                        Math.round(preanalitico[19]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[30]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[30]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[42]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[42]?.notafinal)

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
                                        preanalitico[55]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[55]?.notafinal)

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
                                        preanalitico[69]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[69]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>
















                            <TableRow>
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[9]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[9]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {
                                        preanalitico[19]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"


                                    }}
                                >
                                    {

                                        Math.round(preanalitico[19]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[30]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[30]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[42]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[42]?.notafinal)

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
                                        preanalitico[56]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black'

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[56]?.notafinal)

                                    }
                                </TableCell >
                                <TableCell colSpan={2} component="th" scope="row"
                                    sx={{
                                        borderRightColor: 'black',
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"
                                    }}
                                >
                                    {
                                        preanalitico[69]?.materia
                                    }
                                </TableCell >
                                <TableCell colSpan={1} align="center"
                                    sx={{
                                        borderLeftColor: 'black',
                                        borderLeftt: 1,
                                        borderRight: 1,
                                        borderTop: 1,
                                        borderTopColor: 'black',
                                        borderBottom: 1,
                                        borderBottomColor: 'black',
                                        opacity: "0%"

                                    }}
                                >
                                    {

                                        Math.round(preanalitico[69]?.notafinal)

                                    }
                                </TableCell >
                            </TableRow>



                        </TableBody>
                    </Table>
                </TableContainer>
            </div>









            {/* 


            <Container>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {primerAño && primerAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}

                        </TableBody>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {segundoAño && segundoAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tercerAño && tercerAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cuartoAño && cuartoAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quintoAño && quintoAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sextoAño && sextoAño.map((p, i) => (
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

                                            p.materia

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

                                            Math.round(p.notafinal)

                                        }
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>






            <Container maxWidth={'xl'} style={{ marginTop: "60px" }}>
                <Grid container sx={{ marginBottom: '100px' }}>
                    <Grid item xs>
                        <TableContainer component={Paper} style={{ borderRadius: "none" }}>
                            <Table size="small" aria-label="customized table"  >
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
                            <Table size="small" aria-label="customized table" >
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
                            <Table size="small" aria-label="customized table" >
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
                            <Table size="small" aria-label="customized table" >
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
                            <Table size="small" aria-label="customized table" >
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
                            <Table size="small" aria-label="customized table" >
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
                                <TableBody xs={2}>
                                    {
                                        //  sextoAño && sextoAño.map((p, i) => (
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

                </Grid> */}
            {/* </Container> */}

        </Layout >
    );
}


