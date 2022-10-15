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

    const [discapacidad, setDiscapacidad] = useState({
        list: []
    })
    const handleDiscapacidad = e => {

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



    return (
        <Layout>


            <div>
                <h1> ver: https://thrysoee.dk/material-ui/</h1>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Datos Personales</Typography>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            <strong>Nombre</strong> <br />
                            Juan Fernando
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Apellido</strong> <br />
                            Castro
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Dni</strong> <br />
                            4564223
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            <strong>Mail</strong> <br />
                            Juan@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Direccion</strong> <br />
                            Siempre Viva 950
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Telefono</strong> <br />
                            351-405033
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            <strong>Edad</strong> <br />
                            16
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '250px' }}>
                            <strong>Fecha de Nacimiento</strong> <br />
                            20/05/2005
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '250px' }}>
                            <strong>Curso</strong> <br />
                            4 "A"
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Datos de salud</Typography>
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
                                        sx={{ maxWidth: '300px' }}
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

                <Divider sx={{ marginTop: '20px' }}></Divider>


                <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos del Tutor</Typography>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            <strong>Nombre</strong> <br />
                            Jose Luis
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Apellido</strong> <br />
                            Castro
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Dni</strong> <br />
                            4564223
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }} >
                            <strong>Mail</strong> <br />
                            JoseLuis@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            <strong>Telefono</strong> <br />
                            351-404633
                        </Typography>
                    </Grid>
                </Grid>


                <Divider sx={{ marginTop: '20px' }}></Divider>


                <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos de Matriculacion</Typography>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '250px' }} >
                            <strong>Fecha de Matriculacion</strong> <br />
                            20/01/2002
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '250px' }} >
                            <strong>Fecha de Ingreso</strong> <br />
                            23/03/2022
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px' }}>
                            Repite?
                            <Checkbox
                                checked={checked3}
                                onChange={handleCheck3}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '300px' }}>
                            Viene de otra escuela?
                            <Checkbox
                                checked={checked4}
                                onChange={handleCheck4}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Layout >
    )
}