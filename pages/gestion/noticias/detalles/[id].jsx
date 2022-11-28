import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import { Typography } from "@mui/material";
import Loading from "../../../../components/loading";

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: ''
    })
    const [cargando, setCargando] = useState(true)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNoticia(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
        setCargando(false)

    }, [id, cargando])


    return (
        <Layout>
            {
                noticia.id !== '' && (
                    <div className="container text-center">
                        <Image alt="noticia" src={noticia.url !== '' ? noticia.url : '/assets/img/placeholder.png'} width={500} height={400} />

                        <Typography component={'h1'} variant="h3">{noticia.titulo}</Typography>
                        <Typography component={'p'} variant="p">{noticia.descripcion}</Typography>
                    </div>
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