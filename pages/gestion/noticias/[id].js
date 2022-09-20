import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import { Layout } from "../../../components/layout"
import { guardarImagen, traerImagen } from "../../../servicios/portada"

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: ''
    })
    const [noticiaActualizar, setNoticiaActualizar] = useState({
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: ''
    })
    const router = useRouter()
    const hoy = new Date()
    const [imagen, setImagen] = useState(null)
    const [imgUrl, setImgUrl] = useState()

    const handleImagen = (e) => {
        setImagen(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }
    const onSubmitData = async (e) => {
        e.preventDefault()
        if (imagen) {
            guardarImagen('imagenes_noticias/' + imagen?.name, imagen)
                .then(result => {
                    traerImagen('imagenes_noticias/' + imagen?.name)
                        .then(url => {
                            axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/${noticia.id}`, {
                                titulo: noticiaActualizar.titulo,
                                url: url,
                                descripcion: noticiaActualizar.descripcion,
                                actualizadaEn: hoy.toLocaleDateString('en-GB')
                            }).then(res => {
                                console.log(res.data);
                                router.push('/')
                            })
                        })
                })

        } else {
            axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/${noticia.id}`, {
                titulo: noticiaActualizar.titulo,
                url: noticia.url,
                descripcion: noticiaActualizar.descripcion,
                actualizadaEn: hoy.toLocaleDateString('en-GB')
            }).then(res => {
                console.log(res.data);
            })
        }

        router.push('/')

    }

    const borrarNoticia = () => {
        if (confirm("Está seguro que desea eliminar la noticia?")) {
            axios.delete(`${process.env.BASE_URL}/gestion/noticias_novedades/${noticia.id}`).then(res => {
                console.log(res.data);
                router.push('/')
            })
        }
    }
    const handleForm = (e) => {
        setNoticiaActualizar({ ...noticiaActualizar, [e.target.name]: e.target.value })
    }

    const { loading, authUser } = useAuth()
    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNoticia(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
    }, [id, authUser, loading])

    return (
        <Layout>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>Detalles de la noticia</Typography>

            <Container maxWidth={'md'}>
                <Box textAlign={'center'}>
                    <Image src={imgUrl || noticia.url || '/assets/img/placeholder.png'} width={200} height={200} className="m-auto" />
                </Box>
                <Box textAlign={'center'} component={'form'} onSubmit={onSubmitData}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                name="titulo"
                                fullWidth
                                required
                                label="Titulo"
                                placeholder={noticia.titulo}
                                value={noticiaActualizar.titulo}
                                onChange={handleForm} />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="descripcion"
                                multiline
                                rows={5}
                                required
                                label="Descripcion"
                                value={noticiaActualizar.descripcion}
                                placeholder={noticia.descripcion}
                                onChange={handleForm} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={{ marginTop: 2 }} variant="outlined" component="label">
                                <input hidden onChange={handleImagen} type="file" accept='image/*' name='imagen' />
                                Subir Imagen
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button type="submit" variant="contained" color="primary">Actualizar</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="warning" onClick={borrarNoticia}>Eliminar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Layout>
    )
}