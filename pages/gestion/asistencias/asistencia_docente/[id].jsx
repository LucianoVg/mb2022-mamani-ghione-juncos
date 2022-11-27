import { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../../components/layout';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../components/context/authUserProvider';

const MasInfo = () => {
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        listarAsistencia()
    }, [id, loading, authUser])

    const { loading, authUser } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [asistencia, setAsistencia] = useState()

    const listarAsistencia = async () => {
        if (id) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente/detalles/${id}`)
            if (res.data) {
                setAsistencia(res.data)
            }
        }
    }

    const mostrarAsistencia = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )

    }

    // const mostrarAsistencia2 = (a) => {
    //     if (a.presente && 1) {
    //         setAsistenciaActual = 'Presente'
    //     }
    //     if (a.ausente && 1) {
    //         setAsistenciaActual = 'Ausente'
    //     }
    //     if (a.ausenteJustificado && 1) {
    //         setAsistenciaActual = 'Ausente Justificado'
    //     }
    //     if (a.llegadaTarde && 1) {
    //         setAsistenciaActual = 'Llegada Tarde'
    //     }
    //     if (a.llegadaTardeJustificada && 1) {
    //         setAsistenciaActual = 'Llegada Tarde Justificada'
    //     }
    //     if (a.mediaFalta && 1) {
    //         setAsistenciaActual = 'Media Falta'
    //     }
    //     if (a.mediaFaltaJustificada && 1) {
    //         setAsistenciaActual = 'Media Falta Justificada '
    //     }
    // }

    return (
        <Layout>
            <div>
                <h4>Mas Información</h4>
                <form className='needs-validation'>
                    <div className='hstack gap-2 '>
                        <div className='mb-2'>
                            <h5><strong>Docente: </strong></h5>
                            <span>{asistencia?.docenteXmateria?.usuario?.apellido} {asistencia?.docenteXmateria?.usuario?.nombre}</span>
                        </div>

                        {
                            asistencia?.motivo != null ? (
                                <div>
                                    <h5><strong>Editado por: </strong></h5>
                                    <span>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</span>
                                </div>
                            ) :
                                (
                                    <div className='mb-2'>
                                        <h5><strong>Creado por:</strong></h5>
                                        <span>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</span>
                                    </div>
                                )
                        }
                    </div>
                    <hr className='mb-2' />
                    <div className='hstack gap-3'>
                        <div className='mb-2'>
                            <h5><strong>Asistencia Actual</strong></h5>
                            {
                                asistencia?.presente ? (
                                    <p style={{ fontSize: "20px" }}>Presente</p>
                                ) :
                                    (
                                        asistencia?.ausente ? (
                                            <p style={{ fontSize: "20px" }}>Ausente</p>
                                        ) :
                                            (
                                                asistencia?.ausenteJustificado ? (
                                                    <p style={{ fontSize: "20px" }}>Ausente Justificado</p>
                                                ) :
                                                    (
                                                        asistencia?.llegadaTarde ? (
                                                            <p style={{ fontSize: "20px" }}>Llegada Tarde</p>
                                                        ) :
                                                            (
                                                                asistencia?.llegadaTardeJustificada ? (
                                                                    <p style={{ fontSize: "20px" }}>llegada Tarde Justificada</p>
                                                                ) :
                                                                    (
                                                                        asistencia?.mediaFalta ? (
                                                                            <p style={{ fontSize: "20px" }}>Media Falta</p>
                                                                        ) :
                                                                            (
                                                                                <p style={{ fontSize: "20px" }}>Media Falta Justificada</p>
                                                                            )
                                                                    )
                                                            )
                                                    )
                                            )
                                    )
                            }
                        </div>
                        <div>
                            <h5><strong>Creado el: </strong></h5>
                            <span>{asistencia?.creadoEn}</span>
                        </div>
                        <hr className="mb-2" />
                        {
                            asistencia?.actualizadoEn != null ? (
                                <div className='mb-2'>
                                    <h5><strong>Actualizado el:</strong></h5>
                                    <span>{asistencia?.actualizadoEn}</span>
                                </div>
                            ) :
                                (
                                    <div className='mb-2'>
                                        <h5><strong>Actualizado en:</strong></h5>
                                        <span>--/--/----</span>
                                    </div>
                                )
                        }
                    </div>

                    <div className='mb-2'>
                        <h5><strong>Motivo</strong></h5>
                        <span>{asistencia?.motivo}</span>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default MasInfo