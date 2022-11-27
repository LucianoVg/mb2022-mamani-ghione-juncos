import { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/context/authUserProvider';

const MasInfo = () => {


    const { loading, authUser } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [asistencia, setAsistencia] = useState()

    const listarAsistencia = async () => {
        if (id) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/detalles/${id}`)
            if (res.data) {
                console.log(res.data)
                setAsistencia(res.data)
            }
        }
    }

    const mostrarAsistencia = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )

    }

    const mostrarAsistencia2 = (a) => {
        if (a.presente && 1) {
            setAsistenciaActual = 'Presente'
        }
        if (a.ausente && 1) {
            setAsistenciaActual = 'Ausente'
        }
        if (a.ausenteJustificado && 1) {
            setAsistenciaActual = 'Ausente Justificado'
        }
        if (a.llegadaTarde && 1) {
            setAsistenciaActual = 'Llegada Tarde'
        }
        if (a.llegadaTardeJustificada && 1) {
            setAsistenciaActual = 'Llegada Tarde Justificada'
        }
        if (a.mediaFalta && 1) {
            setAsistenciaActual = 'Media Falta'
        }
        if (a.mediaFaltaJustificada && 1) {
            setAsistenciaActual = 'Media Falta Justificada '
        }
    }
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        listarAsistencia()
    }, [id, loading, authUser])
    return (
        <Layout>
            <div className="container">
                <h1>Mas Información</h1>
                <form className='needs-validation '>
                    <div className="row g-3">
                        <div className="col-md-2">
                            <h3><strong>Curso: </strong></h3>
                            <h4>{asistencia?.alumnoXcursoXdivision?.cursoXdivision?.curso?.nombre} {asistencia?.alumnoXcursoXdivision?.cursoXdivision?.division?.division}</h4>
                        </div>

                        <div className="col-md-7">
                            <h3><strong>Curso: </strong></h3>
                            <h4>{asistencia?.alumnoXcursoXdivision?.cursoXdivision?.curso?.nombre} {asistencia?.alumnoXcursoXdivision?.cursoXdivision?.division?.division}</h4>
                        </div>

                        <div className="col-md-3">
                            {
                                asistencia?.motivo ? (
                                    <div className='mb-2'>
                                        <h3><strong>Editado por: </strong></h3>
                                        <h4>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</h4>
                                    </div>
                                ) :
                                    (
                                        <div className='mb-2'>
                                            <h3><strong>Creado por:</strong></h3>
                                            <h4>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</h4>
                                        </div>
                                    )
                            }
                        </div>
                        <hr className="mb-2" />
                        <div className="col-md-4">
                            <h3><strong>Asistencia Actual</strong></h3>
                            {
                                asistencia?.presente ? (
                                    <h4>Presente</h4>
                                ) :
                                    (
                                        asistencia?.ausente ? (
                                            <h4>Ausente</h4>
                                        ) :
                                            (
                                                asistencia?.ausenteJustificado ? (
                                                    <h4>Ausente Justificado</h4>
                                                ) :
                                                    (
                                                        asistencia?.llegadaTarde ? (
                                                            <h4>Llegada Tarde</h4>
                                                        ) :
                                                            (
                                                                asistencia?.llegadaTardeJustificada ? (
                                                                    <h4>llegada Tarde Justificada</h4>
                                                                ) :
                                                                    (
                                                                        asistencia?.mediaFalta ? (
                                                                            <h4>Media Falta</h4>
                                                                        ) :
                                                                            (
                                                                                <h4>-</h4>
                                                                            )
                                                                    )
                                                            )
                                                    )
                                            )
                                    )
                            }
                        </div>
                        <div className="col-md-3">
                            <h3><strong>Creado el: </strong></h3>
                            <h4>{asistencia?.creadoEn}</h4>
                        </div>
                        <div className="col-md-5">
                            {
                                asistencia?.actualizadoEn ? (
                                    <div className='mb-2'>
                                        <h3><strong>Actualizado el:</strong></h3>
                                        <h4>{asistencia?.actualizadoEn}</h4>
                                    </div>
                                ) :
                                    (
                                        <div className='mb-2'>
                                            <h3><strong>Actualizado en:</strong></h3>
                                            <h4>--/--/----</h4>
                                        </div>
                                    )
                            }
                        </div>
                        <hr className='mb-2' />
                        <div className='col-md-5'>
                            <h3><strong>Motivo</strong></h3>
                            <h4>{asistencia?.motivo}</h4>
                        </div>
                    </div>

                </form >
            </div >
        </Layout >
    )
}

export default MasInfo