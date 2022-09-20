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

const MaterialEstudio = () => {
    const [curso, setCurso] = useState('Curso');

    const handleCurso = (e) => {
        setCurso(e.target.value);
    };

    const [materia, setMateria] = useState('Curso');

    const handleMateria = (e) => {
        setMateria(e.target.value);
    };

    // const [files, setFiles] = useState<File[]>([])

    return (
        <Layout>
            <Container fullwidth>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container rowSpacing={5} >
                        <Grid item xs={12}>
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

                                    <MenuItem value={1} sx={{ display: "inline-block" }}>1 A</MenuItem>
                                    <MenuItem value={2} sx={{ display: "inline-block" }}>1 B</MenuItem>
                                    <MenuItem value={3} sx={{ display: "inline-block" }}>2 A</MenuItem>
                                    <MenuItem value={4} sx={{ display: "inline-block" }}>2 B</MenuItem>
                                    <MenuItem value={5} sx={{ display: "inline-block" }}>3 A</MenuItem>
                                    <MenuItem value={64} sx={{ display: "inline-block" }}>3 B</MenuItem>
                                    <MenuItem value={5} sx={{ display: "inline-block" }}>4 A</MenuItem>
                                    <MenuItem value={6423} sx={{ display: "inline-block" }}>4 B</MenuItem>
                                    <MenuItem value={5463} sx={{ display: "inline-block" }}>5 A</MenuItem>
                                    <MenuItem value={6421} sx={{ display: "inline-block" }}>5 B</MenuItem>
                                    <MenuItem value={535} sx={{ display: "inline-block" }}>6 A</MenuItem>
                                    <MenuItem value={612} sx={{ display: "inline-block" }}>6 B</MenuItem>




                                </Select>
                            </FormControl>

                        </Grid>
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
                    </Grid>
                </Box>
                <Box >
                    <Grid container sx={{ flexGrow: 1 }} spacing={2}>
                        <Grid item xs={4} >
                            <h3>Primer Trimestre</h3>

                            <Grid container rowSpacing={5} >
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4} >
                            <h3>Segundo Trimestre</h3>
                            <Grid container rowSpacing={5} >
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} >
                            <h3>Tercer Trimestre</h3>
                            <Grid container rowSpacing={5} >
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
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

                                </Grid>
                                <Grid item sx={{ textAlign: 'left' }}>
                                    <Button variant='outlined' component="label"
                                        sx={{ width: '180px' }}
                                        spacing={4}
                                    >
                                        Subir apunte
                                        <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                    </Button>
                                    <IconButton spacing={4} color="primary" >
                                        <DownloadIcon />
                                    </IconButton>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Button variant="contained" color="primary">
                    Guardar
                </Button>


        </Container>


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