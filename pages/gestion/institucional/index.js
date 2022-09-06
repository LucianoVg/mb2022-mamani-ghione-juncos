import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { Typography, Button } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";

export default function Institucional() {
    const [fichaInstitucional, setFichaInstitucional] = useState()
    const [cargando, setCargando] = useState(true)
    const { authUser } = useAuth()

    const traerFicha = () => {
        setCargando(true)
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional`)
            .then(res => {
                console.log(res.data);
                setFichaInstitucional(res.data[0])
            }).catch(err => {
                console.error(err);
            })
        setCargando(false)
    }

    useEffect(() => {
        traerFicha()
    }, [cargando, fichaInstitucional])

    return (
        <Layout title={'Ficha Institucional'}>
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
                    <div className="m-3">
                        <Carrusel imagenes={fichaInstitucional?.portadasFicha} />
                        {
                            authUser && (
                                <Link href={`/gestion/institucional/${fichaInstitucional?.idUsuario}`}>
                                    <a className="btn btn-primary">Editar Ficha</a>
                                </Link>
                            )
                        }

                        <h2>{fichaInstitucional?.nombreInstitucion}</h2>
                        <p>{fichaInstitucional?.descripcion}</p>
                        <p></p>

                        <div className="line"></div>

                        <h2>Telefonos</h2>
                        <p>Telefono 1: {fichaInstitucional?.telefono1}</p>
                        <p>Telefono 2: {fichaInstitucional?.telefono2}</p>

                        <div className="line"></div>

                        <h2>Oficinas</h2>
                        <p>Oficina 1: {fichaInstitucional?.oficina1}</p>
                        <p>Oficina 2: {fichaInstitucional?.oficina2}</p>

                        <div className="line"></div>
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