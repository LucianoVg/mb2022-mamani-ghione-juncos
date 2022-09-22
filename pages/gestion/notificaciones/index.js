import { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layout";
import { Box, Button, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Notificacion } from '../../../components/notificacion_panel'
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Edit } from "@mui/icons-material";
import Icon from '@mui/material/Icon';
import { CrearNotificacion } from '../../../servicios/notificaciones';

const Notificaciones = () => {
    const router = useRouter()

    const [notificacion, setNotificacion] = useState({
        asunto: '',
        contenido: ''
    })
    const [listNotificaciones, setListNotificaciones] = useState()
    const [cursos, setCursos] = useState('');
    const [idCurso, setIdCurso] = useState('');
    const [nombre, setNombre] = useState('');


    const handleCurso = (e) => {
        setIdCurso(e.target.value);

    };
    console.log(idCurso)
    const handleNombre = (e) => {
        setNombre(e.target.value);

    };

    const handleNotificacion = (e) => {
        setNotificacion({ ...notificacion, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        ListarNotificacion()
        listarCursos()
        // filtros()
    }, [])


    const listarCursos = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/curso`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const ListarNotificacion = () => {
        axios.get(`http://localhost:3000/api/gestion/notificaciones/`)
            .then(res => {
                console.log(res.data);
                setListNotificaciones(res.data)
            }).catch(err => {
                console.error(err);
            })
    }
    const CrearNotificacion = (e) => {
        e.preventDefault()
        console.log(notificacion);
        console.log({ fecha: new Date().toLocaleDateString('en-GB') })
        axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones`, {
            asunto: notificacion.asunto,
            contenido: notificacion.contenido,
            fecha: new Date().toLocaleDateString('en-GB')
        }).then(res => {
            if (res.data) {
                router.push('/gestion/notificaciones')
            }
        }).catch(err => {
            console.error(err);
        })
    }
  

    return (
        <Layout title='Enviar Notificaciones'>
            {/* <Notificacion /> */}
            <Container style={{ position: 'relative', }}>

                <Grid container
                >
                    <Grid item xs>
                        <h1 className="text-center">Enviar Notificacion</h1>
                        <Box direction="column">
                            <Box direction='row'>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={idCurso}
                                        name="curso"
                                        label="Curso"
                                        onChange={handleCurso}
                                        sx={{ width: '90px', marginRight: '20px' }}
                                    >
                                        <MenuItem value={10}>Todos</MenuItem>
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <MenuItem key={i} value={c.id}>{
                                                    c.curso?.nombre}{c.division?.division}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>

                                </FormControl>
                                <FormControl sx={{ width: '30%', marginRight: '20px' }}>
                                    <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={nombre}
                                        name="nombre"
                                        label="nombre"
                                        onChange={handleNombre}
                                        sx={{ width: '150px' }}
                                    >
                                        <MenuItem value={'JuanJuncos'}>Juan Juncos</MenuItem>
                                        <MenuItem value={'SamuelBertola'}>Samuel Bertola</MenuItem>
                                        <MenuItem value={'LuisGarcia'}>Luis Garcia</MenuItem>

                                    </Select>
                                </FormControl>
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
                                    style={{ width: '350px', height: '200px', resize: 'none', fontSize: '20px' }}
                                />
                                <Box xs={12}>
                                    <Button variant="contained" type="submit">Enviar</Button>
                                </Box>
                            </Box>



                        </Box>


                    </Grid>
                    <Grid item xs={4}>
                        <h1>Notificaciones enviadas</h1>
                        <Box sx={{ width: '350px' }}>
                            <List style={{ backgroundColor: 'white', border: '0 10px 15px black', borderRadius: '10px' }}>
                                {
                                    listNotificaciones && listNotificaciones.map((n, i) => (
                                        <ListItem disablePadding
                                            key={i} value={n.id}
                                        >
                                            <ListItemButton component="a" href="#simple-list">
                                                <ListItemText primary={n.asunto} />

                                            </ListItemButton>
                                            <Divider />
                                        </ListItem>

                                    ))

                                }


                            </List>
                        </Box>
                    </Grid>

                </Grid>


            </Container>

        </Layout >
    )
}

export default Notificaciones