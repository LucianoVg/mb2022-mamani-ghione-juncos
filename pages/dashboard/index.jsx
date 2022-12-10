import { Card, CardContent, Container, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authUserProvider";
import BarChart from "../../components/graficos/BarChart";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";

export default function Dashboard() {
    const [usuario, setUsuario] = useState({ rol: '' })
    const router = useRouter()
    const [conteoNotas, setConteoNotas] = useState([])
    const [cargando, setCargando] = useState(false)
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerConteoNotas()
            }
        }
    }, [loading, authUser, usuario.rol])

    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Director'
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            console.log(res.data);
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }
    const traerConteoNotas = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/${1}`)
        if (res.status === 200) {
            setConteoNotas(res.data)
        }
        setCargando(false)
    }
    return (
        <Layout>
            <h3>Dashboard</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {
                        !cargando && conteoNotas.length > 0 && (
                            <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                <CardContent>
                                    <BarChart
                                        data={conteoNotas}
                                    />
                                </CardContent>
                            </Card>
                        )
                    }
                    {
                        cargando && (
                            <Container sx={{ textAlign: 'center' }}>
                                <Loading size={30} />
                            </Container>
                        )
                    }
                </Grid>
            </Grid>
        </Layout>
    )
}