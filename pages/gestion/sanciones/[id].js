import { Button, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

export default function DetalleSancion() {
    const [sancion, setSancion] = useState()
    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)
    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()
    const [loadSancion, setLoadSancion] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }

        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({ id: res.data.id })
                    console.log(usuario);
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/${id}`)
            .then(res => {
                if (res.data) {
                    setSancion(res.data)
                    setLoadSancion(false)
                    setEsSancionGrupal(res.data.cursoXDivision)
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
    }, [loading, authUser, id, usuario.id])

    const handleSancion = (e) => {
        setSancion({ ...sancion, [e.target.name]: e.target.value })
        setEditMode(true)
    }
    const actualizarSancion = (e) => {
        e.preventDefault()
        console.log(sancion);
        axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/${sancion.id}`, {
            idUsuario: usuario.id,
            idCurso: sancion.idCursoXDivision,
            idAlumno: sancion.idAlumnoXCursoXDivision,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toLocaleDateString('en-GB')
        }).then(res => {
            router.push('/gestion/sanciones')
        }).catch(err => {
            console.error(err);
        })
    }
    return (
        <Layout>
            {
                !loadSancion && (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControlLabel control={<Checkbox id="checkSancionGrupal" checked={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />} label="Sancion Grupal" />
                        </Grid>
                        {
                            !esSancionGrupal && (
                                <Grid item xs={6}>
                                    <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                    <Select value={sancion?.idAlumnoXCursoXDivision} fullWidth onChange={handleSancion} name="idAlumnoXCursoXDivision" id="inputAlumno">
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
                                    <Select value={sancion?.idCursoXDivision} fullWidth onChange={handleSancion} name="idCursoXDivision" id="inputCurso">
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
                            <Select value={sancion?.idTipoSancion} fullWidth onChange={handleSancion} name="idTipoSancion" id="inputTipoSancion">
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
                                value={sancion?.motivo}
                                label="Motivo"
                                onChange={handleSancion} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button disabled={!editMode} variant="contained" color="primary" onClick={actualizarSancion}>Actualizar Sancion</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Link href={'/gestion/sanciones'}>
                                <Button variant="outlined" component="label">Volver</Button>
                            </Link>
                        </Grid>
                    </Grid>
                )
            }
        </Layout>
    )
}