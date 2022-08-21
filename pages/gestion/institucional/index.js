import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { Layout } from "../../../components/layout";
import { authStateChanged } from "../../../servicios/cuenta";

export default function Institucional() {
    const router = useRouter()
    const [usuario, setUsuario] = useState({ email: '' })
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const cargarFicha = async () => {
        axios.get('http://localhost:3000/api/gestion/institucional')
            .then(res => {
                console.log(res.data);
                setFichaInstitucional(res.data)
            })
    }

    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                setUsuario({ email: user.email })
                cargarFicha()
            } else {
                router.push('/gestion/cuenta/login')
            }
        })
    }, [])

    return (
        <Layout title={'Ficha Institucional'}>
            {
                usuario && usuario.email !== '' && (
                    <a href="/gestion/institucional/generar_ficha_institucional" className="btn btn-primary m-2">Nueva Ficha Institucional</a>
                )
            }

            {
                fichaInstitucional.id !== 0 ? (
                    <div>
                        <Carrusel imagenes={fichaInstitucional.portadasFicha} />
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
                ) : (
                    usuario && usuario.email !== '' ? (
                        <h3>No se creó ninguna ficha, presione el boton de arriba para crear una</h3>
                    ) : (
                        <h3>No se creó ninguna ficha, inicie sesión para crear una.</h3>
                    )
                )
            }
        </Layout>
    )
}