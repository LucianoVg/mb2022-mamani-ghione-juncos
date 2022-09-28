import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { Typography, Button, Container, Grid, Divider } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";

export default function Institucional() {
    const [fichaInstitucional, setFichaInstitucional] = useState()
    const [cargando, setCargando] = useState(true)
    const { authUser } = useAuth()

    const traerFicha = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional`)
            .then(res => {
                setFichaInstitucional(res.data[0])
            }).catch(err => {
                console.error(err);
            })
        setCargando(false)
    }

    useEffect(() => {
        traerFicha()
    }, [])

    return (
        <Layout>
            {
                !cargando && !fichaInstitucional && (
                    <div>
                        <Typography sx={{ mb: 3 }} component={'h3'} variant="h4">No hay ninguna ficha</Typography>
                        {
                            authUser && (
                                <Link href={'/gestion/institucional/generar_ficha_institucional'}>
                                    <Button variant="outlined">
                                        <AddBoxRounded />
                                        Nueva Ficha Institucional
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                )
            }

            {
                fichaInstitucional && (
                    <div >
                        <Carrusel imagenes={fichaInstitucional.portadasFicha} />
                        <Typography variant="h4">{fichaInstitucional.nombreInstitucion}</Typography>

                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Institución: {fichaInstitucional.tipoInstitucion ? 'Privada' : 'Publica'}</Typography>

                        <Typography variant="overline">{fichaInstitucional.descripcion}</Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Divider sx={{ mb: 1 }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">Datos de Contacto</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2"><strong>Ubicación:</strong> {fichaInstitucional.ubicacion}</Typography>
                              
                            </Grid>
                            <Grid item xs={12}>
                              
                                <Typography variant="body2"><strong>Correo:</strong> {fichaInstitucional.mail}</Typography>
                            </Grid>

                            <Grid item xs>
                                <Typography variant="body2">
                                    <strong>{fichaInstitucional.oficina1}</strong>
                                </Typography>
                                <Typography variant="body2">
                                   {fichaInstitucional.telefono1}
                                </Typography>



                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body2">
                                    <strong>{fichaInstitucional.oficina2}</strong>
                                </Typography>
                                <Typography variant="body2">
                                   {fichaInstitucional.telefono2}
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ mb: 1 }} />
                            </Grid>
                        </Grid>
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