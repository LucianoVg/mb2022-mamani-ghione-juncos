import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Container, Typography, TextField, Button, Checkbox, Box, Grid, InputLabel, Select, MenuItem, FormControlLabel, FormControl } from "@mui/material";

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
                                sx={{ width: '180px' }}
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

                    <Box sx={{marginBottom: '20px'}}>

                        <TextField


                            multiline
                            rows={5}
                            required
                            name="motivo"
                            value={sancion.motivo}
                            label="Motivo"
                            onChange={handleSancion}
                            sx={{ width: '400px' }} />
                    </Box>

                    <Box >
                        <Button variant="contained" color="primary" type="submit">Generar Sancion</Button>
                    </Box>

                </Box>
            </div>
        </Layout>
    )
}