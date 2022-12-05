import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Container, Typography, TextField, Button, Checkbox, Box, Grid, InputLabel, Select, MenuItem, FormControlLabel, FormControl } from "@mui/material";
import Loading from "../../../components/loading";

export default function NuevaSancion() {
    const [sancion, setSancion] = useState({ idAlumno: 0, idCurso: 0, motivo: '', idTipoSancion: 0 })

    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)
    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()
    const [guardando, setGuardando] = useState(false)
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/')
        }
        traerUsuario()
        traerAlumnos()
        traerCursos()
        traerTiposSancion()

    }, [loading, authUser, usuario.id])

    const traerTiposSancion = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/tipos`)
        if (res.data) {
            setTipoSanciones(res.data)
        }
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
        if (res.data) {
            setAlumnos(res.data)
        }
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data.id })
            console.log(usuario);
        }
    }
    const handleSancion = (e) => {
        setSancion({ ...sancion, [e.target.name]: e.target.value })
    }
    const generarSancion = async (e) => {
        e.preventDefault()
        setGuardando(true)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones`, {
            idUsuario: usuario.id,
            idAlumno: sancion.idAlumno,
            idCurso: sancion.idCurso,
            idTipoSancion: sancion.idTipoSancion,
            motivo: sancion.motivo,
            fecha: new Date().toLocaleDateString('es-AR').split('T')[0]
        })
        setGuardando(false)
        if (res.status === 200) {
            console.log(res.data);
            router.push('/gestion/sanciones')
        }
    }
    return (
        <Layout>
            <div maxWidth={'md'}>
                <Typography variant="h4">Nueva Sancion</Typography>
                <Box component={'form'} onSubmit={generarSancion}>

                    <Box>
                        <FormControlLabel control={<Checkbox id="checkSancionGrupal" checked={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />} label="Sancion Grupal" />

                    </Box>
                    <Box direction='row'>

                        {
                            !esSancionGrupal && (
                                <FormControl>
                                    <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                    <Select value={sancion.idAlumno}
                                        onChange={handleSancion}
                                        name="idAlumno"
                                        id="inputAlumno"
                                        label="Alumno"
                                        sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}
                                    >
                                        {
                                            alumnos && alumnos.map((a, i) => (
                                                <MenuItem key={i} value={a.id}>
                                                    {a.usuario.nombre} {a.usuario.apellido}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            )
                        }
                        {
                            esSancionGrupal && (
                                <FormControl>
                                    <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                                    <Select value={sancion.idCurso}
                                        onChange={handleSancion}
                                        name="idCurso"
                                        id="inputCurso"
                                        label="Curso"
                                        sx={{ width: '100px', marginRight: '20px', marginBottom: '20px' }}
                                    >
                                        {
                                            cursos && cursos.map((c, i) => (
                                                <MenuItem key={i} value={c.id}>
                                                    {c.curso?.nombre} {c.division?.division}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>


                            )
                        }

                        <FormControl>
                            <InputLabel htmlFor="inputTipoSancion">Tipo de Sancion</InputLabel>
                            <Select value={sancion.idTipoSancion}
                                onChange={handleSancion}
                                name="idTipoSancion"
                                id="inputTipoSancion"
                                label="Tipo de Sancion"
                                sx={{ width: '180px', marginBottom: '20px' }}
                            >
                                {
                                    tipoSanciones && tipoSanciones.map((t, i) => (
                                        <MenuItem key={i} value={t.id}>
                                            {t.tipo}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ marginBottom: '20px' }}>

                        <TextField
                            margin="normal"
                            multiline
                            rows={5}
                            required
                            name="motivo"
                            value={sancion.motivo}
                            label="Motivo"
                            onChange={handleSancion}
                            sx={{ width: '350px' }}
                        />
                    </Box>

                    <Box>
                        <Button disabled={guardando} variant="contained" sx={{ width: '170px' }} color="primary" type="submit">
                            {
                                guardando && <Loading size={30} />
                            }
                            {
                                !guardando && <span>Generar Sancion</span>
                            }
                        </Button>
                    </Box>
                </Box>
            </div>
        </Layout>
    )
}