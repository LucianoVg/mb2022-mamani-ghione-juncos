import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import Loading from "../../../../components/loading";
import { Box, Button, Card, CardContent, CardActions, IconButton, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import styles from "../../../../styles/fontSize.module.css"

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
                            <Card sx={{ minWidth: '275px', height: '400px', boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', backgroundColor: 'white', borderRadius: '30px' }}>
                                <Typography textAlign="center" variant={'h6'}
                                    sx={{ marginBottom: '30px', marginTop: '40px' }}
                                    className={`${styles.Typography}`}
                                ><strong>{n.notificacion?.asunto}</strong> </Typography>
                                <Typography variant={'body2'}
                                    sx={{ marginBottom: '30px', marginLeft: '20px' }}
                                    className={`${styles.Typography2}`}
                                >{n.notificacion?.contenido} </Typography>
                                <Typography variant="caption" sx={{ marginBottom: '30px', marginLeft: '20px' }}
                                    className={`${styles.Typography3}`}
                                > <strong>Atte. {n.usuario?.rol?.tipo}</strong></Typography>

                            </Card>

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