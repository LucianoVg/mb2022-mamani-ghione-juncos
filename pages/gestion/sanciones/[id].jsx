import { Button, Checkbox, FormControlLabel, FormControl, Box, Grid, InputLabel, MenuItem, Select, TextField, Container } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

export default function DetalleSancion() {
    const [sancionxalumno, setSancionXAlumno] = useState()
    const [alumnos, setAlumnos] = useState()
    const [cursos, setCursos] = useState()
    const [tipoSanciones, setTipoSanciones] = useState()
    const router = useRouter()
    const [esSancionGrupal, setEsSancionGrupal] = useState(false)
    const [usuario, setUsuario] = useState({ id: 0 })
    const { loading, authUser } = useAuth()
    const [idtiposancion, setIdtiposancion] = useState(0)
    const [idalumno, setIdalumno] = useState(0)
    const [idcurso, setIdcurso] = useState(0)
    const [loadSancion, setLoadSancion] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [motivo, setMotivo] = useState('')
    const [guardando, setGuardando] = useState(false)

    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerCursos()
        traerAlumnos()
        traerTiposSancion()
        traerSancion(id)
    }, [loading, authUser, id, usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data.id })
        }
    }

    const traerSancion = async (id) => {
        if (id) {
            setLoadSancion(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/buscar/${id}`)
            if (res.status === 200) {
                setSancionXAlumno(res.data)
            }
            setLoadSancion(false)
        }
    }
    const traerAlumnos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`)
        if (res.data) {
            setAlumnos(res.data)
        }
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerTiposSancion = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/tipos`)
        if (res.data) {
            setTipoSanciones(res.data)
        }
    }
    const handleTipoSancion = (e) => {
        setIdtiposancion(Number(e.target.value))
        setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    }
    const handleCurso = (e) => {
        setIdcurso(Number(e.target.value))
        setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    }
    const handleIdAlumno = (e) => {
        setIdalumno(Number(e.target.value))
        setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    }
    const handleMotivo = (e) => {
        setMotivo(e.target.value)
        setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    }
    const actualizarSancion = async (e) => {
        e.preventDefault()
        setGuardando(true)
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/actualizar/${sancionxalumno?.sancion?.id}`, {
            idSancionXAlumno: sancionxalumno?.id,
            idUsuario: usuario.id,
            idCurso: idcurso,
            idAlumno: idalumno,
            idTipoSancion: idtiposancion,
            motivo: motivo
        })
        setGuardando(false)
        if (res.status === 200) {
            router.push('/gestion/sanciones')
        }
    }
    return (
        <Layout>
            {
                !loadSancion && (
                    <Box>
                        <Box >
                            <FormControlLabel control={<Checkbox id="checkSancionGrupal" checked={esSancionGrupal} onChange={() => setEsSancionGrupal(!esSancionGrupal)} />} label="Sancion Grupal" />
                        </Box>
                        <Box direction='row'>
                            {
                                !esSancionGrupal && (
                                    <FormControl>
                                        <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                        <Select
                                            value={idalumno}
                                            onChange={handleIdAlumno}
                                            name="idalumno"
                                            id="inputAlumno"
                                            label="Alumno"
                                            sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}>
                                            {
                                                alumnos && alumnos.map((a, i) => (
                                                    <MenuItem selected={a.id === sancionxalumno.alumnoxcursoxdivision?.id} key={i} value={a.id}>
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
                                        <Select onChange={handleCurso}
                                            name="idcurso"
                                            value={idcurso}
                                            id="inputCurso"
                                            label="Curso"
                                            sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}
                                        >
                                            {
                                                cursos && cursos?.map((c, i) => (
                                                    <MenuItem selected={c.id === sancionxalumno.alumnoxcursoxdivision?.idcursoxdivision} key={i} value={c.id}>
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
                                <Select value={idtiposancion}
                                    onChange={handleTipoSancion}
                                    name="idtiposancion"
                                    id="inputTipoSancion"
                                    label="Tipo de Sancion"
                                    sx={{ width: '180px', marginBottom: '20px' }}>
                                    {
                                        tipoSanciones && tipoSanciones.map((t, i) => (
                                            <MenuItem selected={t.id === sancionxalumno?.sancion?.idtiposancion} key={i} value={t.id}>
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
                                placeholder={sancionxalumno?.sancion?.motivo}
                                name="motivo"
                                value={motivo}
                                label="Motivo"
                                onChange={handleMotivo}
                                sx={{ width: '350px', }}
                            />
                        </Box>
                        <Box direction='row'>
                            <Button disabled={!editMode || guardando} variant="contained"
                                color="primary"
                                onClick={actualizarSancion}
                                sx={{ marginRight: '20px', marginBottom: '10px' }}>
                                {
                                    guardando && <Loading size={30} />
                                }
                                {
                                    !guardando && <span>Actualizar Sancion</span>
                                }
                            </Button>

                            <Link href={'/gestion/sanciones'}>
                                <Button variant="outlined" component="label">Volver</Button>
                            </Link>
                        </Box>
                    </Box>
                )
            }
            {
                loadSancion && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Loading size={80} />
                    </Container>
                )
            }
        </Layout>
    )
}