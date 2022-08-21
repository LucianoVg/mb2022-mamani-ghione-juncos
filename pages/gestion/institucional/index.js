import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { authStateChanged } from "../../../servicios/cuenta";

export default function Institucional() {
    const router = useRouter()
    const [usuario, setUsuario] = useState({ id: 0 })
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const [cargando, setCargando] = useState(false)

    const traerUsuario = (email) => {
        axios.get(`http://localhost:3000/api/gestion/cuenta/${email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({
                        id: res.data.id
                    })
                }
            })
    }
    const traerFicha = (id) => {
        axios.get(`http://localhost:3000/api/gestion/institucional/usuario/${id}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setFichaInstitucional(res.data)
                }
                setCargando(false)
            })
    }
    useEffect(() => {
        setCargando(true)
        authStateChanged(user => {
            if (user.email) {
                traerUsuario(user.email)
                traerFicha(usuario.id)
            } else {
                router.push('/gestion/cuenta/login')
            }
        })
    }, [usuario.id])

    return (
        <Layout title={'Ficha Institucional'}>
            {
                usuario && usuario.id !== 0 && fichaInstitucional.id === 0 && (
                    <a href="/gestion/institucional/generar_ficha_institucional" className="btn btn-primary m-2">Nueva Ficha Institucional</a>
                )
            }

            {
                fichaInstitucional.id !== 0 ? (
                    <div>
                        <Carrusel imagenes={fichaInstitucional.portadasFicha} />
                        <a href={`/gestion/institucional/${fichaInstitucional.idUsuario}`} className="btn btn-primary">Editar Ficha</a>

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
                    <h3 className="text-center">No hay ninguna ficha</h3>
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