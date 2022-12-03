import { Box, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { guardarImagen, traerImagen } from "../../../servicios/portada";

export default function EditarFicha() {
    const [ficha, setFicha] = useState({
        id: '', nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: '', portadasFicha: []
    })
    const [cargando, setCargando] = useState(false)

    const router = useRouter()

    const handleForm = (e) => {
        setFicha({ ...ficha, [e.target.name]: e.target.value })
    }
    const guardarFicha = (e) => {
        e.preventDefault()

        axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional/${ficha.id}`, {
            nombreInstitucion: ficha.nombreinstitucion,
            ubicacion: ficha.ubicacion,
            tipoInstitucion: ficha.tipoinstitucion,
            descripcion: ficha.descripcion,
            telefono1: ficha.telefono1,
            telefono2: ficha.telefono2,
            oficina1: ficha.oficina1,
            oficina2: ficha.oficina2,
            mail: ficha.mail,
            idUsuario: ficha.idusuario
        }).then(res => {
            console.log(res.data);
            ficha.portadasFicha.map(p => {
                if (p.id) {
                    axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/portadas/${p.id}`, {
                        nombre: p.nombre,
                        url: p.url,
                        fichaInstitucionalId: p.idfichainstitucional
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/portadas`, {
                        nombre: p.nombre,
                        url: p.url,
                        fichaInstitucionalId: p.idfichainstitucional
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }).catch(err => {
            console.log(err);
        })
        router.push('/gestion/institucional')
    }

    const imgRef = useRef(null)
    const { authUser, loading } = useAuth()
    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        if (id) {
            setCargando(true)
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional/${id}`)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        setFicha(res.data)
                    }
                    setCargando(false)
                })
        }
    }, [id, authUser, loading])

    const cargarImagenes = () => {

        if (imgRef.current.files.length > 0) {
            for (let i = 0; i < imgRef.current.files.length; i++) {
                const file = imgRef.current.files[i];
                guardarImagen('portadas/' + file.name, file)
                    .then(result => {
                        traerImagen('portadas/' + file.name).then(url => {
                            ficha.portadasFicha.push({
                                nombre: file.name,
                                url: url,
                                fichaInstitucionalId: ficha.id
                            })
                            console.log(ficha.portadasFicha);
                        })

                        // console.log(fichaInstitucional);
                    }).catch(err => {
                        console.log(err);
                    })
            }
        }
    }


    return (
        <Layout>
            {
                ficha && ficha.id !== '' && (
                    <Box component={'form'}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    label="Nombre de la institucion"
                                    name="nombreInstitucion"
                                    value={ficha.nombreinstitucion}
                                    required
                                    onChange={handleForm} />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    label="Nombre de la institucion"
                                    name="nombreInstitucion"
                                    value={ficha.nombreinstitucion}
                                    required
                                    onChange={handleForm} />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    label="Nombre de la institucion"
                                    name="nombreInstitucion"
                                    value={ficha.nombreinstitucion}
                                    required
                                    onChange={handleForm} />
                            </Grid>
                        </Grid>
                    </Box>
                )
            }
            {
                cargando && (
                    <Loading />
                )
            }
        </Layout>
    )
}