import { Button, Checkbox, FormControlLabel, Typography, FormControl, Box, Grid, InputLabel, MenuItem, Select, TextField, Container } from "@mui/material";
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
    // const [idtiposancion, setIdtiposancion] = useState(0)
    const [idalumno, setIdalumno] = useState(0)
    // const [idcurso, setIdcurso] = useState(0)
    const [loadSancion, setLoadSancion] = useState(false)
    // const [editMode, setEditMode] = useState(false)
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

    // const handleTipoSancion = (e) => {
    //     setIdtiposancion(Number(e.target.value))
    //     // setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    // }

    // const handleIdAlumno = (e) => {
    //     setIdalumno(Number(e.target.value))
    //     setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    // }
    const handleMotivo = (e) => {
        setMotivo(e.target.value)
        // setEditMode((idalumno || idcurso) && idtiposancion && motivo)
    }

    let selected = ""

    alumnos && alumnos.map((a, i) => (
        a.id === sancionxalumno?.alumnoxcursoxdivision?.id && (
            selected = `${a.usuario?.apellido} ${a.usuario?.nombre}`
            // idAlumno: Number(a.id)
        )
    ))


    const [inEditMode, setInEditMode] = useState({
        status: false
    });

    const actualizarSancion = async (e) => {
        e.preventDefault()
        console.log(motivo, sancionxalumno);
        setGuardando(true)
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/actualizar/${sancionxalumno?.sancion?.id}`, {
            // idSancionXAlumno: sancionxalumno?.id,
            idUsuario: usuario.id,
            // idTipoSancion: idtiposancion,
            motivo: motivo.length ? motivo : sancionxalumno?.sancion?.motivo
        })
        setGuardando(false)
        if (res.status === 200) {
            router.push('/gestion/sanciones')
        }
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false
        })
        setMotivo(sancionxalumno?.sancion?.motivo)
    }

    return (
        <Layout>
            <Container maxWidth={'xl'}>
                <Typography variant="h4">Detalle Sancion</Typography>
                {

                    !loadSancion && (
                        <Box style={{ marginTop: "30px" }}>

                            <Box direction='row'>
                                {
                                    !esSancionGrupal && (
                                        <FormControl>
                                            <InputLabel htmlFor="inputAlumno">Alumno</InputLabel>
                                            <Select
                                                value={idalumno}
                                                // onChange={handleIdAlumno}
                                                name="idalumno"
                                                id="inputAlumno"
                                                label="Alumno"
                                                displayEmpty
                                                disabled
                                                renderValue={(value) => value ? value : <a>{selected}</a>}
                                                sx={{ width: '200px', marginRight: '20px', marginBottom: '20px' }}>
                                                {/* {
                                                alumnos && alumnos.map((a, i) => (
                                                    <MenuItem selected={a.id === sancionxalumno.alumnoxcursoxdivision?.id} key={i} inputVa={a.id === sancionxalumno.alumnoxcursoxdivision?.id}>
                                                        {a.usuario.nombre} {a.usuario.apellido}
                                                    </MenuItem>
                                                ))
                                            } */}
                                            </Select>
                                        </FormControl>
                                    )
                                }

                                <FormControl>
                                    <InputLabel htmlFor="inputTipoSancion">Tipo de Sancion</InputLabel>
                                    <Select
                                        value={sancionxalumno?.sancion?.idtiposancion}
                                        name="idtiposancion"
                                        id="inputTipoSancion"
                                        label="Tipo de Sancion"
                                        disabled
                                        renderValue={(value) => <span>{sancionxalumno?.sancion?.tiposancion?.tipo}</span>}
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

                            {
                                inEditMode.status === true ? (
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
                                            sx={{ maxWidth: '350px', minWidth: "300px" }}
                                        />
                                    </Box>
                                ) :
                                    (
                                        <Box sx={{ marginBottom: '20px' }}>
                                            <TextField
                                                multiline
                                                rows={6}
                                                required
                                                name="motivo"
                                                value={sancionxalumno?.sancion?.motivo}
                                                label="Motivo"
                                                disabled
                                                sx={{ maxWidth: '350px', minWidth: "300px" }}
                                            />
                                        </Box>
                                    )
                            }

                            {
                                inEditMode.status === true ? (
                                    <Box direction='row'>
                                        <Button disabled={guardando} variant="contained"
                                            color="primary"
                                            onClick={actualizarSancion}
                                            style={{ marginRight: '20px' }}>
                                            {
                                                guardando && <Loading size={30} />
                                            }
                                            {
                                                !guardando && <span>Guardar Sancion</span>
                                            }
                                        </Button>

                                        <Button variant="outlined" component="label" onClick={() => onCancel()}>
                                            Cancelar
                                        </Button>
                                    </Box>

                                ) : (
                                    <Box direction='row'>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            size="small"
                                            style={{ marginRight: '20px' }}
                                            onClick={() => setInEditMode({ status: true })}
                                        >
                                            Actualizar Sancion
                                        </Button>
                                        <Link href={'/gestion/sanciones'}>
                                            <Button variant="outlined" size="small">
                                                Volver
                                            </Button>
                                        </Link>
                                    </Box>
                                )
                            }
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
            </Container>
        </Layout>
    )
}