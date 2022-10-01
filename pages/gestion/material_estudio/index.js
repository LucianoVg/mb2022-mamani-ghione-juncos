import { useEffect, useState } from 'react'


import { Layout } from "../../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, ButtonGroup, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";

import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Edit } from "@mui/icons-material";
import Icon from '@mui/material/Icon';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DownloadIcon from '@mui/icons-material/Download';

import styles from "../../../styles/tarjetaNoticias.module.css";
import axios from 'axios';
import { useAuth } from '../../../components/context/authUserProvider';
import { useRouter } from 'next/router';

const MaterialEstudio = () => {
    const [curso, setCurso] = useState('');
    const [materias, setMaterias] = useState()
    const [cursos, setCursos] = useState()
    const handleCurso = (e) => {
        setCurso(e.target.value);
    };

    const { loading, authUser } = useAuth()
    const [materia, setMateria] = useState('');

    const handleMateria = (e) => {
        setMateria(e.target.value);
    };
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.data) {
            setMaterias(res.data)
        }
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const router = useRouter()
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerCursos()
        traerMaterias()
    }, [loading, authUser])

    return (
        <Layout>
            <div >
                <Box sx={{ marginBottom: '20px' }}>

                    <FormControl sx={{ width: '100px' }}>
                        <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                        <Select
                            direction='row'
                            // PONER LA LISTA EN HORIZONTAL 
                            MenuProps={{

                                anchorOrigin: {
                                    vertical: 'center',
                                    horizontal: 'right',
                                },
                                transformOrigin: {
                                    vertical: 'center',
                                    horizontal: 'left',
                                },

                            }}
                            IconComponent={ArrowRightIcon}
                            value={curso}
                            label="Curso"
                            onChange={handleCurso}

                        >
                            {
                                cursos && cursos?.map((c, i) => (
                                    <MenuItem key={i} value={c.id} sx={{ display: "inline-block" }}>
                                        {c.curso?.nombre} {c.division?.division}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                </Box>
                <Box>
                    <FormControl sx={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={materia}
                            label="Materia"
                            onChange={handleMateria}
                        >
                            {
                                materias && materias?.map((m, i) => (
                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs >
                            <h3>Primer Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs>
                            <h3>Segundo Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>

                        </Grid>
                        <Grid item xs >
                            <h3>Tercer Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>

                        </Grid>
                    </Grid>
                </Box>

                <Box mt={2}>
                    <Button variant="contained" color="primary">
                        Guardar
                    </Button>

                </Box>


            </div>


        </Layout >
    )
}

export default MaterialEstudio



{/* <div>
                <Button
                    sx={{ height: '50px' }}
                    aria-describedby={id}
                    variant="outlined"
                    spacing={3}
                    onClick={handleClick}
                    name="curso"
                    value={curso}

                >

                    <ArrowRightIcon />
                </Button>
                <Popover

                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClick={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >


                    <List sx={{ flexDirection: 'row', display: 'flex', padding: '0' }} >
                        <ListItem disablePadding>
                            <ListItemButton component="a" onChange={handleCurso} href="#simple-list">
                                <ListItemText primary="1A" value="1A" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="1B" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list" >
                                <ListItemText primary="2A" />
                            </ListItemButton>
                        </ListItem>
                    </List>



                </Popover> */}

{/* </div> */ }