import { Card, CardActions, CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authUserProvider";
import PieChartA from "../../components/graficos/PieChartA";
import PieChartB from "../../components/graficos/PieChartB";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";

export default function Dashboard() {
    const [usuario, setUsuario] = useState({ rol: '' })
    const router = useRouter()
    const [conteoNotas, setConteoNotas] = useState([])
    const [mejoresPromediosA, setmejoresPromediosA] = useState([])
    const [mejoresPromediosB, setmejoresPromediosB] = useState([])
    const [cargando, setCargando] = useState(false)
    const [cargando2, setCargando2] = useState(false)
    const { loading, authUser } = useAuth()
    const [materias, setMaterias] = useState([])

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        // traerUsuario()
        if (authUser?.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traermejoresPromediosA()
                traermejoresPromediosB()
            }
        }
    }, [loading, authUser, authUser?.rol?.tipo])

    const tienePermisos = () => {
        return authUser?.rol?.tipo === 'Administrador'
            || authUser?.rol?.tipo === 'Director'
    }
    // const traerUsuario = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    //     if (res.data) {
    //         console.log(res.data);
    //         setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    //     }
    // }

    const traermejoresPromediosA = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/a`)
        console.log(res.data);
        if (res.status === 200) {
            setmejoresPromediosA(res.data)
        }
        setCargando2(false)
    }
    const traermejoresPromediosB = async () => {
        setCargando2(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/b`)
        console.log(res.data);
        if (res.status === 200) {
            setmejoresPromediosB(res.data)
        }
        setCargando2(false)
    }
    const handleSelect = (e) => {
        traerConteoNotas(Number(e.target.value))
    }
    return (
        <Layout>
            <Typography variant="h4" sx={{ mb: 2 }}>Reporte Mejores Promedios</Typography>
            <Grid container spacing={2} flex>
                <Grid item xs={6}>
                    {
                        !cargando2 && mejoresPromediosA.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <PieChartA
                                        data={mejoresPromediosA}
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
                        !cargando2 && mejoresPromediosB.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <PieChartB
                                        data={mejoresPromediosB}
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