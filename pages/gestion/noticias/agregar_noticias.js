import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';
import { guardarImagen, traerImagen } from '../../../servicios/portada';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/context/authUserProvider';
import { Typography, Box, TextField, Button } from "@mui/material";
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const AgregarNoticias = () => {
    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
        url: ''
    })
    var hoy = new Date();
    const [imagen, setImagen] = useState(null)
    const [usuario, setUsuario] = useState({ id: 0 })
    const router = useRouter()
    const [imagenPrev, setImagenPrev] = useState("/assets/img/placeholder.png")

    const handleForm = (e) => {
        setNoticia({
            ...noticia, [e.target.name]: e.target.value
        })
    }
    const handleImagen = (e) => {
        setImagen(e.currentTarget.files[0])
        setImagenPrev(URL.createObjectURL(e.currentTarget.files[0]))
        console.log(imagenPrev);
    }
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({
                        id: res.data.id
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }, [loading, authUser])


    const onSubmitData = async (e) => {
        e.preventDefault()
        // noticia.fecha = fecha

        console.log(imagen);
        console.log(noticia);
        guardarImagen('imagenes_noticias/' + imagen?.name, imagen)
            .then(result => {
                traerImagen('imagenes_noticias/' + imagen?.name)
                    .then(url => {
                        axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`, {
                            titulo: noticia.titulo,
                            creadaEn: hoy.toLocaleDateString(),
                            url: url,
                            descripcion: noticia.descripcion,
                            idUsuario: usuario.id
                        }).then(res => {
                            console.log(res.data);
                        })

                    })
            })
        router.push('/')
    }

    return (
        <Layout>
            <Typography component={'h3'} variant="h4">Nueva Noticia</Typography>
            <Box component={'form'} onSubmit={onSubmitData} sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="titulo"
                            label="Titulo de la noticia"
                            name="titulo"
                            autoFocus
                            onChange={handleForm}
                            value={noticia.titulo}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id="titulo"
                            label="Descripcion de la noticia"
                            name="descripcion"
                            autoFocus
                            multiline
                            rows={3}
                            onChange={handleForm}
                            value={noticia.descripcion}
                        />
                        <Button disabled={imagen === null} variant='contained' color='primary' type='submit'>Guardar Noticia</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ maxWidth: 345, height: 350 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={imagenPrev}
                                    alt="portada"
                                    loading='lazy'
                                />
                            </CardActionArea>
                        </Card>
                        <Button sx={{ mt: 1 }} variant="outlined" component="label">
                            Subir Portada
                            <input hidden id='inputFile' value={noticia.url} onChange={handleImagen} type="file" accept='image/*' name='url' />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}

export default AgregarNoticias