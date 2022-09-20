import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Container, Typography, TextField, Button, Checkbox, Box, Grid, InputLabel, Select, MenuItem, FormControlLabel } from "@mui/material";

export default function NuevaSancion() {
    const [sancion, setSancion] = useState({ idAlumno: '', idCurso: '', motivo: '', idTipoSancion: '' })

    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)
    const [usuario, setUsuario] = useState({ id: '' })
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({ id: res.data.id })
                    console.log(usuario);
                }
            })


        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
            .then(res => {
                if (res.data) {
                    setAlumnos(res.data)
                }
            })

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/tipos`)
            .then(res => {
                if (res.data) {
                    setTipoSanciones(res.data)
                }
            })
    }, [loading, authUser, usuario.id])

    const handleSancion = (e) => {
        setSancion({ ...sancion, [e.target.name]: e.target.value })
    }
    const generarSancion = (e) => {
        e.preventDefault()
        console.log(sancion);
        console.log({
            idUsuario: usuario.id,
            idCurso: sancion.idCurso,
            idAlumno: sancion.idAlumno,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toLocaleDateString('en-GB')
        });
        axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`, {
            idUsuario: usuario.id,
            idCurso: sancion.idCurso,
            idAlumno: sancion.idAlumno,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toLocaleDateString('en-GB')
        }).then(res => {
            if (res.data) {
                router.push('/gestion/sanciones')
            }
        }).catch(err => {
            console.error(err);
        })
    }
    return (
        <Layout>
            <Container maxWidth={'md'}>
                <Typography variant="h4">Nueva Sancion</Typography>
                <Box component={'form'} onSubmit={generarSancion}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox id="checkSancionGrupal" checked={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />} label="Sancion Grupal" />
                        </Grid>
                        {
                            !esSancionGrupal && (
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                    <Select value={sancion.idAlumno} fullWidth onChange={handleSancion} name="idAlumno" id="inputAlumno">
                                        {
                                            alumnos && alumnos.map((a, i) => (
                                                <MenuItem key={i} value={a.id}>
                                                    {a.usuario.nombre} {a.usuario.apellido}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>
                            )
                        }
                        {
                            esSancionGrupal && (
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                                    <Select value={sancion.idCurso} fullWidth onChange={handleSancion} name="idCurso" id="inputCurso">
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <MenuItem key={i} value={c.id}>
                                                    {c.curso?.nombre} {c.division?.division}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>
                            )
                        }
                        <Grid item xs={6}>
                            <InputLabel htmlFor="inputTipoSancion">Tipo de Sancion</InputLabel>
                            <Select value={sancion.idTipoSancion} fullWidth onChange={handleSancion} name="idTipoSancion" id="inputTipoSancion">
                                {
                                    tipoSanciones && tipoSanciones.map((t, i) => (
                                        <MenuItem key={i} value={t.id}>
                                            {t.tipo}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                fullWidth
                                multiline
                                rows={3}
                                required
                                name="motivo"
                                value={sancion.motivo}
                                label="Motivo"
                                onChange={handleSancion} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" type="submit">Generar Sancion</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Layout>
    )
}