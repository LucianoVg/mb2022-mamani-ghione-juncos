import { Button, Checkbox, FormControlLabel, FormControl, Box, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
    const [usuario, setUsuario] = useState({ id: '' })
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
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/buscar/${id}`)
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
        axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/actualizar/${sancion.id}`, {
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
                    <Box >
                        <Box >
                            <FormControlLabel control={<Checkbox id="checkSancionGrupal" checked={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />} label="Sancion Grupal" />
                        </Box>
                        <Box direction='row'>
                            {
                                !esSancionGrupal && (
                                    <FormControl>
                                        <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                        <Select value={sancion?.idAlumnoXCursoXDivision} onChange={handleSancion}
                                            name="idAlumnoXCursoXDivision"
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
                                        <Select value={sancion?.idCursoXDivision} onChange={handleSancion}
                                            name="idCursoXDivision"
                                            id="inputCurso"
                                            label="Curso"
                                            sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}
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
                                <Select value={sancion?.idTipoSancion}
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

                                multiline
                                rows={6}
                                required
                                name="motivo"
                                value={sancion?.motivo}
                                label="Motivo"
                                onChange={handleSancion}
                                sx={{ width: '350px', }}
                            />

                        </Box>
                        <Box direction='row'>
                            <Button disabled={!editMode} variant="contained"
                                color="primary"
                                onClick={actualizarSancion}
                                sx={{ marginRight: '20px', marginBottom: '10px' }}
                            >Actualizar Sancion</Button>

                            <Link href={'/gestion/sanciones'}>
                                <Button variant="outlined" component="label">Volver</Button>
                            </Link>
                        </Box>
                    </Box>
                )
            }
        </Layout>
    )
}