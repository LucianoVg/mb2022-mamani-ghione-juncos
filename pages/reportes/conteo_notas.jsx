import { Card, CardActions, CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authUserProvider";
import BarChart from "../../components/graficos/BarChart";
import PieChart from "../../components/graficos/PieChart";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";

export default function Dashboard() {
    const [usuario, setUsuario] = useState({ rol: '' })
    const router = useRouter()
    const [conteoNotasA, setConteoNotasA] = useState([])
    const [conteoNotasB, setConteoNotasB] = useState([])
    const [mejoresPromedios, setMejoresPromedios] = useState([])
    const [cargando, setCargando] = useState(false)
    const [cargando2, setCargando2] = useState(false)
    const { loading, authUser } = useAuth()
    const [materias, setMaterias] = useState([])
    const [docenteA, setDocenteA] = useState([])
    const [docenteB, setDocenteB] = useState([])
    // const [idDivision, setIdDivision] = useState([])
    const [idMateria, setIdMateria] = useState([])
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        // traerUsuario()
        if (authUser.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerMaterias()
                traerConteoNotasA()
                traerConteoNotasB()
                traerDocenteA()
                traerDocenteB()
            }
        }
    }, [loading, authUser, authUser.rol])

    const tienePermisos = () => {
        return authUser.rol === 'Administrador'
            || authUser.rol === 'Director'
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        console.log(res.data);
        if (res.status === 200) {
            setMaterias(res.data)
        }
    }
    // const traerUsuario = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    //     if (res.data) {
    //         console.log(res.data);
    //         setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    //     }
    // }
    const traerConteoNotasA = async (idMateria) => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/a/${idMateria || 1}`)
        console.log(res.data);
        if (res.status === 200) {
            setConteoNotasA(res.data)
        }
        setCargando(false)
    }
    const traerConteoNotasB = async (idMateria) => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/b/${idMateria || 1}`)
        console.log(res.data);
        if (res.status === 200) {
            setConteoNotasB(res.data)
        }
        setCargando(false)
    }
    const traerDocenteA = async (idMateria = idMateria, division = "A") => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/usuario/${idMateria}/${division}`
        );
        if (res.status === 200 && res.data) {
            setDocenteA('DOCENTE DEL A', res.data);
        }
    };
    const traerDocenteB = async (idMateria = idMateria, division = "B") => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/usuario/${idMateria}/${division}`
        );
        if (res.status === 200 && res.data) {
            setDocenteB('DOCENTE DEL B', res.data);
        }
    };
    const handleSelect = (e) => {
        traerConteoNotas(Number(e.target.value))
        setIdMateria(Number(e.target.value))

    }
    return (
        <Layout>
            <Typography variant="h5" sx={{ mb: 2 }}>Dashboard</Typography>
            <Grid container spacing={2} flex>
                <Grid item xs={6}>
                    {
                        !cargando && conteoNotasA.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <BarChart
                                        data={conteoNotasA}
                                    />
                                </CardContent>
                                {materias.length > 0 &&
                                    (
                                        <CardActions>
                                            <FormControl sx={{ minWidth: 120 }} size="small">
                                                <InputLabel htmlFor="materiaSelect">Materia</InputLabel>
                                                <Select
                                                    color="info"
                                                    id="materiaSelect"
                                                    onChange={handleSelect}
                                                    variant="outlined">
                                                    {
                                                        materias?.map(m => (
                                                            <MenuItem value={m.id} key={m.id}>{m.nombre}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </CardActions>
                                    )
                                }
                            </Card>
                        )
                    }
                    {
                        cargando && (
                            <Container sx={{ textAlign: 'center' }}>
                                <Loading size={50} />
                            </Container>
                        )
                    }
                </Grid>
                <Grid item xs={6}>
                    {
                        !cargando && conteoNotasB.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <BarChart
                                        data={conteoNotasB}
                                    />
                                </CardContent>
                                {materias.length > 0 &&
                                    (
                                        <CardActions>
                                            <FormControl sx={{ minWidth: 120 }} size="small">
                                                <InputLabel htmlFor="materiaSelect">Materia</InputLabel>
                                                <Select
                                                    color="info"
                                                    id="materiaSelect"
                                                    onChange={handleSelect}
                                                    variant="outlined">
                                                    {
                                                        materias?.map(m => (
                                                            <MenuItem value={m.id} key={m.id}>{m.nombre}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </CardActions>
                                    )
                                }
                            </Card>
                        )
                    }
                    {
                        cargando && (
                            <Container sx={{ textAlign: 'center' }}>
                                <Loading size={50} />
                            </Container>
                        )
                    }
                </Grid>
            </Grid>
        </Layout>
    )
}