import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import { Container, Typography } from "@mui/material";
import Loading from "../../../../components/loading";

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: ''
    })
    const [cargando, setCargando] = useState(false)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            setCargando(true)
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNoticia(res.data)
                    setCargando(false)
                }).catch(err => {
                    console.error(err);
                    setCargando(false)
                })
        }
    }, [id])


    return (
        <Layout>
            {
                noticia.id !== '' && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Image alt="noticia" src={noticia.url !== '' ? noticia.url : '/assets/img/placeholder.png'} width={500} height={400} />

                        <Typography component={'h1'} variant="h3">{noticia.titulo}</Typography>
                        <Typography component={'p'} variant="p">{noticia.descripcion}</Typography>
                    </Container>
                )
            }
            {
                cargando && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Loading />
                    </Container>
                )
            }
        </Layout>
    )
}