<<<<<<< HEAD
import { useState } from "react";
import { Layout } from "../../../components/layout";

export default function Detalles() {
=======
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { Typography, Button, Container, Grid, Divider, FormControlLabel, InputLabel, Select, MenuItem, Box, TextField, Checkbox, FormControl } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";
import styles from "../../../styles/fontSize.module.css"


export default function Detalles() {

    // useEffect(() => {
    //     traerFicha()
    // }, [])

>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
    const [discapacidad, setDiscapacidad] = useState({
        list: []
    })
    const handleDiscapacidad = e => {
<<<<<<< HEAD
=======

>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
        setDiscapacidad(discapacidad => ({
            ...discapacidad,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value
        }));
    };

    console.log(discapacidad)




    const [enfermedad, setEnfermedad] = useState({
        list: []
    });
    const handleEnfermedad = e => {

        setEnfermedad(enfermedad => ({
            ...enfermedad,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value
        }));
    };
    console.log(enfermedad)


    const [checked, setChecked] = useState(false);
    console.log(checked)
    const handleCheck = (e) => {
        setChecked(e.target.checked);
    };
    const [checked1, setChecked1] = useState(false);
    const handleCheck1 = (e) => {
        setChecked1(e.target.checked);
    };
    const [checked2, setChecked2] = useState(false);
    const handleCheck2 = (e) => {
        setChecked2(e.target.checked);
    };
    const [checked3, setChecked3] = useState(false);
    const handleCheck3 = (e) => {
        setChecked3(e.target.checked);
    };

    const [checked4, setChecked4] = useState(false);
    const handleCheck4 = (e) => {
        setChecked4(e.target.checked);
    };

    const [docente, setDocente] = useState(false);
    const handleDocente = (e) => {
        setDocente(e.target.checked);
    };


    return (
        <Layout>
<<<<<<< HEAD
            <div>
                <h4>Datos Personales</h4>

                <div className="row">
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Nombre</strong> <br />
                            Nico
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Apellido</strong> <br />
                            Juncos
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Dni</strong> <br />
                            345642
                        </h5>
                    </div>
                    <div >
                        <h5 className="mb-2"> <strong>Mail</strong> <br />
                            nico@gmail.com</h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Direccion</strong> <br />
                            Siempre Viva3 56
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Telefono</strong> <br />
                            351-442321
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5 className="mb-2">
                            <strong>Edad</strong> <br />
                            54
                        </h5>
                    </div>
                    <div className="col-md-2">
                        <h5>
                            <strong>Fecha de Nacimiento</strong> <br />
                            20/05/1975
                        </h5>
                    </div>
                </div>
                <h5 >
                    Docente?
                    <input
                        type={'checkbox'}
                        checked={docente}
                        onChange={handleDocente}
                    />
                </h5>

                {
                    docente && (
                        <div className="row">
                            <div className="col-md-6">
                                <h5>
                                    <strong>Curso/s</strong> <br />
                                    *4 &quot;A&quot; <br />
                                    *2 &quot;A&quot;<br />
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <h5>
                                    <strong>Materia/s</strong> <br />
                                    *Lengua <br />
                                    *Ingles <br />
                                </h5>
                            </div>
                        </div>
                    )
                }
                <hr className="mb-2" />

                <h4 className="mb-2">
                    Datos de salud
                </h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna discapacidad?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked}
                                onChange={handleCheck}
                            />
                        </div>
                        {
                            checked && (
                                <div className="form-group">
                                    <select
                                        className="form-select"
                                        name="list"
                                        id="list">
                                        <option value="Autismo">
                                            Autismo
                                        </option>
                                        <option value="Deficiencia auditiva">
                                            Deficiencia auditiva
                                        </option>
                                        <option value="Dificultades en el aprendizaje" >
                                            Dificultades en el aprendizaje
                                        </option>
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna enfermedad?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked1}
                                onChange={handleCheck1}
                            />
                        </div>
                        {
                            checked1 && (
                                <div className="form-group">
                                    <select
                                        className="form-select"
                                        style={{ maxWidth: '300px' }}
                                        name="list"
                                        id="list"
                                    >
                                        <option value="admin">
                                            Asma
                                        </option>
                                        <option value="user1">
                                            Diabetes
                                        </option>
                                        <option value="user2" >
                                            Artritis
                                        </option>
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="form-check">
                            <label className="form-check-label">
                                Tiene alguna alergia?
                            </label>
                            <input
                                className="form-check-input"
                                type={'checkbox'}
                                checked={checked2}
                                onChange={handleCheck2}
                            />
                        </div>
                        {
                            checked2 && (
                                <textarea
                                    className="form-control"></textarea>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
=======


            <div>
                <h1> ver: https://thrysoee.dk/material-ui/</h1>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Datos Personales</Typography>

                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4} spacing={2}>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Nombre</strong> <br />
                            Nico
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Apellido</strong> <br />
                            Juncos
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Dni</strong> <br />
                            345642
                        </Typography>
                    </Grid>
                    <Grid item xs={4} s>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Mail</strong> <br />
                            nico@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Direccion</strong> <br />
                            Siempre Viva3 56
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Telefono</strong> <br />
                            351-442321
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Edad</strong> <br />
                            54
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '250px' }} >
                            <strong>Fecha de Nacimiento</strong> <br />
                            20/05/1975
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="h5" sx={{ width: '200px' }} >
                    Docente?
                    <Checkbox
                        checked={docente}
                        onChange={handleDocente}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Typography>

                {
                    docente && (
                        <Grid container direction="row">
                            <Grid item xs={4}>
                                <Typography variant="h5" sx={{ width: '280px', marginBottom: '20px' }} >
                                    <strong>Curso/s</strong> <br />
                                    *4 &quot;A&quot; <br />
                                    *2 &quot;A&quot;<br />
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5" >
                                    <strong>Materia/s</strong> <br />
                                    *Lengua <br />
                                    *Ingles <br />
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                }
                <Divider sx={{ marginTop: '20px' }}></Divider>


                <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos de salud</Typography>
                <Grid container direction='row'>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            Tiene alguna discapacidad?
                            <Checkbox
                                checked={checked}
                                onChange={handleCheck}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                        {
                            checked && (
                                < FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>


                                    < TextField
                                        sx={{ maxWidth: '280px' }}
                                        select
                                        name="list"
                                        id="list"
                                        variant="outlined"
                                        SelectProps={{
                                            multiple: true,
                                            value: discapacidad.list,
                                            onChange: handleDiscapacidad
                                        }}
                                    >
                                        <MenuItem value="Autismo">
                                            Autismo
                                        </MenuItem>
                                        <MenuItem value="Deficiencia auditiva">
                                            Deficiencia auditiva
                                        </MenuItem>
                                        <MenuItem value="Dificultades en el aprendizaje" >
                                            Dificultades en el aprendizaje
                                        </MenuItem>
                                    </TextField>
                                </FormControl>
                            )
                        }

                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            Tiene alguna enfermedad?
                            <Checkbox
                                checked={checked1}
                                onChange={handleCheck1}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                        {
                            checked1 && (
                                < FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                                    < TextField
                                        sx={{ maxWidth: '300px' }}
                                        select
                                        name="list"
                                        id="list"
                                        variant="outlined"
                                        SelectProps={{
                                            multiple: true,
                                            value: enfermedad.list,
                                            onChange: handleEnfermedad
                                        }}
                                    >
                                        <MenuItem value="admin">
                                            Asma
                                        </MenuItem>
                                        <MenuItem value="user1">
                                            Diabetes
                                        </MenuItem>
                                        <MenuItem value="user2" >
                                            Artritis
                                        </MenuItem>
                                    </TextField>
                                </FormControl>
                            )
                        }
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            Tiene alguna alergia?
                            <Checkbox
                                checked={checked2}
                                onChange={handleCheck2}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                        {
                            checked2 && (
                                <TextField multiline>

                                </TextField>
                            )
                        }
                    </Grid>
                </Grid>

            </div>
        </Layout >
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
    )
}