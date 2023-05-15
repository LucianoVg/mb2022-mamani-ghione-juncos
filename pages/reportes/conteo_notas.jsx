import { Card, CardActions, CardContent, Autocomplete, TextField, Box, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authUserProvider";
import BarChartA from "../../components/graficos/BarChartA";
import BarChartB from "../../components/graficos/BarChartB";
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
        if (authUser?.rol) {
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
    }, [loading, authUser, authUser?.rol?.tipo])

    const tienePermisos = () => {
        return authUser?.rol?.tipo === 'Administrador'
            || authUser?.rol?.tipo === 'Director'
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)

        if (res.status === 200) {
            setMaterias(res.data)
            console.log(res.data);
        }
    }
    const materiaSinRepetir = materias.filter(m => m.cursoxdivision?.iddivision === 1)
    const materiasOrdenadas = materiaSinRepetir?.sort(
        (a, b) => (
            a.materiaxcursoxdivision?.idmateria - b.materiaxcursoxdivision?.idmateria
        )
    );

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
    const traerDocenteA = async (materiaId, division = "A") => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/usuario/${materiaId || 1}/${division}`
        );
        if (res.status === 200 && res.data) {
            setDocenteA(res.data);
            console.log("DOCENTE AAA", docenteA);
        }
    };
    const traerDocenteB = async (materiaId, division = "B") => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/usuario/${materiaId || 1}/${division}`
        );
        if (res.status === 200 && res.data) {
            setDocenteB(res.data);

            console.log("DOCENTE BBB", docenteB);
        }
    };
    const handleSelect = (e) => {
        traerConteoNotasA(Number(e.target.value))
        traerConteoNotasB(Number(e.target.value))
        traerDocenteA(Number(e.target.value))
        traerDocenteB(Number(e.target.value))


    }



    return (
        <Layout>
            <Typography variant="h5" sx={{ mb: 2 }}>Reporte Conteo de Notas</Typography>

            <Grid container spacing={2} flex>
                <Grid item xs={12}>
                    {materias.length > 0 &&
                        (
                            <FormControl sx={{ marginBottom: "20px" }}>
                                <Autocomplete
                                    sx={{ width: "330px" }}
                                    disablePortal
                                    id="inputMateria"
                                    // value={value}
                                    name="idMateria"
                                    onChange={handleSelect}
                                    options={materiasOrdenadas}
                                    getOptionLabel={(materia) =>
                                        `${materia?.materia?.nombre}`
                                    }
                                    isOptionEqualToValue={(option, value) => {
                                        return option?.materia?.id === value?.materia?.id;
                                    }}
                                    noOptionsText={"No existe materia con ese nombre"}
                                    renderOption={(props, materia) => (
                                        <Box
                                            component="li"
                                            {...props}
                                            key={materia?.id}
                                            value={materia?.materia?.id}
                                        >
                                            {materia?.materia?.nombre}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Materias" />
                                    )}
                                />
                            </FormControl>
                        )
                    }
                </Grid>
                <Grid item xs={6}>
                    {
                        !cargando && conteoNotasA.length > 0 && (
                            <Box>
                                <Box sx={{ marginBottom: "20px" }}>
                                    <Typography variant="h6" textAlign='center' >
                                        {
                                            `Docente: ${docenteA.usuario?.nombre} ${docenteA.usuario?.apellido}`
                                        }
                                    </Typography>
                                </Box>
                                <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                    <CardContent>
                                        <BarChartA
                                            data={conteoNotasA}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
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
                            <Box>
                                <Box sx={{ marginBottom: "20px" }}>
                                    <Typography variant="h6" textAlign='center'>
                                        {
                                            `Docente: ${docenteB.usuario?.nombre} ${docenteB.usuario?.apellido}`
                                        }
                                    </Typography>
                                </Box>
                                <Card sx={{ backgroundColor: '#f9f9f9', minWidth: "400px", minHeight: "200px" }}>
                                    <CardContent>
                                        <BarChartB
                                            data={conteoNotasB}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
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