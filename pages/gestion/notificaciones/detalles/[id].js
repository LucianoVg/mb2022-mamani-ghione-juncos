import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import { Typography } from "@mui/material";
import Loading from "../../../../components/loading";

export default function DetallesNoticia() {
    const [notificacion, setNotificacion] = useState()
    const [cargando, setCargando] = useState(true)
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/detalles/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNotificacion(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
        setCargando(false)

    }, [id, cargando])


    return (
        <Layout>
            {
                notificacion && notificacion.map((n, i) => (
                    n.id !== '' && (
                        <div className="container text-center">
                            <Typography textAlign="center" variant={'h6'}
                                sx={{ marginBottom: '30px' }}
                            ><strong>{n.notificacion?.asunto}</strong> </Typography>
                            <Typography variant={'body2'}
                                sx={{ marginBottom: '30px' }}
                            >{n.notificacion?.contenido} </Typography>
                            <Typography variant="caption"> <strong>Atte. {n.usuario?.rol?.tipo}</strong></Typography>
                        </div>
                    )
                ))


            }
            {
                cargando && (
                    <Loading />
                )
            }
        </Layout>
    )
}