import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import { Layout } from "../../../components/layout"
import Loading from "../../../components/loading"
import { guardarImagen, traerImagen } from "../../../servicios/portada"

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
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
    const [guardando, setGuardando] = useState(false)

    const handleImagen = (e) => {
        setImagen(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }
    const onSubmitData = async (e) => {
        e.preventDefault()
        setGuardando(true)
        if (imagen) {
            const result = await guardarImagen('imagenes_noticias/' + imagen?.name, imagen)
            if (result) {
                const url = await traerImagen('imagenes_noticias/' + imagen?.name)
                const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`, {
                    titulo: noticiaActualizar.titulo,
                    url: url,
                    descripcion: noticiaActualizar.descripcion,
                    actualizadaEn: hoy.toLocaleDateString('es-AR').split('T')[0]
                })
                setGuardando(false)
                if (res.status === 200) {
                    router.push('/')
                }
            }
        } else {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`, {
                titulo: noticiaActualizar.titulo,
                url: noticia.url,
                descripcion: noticiaActualizar.descripcion,
                actualizadaEn: hoy.toLocaleDateString('es-AR').split('T')[0]
            })
            setGuardando(false)
            if (res.status === 200) {
                router.push('/')
            }
        }
    }

    const borrarNoticia = async () => {
        if (confirm("Está seguro que desea eliminar la noticia?")) {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`)
            if (res.status === 200) {
                router.push('/')
            }
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
                    <Grid container spacing={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <Button sx={{ marginTop: 2 }} variant="outlined" component="label">
                                <input hidden onChange={handleImagen} type="file" accept='image/*' name='imagen' />
                                Subir Imagen
                            </Button>
                        </Grid>
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


                    </Grid>

                    <Grid container 
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{marginLeft: "210px"}}
                    >
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained" color="primary">Actualizar</Button>

                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="warning" onClick={borrarNoticia}>Eliminar</Button>
                        </Grid>
                    </Grid>
                </Box>
                {
                    guardando && (
                        <Container sx={{ textAlign: 'center' }}>
                            <Loading size={80} />
                        </Container>
                    )
                }
            </Container>
        </Layout>
    )
}