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
    const [conteoNotas, setConteoNotas] = useState([])
    const [mejoresPromedios1, setMejoresPromedios1] = useState([])
    const [mejoresPromedios2, setMejoresPromedios2] = useState([])
    const [cargando, setCargando] = useState(false)
    const [cargando2, setCargando2] = useState(false)
    const { loading, authUser } = useAuth()
    const [materias, setMaterias] = useState([])

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
                traerMejoresPromedios1()
                traerMejoresPromedios2()
            }
        }
    }, [loading, authUser, authUser?.rol?.tipo])

    const tienePermisos = () => {
        return authUser?.rol?.tipo === 'Administrador'
            || authUser?.rol?.tipo === 'Director'
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

    const traerMejoresPromedios1 = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/a`)
        console.log(res.data);
        if (res.status === 200) {
            setMejoresPromedios1(res.data)
        }
        setCargando2(false)
    }
    const traerMejoresPromedios2 = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/b`)
        console.log(res.data);
        if (res.status === 200) {
            setMejoresPromedios2(res.data)
        }
        setCargando2(false)
    }
    const handleSelect = (e) => {
        traerConteoNotas(Number(e.target.value))
    }
    return (
        <Layout>
            <Typography variant="h5" sx={{ mb: 2 }}>Dashboard</Typography>
            <Grid container spacing={2} flex>
                <Grid item xs={6}>
                    {
                        !cargando2 && mejoresPromedios1.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <PieChart
                                        data={mejoresPromedios1}
                                    />
                                </CardContent>
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
                        !cargando2 && mejoresPromedios2.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <PieChart
                                        data={mejoresPromedios2}
                                    />
                                </CardContent>
                            </Card>
                        )
                    }
                    {
                        cargando2 && (
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