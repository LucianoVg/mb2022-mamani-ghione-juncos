import { useEffect, useState } from 'react'


import { Layout } from "../../../components/layout";
import { Box, Button, TextareaAutosize, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Notificacion } from '../../../components/notificacion_panel'
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from '@mui/material/Divider';



 const Notificaciones = () => {


    const [age, setAge] = useState('');

    const handleChange = (e) => {
        setAge(e.target.value);

    };
    const [nombre, setNombre] = useState('');

    const handleNombre = (e) => {
        setNombre(e.target.value);

    };

    console.log("edad:", age)
    console.log("nombre:", nombre)


    return (
        <Layout title={'Enviar Notificaciones'}>
            {/* <Notificacion /> */}
            <Container style={{ position: 'relative', }}>
                <h1 className="text-center">Enviar Notificacion</h1>
                <Grid container
                    style={{ position: 'absolute', marginTop: '-85px', }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-end"

                >
                    <Grid item xs={4}>
                        <h1>Notificaciones enviadas</h1>
                        <List style={{ backgroundColor: 'white', border: '0 10px 15px black', borderRadius: '10px'}}>
                            <ListItem disablePadding
                             >
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Trash" />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding
                     >
                                <ListItemButton component="a" href="#simple-list">
                                    <ListItemText primary="Spam" />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                            <ListItem disablePadding>
                                   
                                <ListItemButton component="a" href="#simple-list" >
                                    <ListItemText primary="Asueto Docente" />
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </List>
                    </Grid>

                </Grid>
                <Grid container spacing={2}>

                    <Grid item xs={2}>
                        <FormControl fullWidth sx={{ width: '70%' }}>
                            <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                name="age"
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Todos</MenuItem>
                                <MenuItem value={1}>1 A</MenuItem>
                                <MenuItem value={2}>1 B</MenuItem>
                                <MenuItem value={3}>2 A</MenuItem>
                                <MenuItem value={4}>2 B</MenuItem>
                                <MenuItem value={5}>3 A</MenuItem>
                                <MenuItem value={6}>3 B</MenuItem>
                                <MenuItem value={5}>4 A</MenuItem>
                                <MenuItem value={6}>4 B</MenuItem>
                                <MenuItem value={5}>5 A</MenuItem>
                                <MenuItem value={6}>5 B</MenuItem>
                                <MenuItem value={5}>6 A</MenuItem>
                                <MenuItem value={6}>6 B</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth sx={{ width: '30%' }}>
                            <InputLabel id="demo-simple-select-label">Nombre</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={nombre}
                                name="nombre"
                                label="nombre"
                                onChange={handleNombre}
                            >
                                <MenuItem value={'JuanJuncos'}>Juan Juncos</MenuItem>
                                <MenuItem value={'SamuelBertola'}>Samuel Bertola</MenuItem>
                                <MenuItem value={'LuisGarcia'}>Luis Garcia</MenuItem>

                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <h2><strong>Asunto</strong></h2>
                        <TextareaAutosize

                            style={{ width: '400px', height: '35px', resize: 'none', fontSize: '20px' }}
                        />
                             <h2><strong>Contenido</strong></h2>
                        <TextareaAutosize

                            style={{ width: '400px', height: '200px', resize: 'none', fontSize: '20px' }}
                        />
                    </Grid>
                                       <Grid item xs={12} disablePadding>
                    <Button variant="contained">Enviar</Button>
                    </Grid>

                </Grid>
            </Container>



        </Layout >
    )
}

export default Notificaciones