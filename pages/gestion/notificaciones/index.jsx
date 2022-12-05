import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layout";
import { Box, Button, TextareaAutosize, Container, Autocomplete, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Notificacion } from '../../../components/notificacion_panel'
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Edit } from "@mui/icons-material";
import Icon from '@mui/material/Icon';
import { useAuth } from '../../../components/context/authUserProvider';
import { setInterval } from 'timers';
import Loading from '../../../components/loading';

const Notificaciones = () => {
    const router = useRouter()
    const { loading, authUser } = useAuth()
    const [notificacion, setNotificacion] = useState({
        asunto: '',
        contenido: ''
    })
    const [listNotificaciones, setListNotificaciones] = useState([])
    const [cursos, setCursos] = useState([]);
    const [idCurso, setIdCurso] = useState(0);
    // const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState({ id: 0 })
    const [alumnos, setAlumnos] = useState([])
    const [cargandoInfo, setCargandoInfo] = useState(false)

    const handleCurso = (e) => {
        setIdCurso(e.target.value);
    };
    const handleNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleNotificacion = (e) => {
        setNotificacion({ ...notificacion, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        ListarNotificaciones()
        listarCursos()
        listarAlumnos()
        // filtros()
    }, [usuario.id, loading, authUser])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id })
        }
    }

    const listarAlumnos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                console.log(res.data);
                setAlumnos(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const listarCursos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const ListarNotificaciones = async () => {
        setCargandoInfo(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/listar_notificaciones`)
        console.log(res.data);
        setListNotificaciones(res.data)
        setCargandoInfo(false)
    }
    const CrearNotificacion = async (e) => {
        e.preventDefault()
        console.log(notificacion);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones`, {
            asunto: notificacion.asunto,
            contenido: notificacion.contenido,
            fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
            idCurso: idCurso,
            idAlumno: idalumno,
            idUsuario: usuario.id
        })
        if (res.status === 200) {
            router.reload()
        } else {
            console.error(res.data);
        }
    }


    // const [value, setValue] = useState('');
    const [idalumno, setIdAlumno] = useState(0)



    const handleAlumno = (e, newValue) => {
        if (newValue) {
            setIdAlumno(newValue.id);
        }
    }

    console.log("id alumno:", idalumno)

    return (
        <Layout>
            {/* <Notificacion /> */}
            <div>

                <Grid container
                >
                    <Grid item xs={7}>
                        <h1 className="text-center">Enviar Notificacion</h1>
                        <Box direction="column">
                            <Box direction='row'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={idCurso}
                                        name="idCurso"
                                        label="Curso"
                                        onChange={handleCurso}
                                        sx={{ width: '90px', marginRight: '20px', marginBottom: '20px' }}
                                    >
                                        <MenuItem value={'todos'}>Todos</MenuItem>
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <MenuItem key={i} value={c.id}>
                                                    {c.curso?.nombre} {c.division?.division}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>

                                </FormControl>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    // value={value}
                                    onChange={handleAlumno}
                                    getOptionLabel={(alumnos) => `${alumnos?.usuario?.apellido} ${alumnos.usuario?.nombre}`}
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
                                {/* <FormControl sx={{ width: '30%', marginRight: '20px' }}>
                                    <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={nombre}
                                        name="nombre"
                                        label="nombre"
                                        onChange={handleNombre}
                                        sx={{ width: '200px' }}
                                    >
                                        <MenuItem value={'JuanJuncos'}>Juan Juncos</MenuItem>
                                        <MenuItem value={'SamuelBertola'}>Samuel Bertola</MenuItem>
                                        <MenuItem value={'LuisGarcia'}>Luis Garcia</MenuItem>

                                    </Select>
                                </FormControl> */}
                            </Box>


                            <Box component={'form'} onSubmit={CrearNotificacion}>
                                <h2><strong>Asunto</strong></h2>
                                <TextareaAutosize
                                    name="asunto"
                                    value={notificacion.asunto}
                                    onChange={handleNotificacion}
                                    style={{ width: '350px', height: '35px', resize: 'none', fontSize: '20px' }}
                                />
                                <h2><strong>Contenido</strong></h2>
                                <TextareaAutosize
                                    name="contenido"
                                    value={notificacion.contenido}
                                    onChange={handleNotificacion}
                                    style={{ width: '350px', maxLenght: '300', height: '200px', resize: 'none', fontSize: '20px' }}
                                />

                                {/* PERMITIR COMO MAXIMO 300 CARACTERES PARA EVITAR QUE SE BUGUE EN EL CELULAR */}
                                <Box xs={12}>
                                    <Button variant="contained" type="submit">Enviar</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        {
                            cargandoInfo && (
                                <Container sx={{ textAlign: 'center' }}>
                                    <Loading size={50} />
                                </Container>
                            )
                        }
                        {
                            !cargandoInfo && (
                                <>
                                    <h1>Notificaciones enviadas</h1>
                                    <Box sx={{ width: '350px' }}>
                                        <List style={{ backgroundColor: "lightgray", border: '0 10px 15px black', borderRadius: '10px' }}>
                                            {/* <ListItem disablePadding

                                >
                                    <ListItemButton component="a">
                                        <ListItemText primary="hola" />
                                    </ListItemButton>
                                    <Divider />
                                </ListItem> */}
                                            {

                                                listNotificaciones && listNotificaciones.map((n, i) => (
                                                    <ListItem disablePadding
                                                        key={i} value={n.id}
                                                    >
                                                        <ListItemButton component="a" onClick={() => router.push(`/gestion/notificaciones/detalles/${n.id}`)}>
                                                            <ListItemText primary={n.asunto} />
                                                        </ListItemButton>
                                                        <Divider />
                                                    </ListItem>

                                                ))

                                            }


                                        </List>
                                    </Box>
                                </>
                            )
                        }
                    </Grid>

                </Grid>


            </div>

        </Layout >
    )
}

export default Notificaciones