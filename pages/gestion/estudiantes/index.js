import { Layout } from "../../../components/layout";
import React from 'react';
<<<<<<< HEAD
// import styles from "../../../styles/notas.module.css";

export default function Estudiantes() {
    return (
        <Layout>
            <div className="container">
                <h4>Estudiantes</h4>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="inputCurso">Curso</label>
                        <select id="inputCurso" name="idCurso"
                            // onChange={handleCurso}
                            style={{ width: '90px', marginRight: '20px', marginBottom: '20px' }}>
                            {
                                cursos && cursos?.map((c, i) => (
                                    <option
                                        selected={i === 0}
                                        key={i}
                                        value={c.id}>
                                        {c.curso?.nombre} {c.division?.division}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <input
                        name="nombreAlumno"
                        // value={nombreAlumno}
                        // onChange={handleNombreAlumno}
                        label="Nombre del alumno"
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />
                    <input
                        name="apellidoAlumno"
                        // value={apellidoAlumno}
                        // onChange={handleApellidoAlumno}
                        label="Apellido del alumno"
                        sx={{ marginRight: '20px', marginBottom: '20px' }} />
                    <input
                        name="apellidoAlumno"
                        // value={apellidoAlumno}
                        // onChange={handleApellidoAlumno}
                        label="Legajo" />
                </div>

                <div className="row">
                    <button className="btn btn-outline-primary"
                    // onClick={() => onSave(n.id, nota, columnName)}
                    >
                        Buscar
                    </button>

                </div>

                <div className="container">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <td >Legajo</td>
                                <td>Sexo</td>
                                <td >Nombre</td>
                                <td >Apellido</td>
                                <td >Curso</td>
                                <td>Division</td>
                                <td >Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                    454243
                                </td>

                                <td >
                                    Masculino
                                </td>
                                <td >
                                    Juan
                                </td>
                                <td >
                                    Juncos
                                </td>
                                <td>
                                    3
                                </td>
                                <td >
                                    A
                                </td>

                                <td >
                                    <React.Fragment>
                                        <div className="row">
                                            <button
                                                className="btn btn-info"
                                            // onClick={() => onSave(n.id, nota, columnName)}
                                            >
                                                Detalles
                                            </button>

                                            <button
                                                className="btn btn-primary"
                                            // onClick={() => onCancel()}
                                            >
                                                Generar Sancion
                                            </button>
                                        </div>
                                    </React.Fragment>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
=======
import { useEffect, useState } from 'react'
import axios from 'axios'
// import styles from "../../../styles/notas.module.css";
import { Box, Stack, Button, Container, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, FormControl } from "@mui/material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";

export default function Estudiantes() {


    return (
        <Layout>
            <Container maxWidth={'xl'}>
                <Typography variant="h4">Estudiantes</Typography>
                <Box sx={{ marginTop: '20px' }} >
                    <Box direction='row'>


                        <FormControl>
                            <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                            <Select id="inputCurso" name="idCurso"
                                // onChange={handleCurso}
                                label="curso"
                                sx={{ width: '90px', marginRight: '20px', marginBottom: '20px' }}>
                                {/* {
                                    cursos && cursos?.map((c, i) => (

                                        <MenuItem selected={i === 0} key={i} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                    ))
                                } */}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box direction='row'>
                        <TextField margin="normal"

                            name="nombreAlumno"
                            // value={nombreAlumno}
                            // onChange={handleNombreAlumno}
                            label="Nombre del alumno"
                            sx={{ marginRight: '20px', marginBottom: '20px' }}
                        />
                        <TextField margin="normal"

                            name="apellidoAlumno"
                            // value={apellidoAlumno}
                            // onChange={handleApellidoAlumno}
                            label="Apellido del alumno"
                            sx={{ marginRight: '20px', marginBottom: '20px' }} />
                        <TextField margin="normal"

                            name="apellidoAlumno"
                            // value={apellidoAlumno}
                            // onChange={handleApellidoAlumno}
                            label="Legajo" />
                    </Box>
                    <Box>
                        <Button variant="contained"
                            color="info"
                            size="small"
                        // onClick={() => onSave(n.id, nota, columnName)}
                        >
                            Buscar
                        </Button>

                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell >Legajo</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell >Nombre</TableCell>
                                <TableCell >Apellido</TableCell>
                                <TableCell >Curso</TableCell>
                                <TableCell>Division</TableCell>
                                <TableCell >Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow >
                                <TableCell >
                                    454243
                                </TableCell>

                                <TableCell >
                                    Masculino
                                </TableCell>
                                <TableCell >
                                    Juan
                                </TableCell>
                                <TableCell >
                                    Juncos
                                </TableCell>
                                <TableCell>
                                    3
                                </TableCell>
                                <TableCell >
                                    A
                                </TableCell>

                                <TableCell >
                                    <React.Fragment>
                                        <Stack direction='row' spacing={2}>
                                            <Button variant="contained"
                                                color="info"
                                                size="small"
                                            // onClick={() => onSave(n.id, nota, columnName)}
                                            >
                                                Detalles
                                            </Button>


                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                            // onClick={() => onCancel()}
                                            >
                                                Generar Sancion
                                            </Button>
                                        </Stack>



                                    </React.Fragment>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
        </Layout >

    );

}