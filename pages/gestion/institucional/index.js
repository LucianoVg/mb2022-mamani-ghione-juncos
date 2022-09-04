import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

export default function Institucional() {
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const [cargando, setCargando] = useState(true)
    const { authUser } = useAuth()

    const traerFicha = () => {
        setCargando(true)
        axios.get(`${process.env.BASE_URL}/gestion/institucional`)
            .then(res => {
                setFichaInstitucional(res.data[0])
                setCargando(false)
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        traerFicha()
    }, [])

    return (
        <Layout title={'Ficha Institucional'}>
            {
                !cargando && fichaInstitucional.id === 0 && (
                    <div>
                        <h3 className="text-center">No hay ninguna ficha</h3>
                        {
                            authUser && (
                                <Link href={'/gestion/institucional/generar_ficha_institucional'}>
                                    <a className="btn btn-primary m-2">Nueva Ficha Institucional</a>
                                </Link>
                            )
                        }
                    </div>
                )
            }

            {
                fichaInstitucional.id !== 0 && (
                    <div className="m-3">
                        <Carrusel imagenes={fichaInstitucional.portadasFicha} />
                        {
                            authUser && (
                                <Link href={`/gestion/institucional/${fichaInstitucional.idUsuario}`}>
                                    <a className="btn btn-primary">Editar Ficha</a>
                                </Link>
                            )
                        }

                        <h2>{fichaInstitucional.nombreInstitucion}</h2>
                        <p>{fichaInstitucional.descripcion}</p>
                        <p></p>

                        <div className="line"></div>

                        <h2>Telefonos</h2>
                        <p>Telefono 1: {fichaInstitucional.telefono1}</p>
                        <p>Telefono 2: {fichaInstitucional.telefono2}</p>

                        <div className="line"></div>

                        <h2>Oficinas</h2>
                        <p>Oficina 1: {fichaInstitucional.oficina1}</p>
                        <p>Oficina 2: {fichaInstitucional.oficina2}</p>

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