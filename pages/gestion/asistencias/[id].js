import { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/context/authUserProvider';
<<<<<<< HEAD

const MasInfo = () => {

=======
import { Box, Divider, TextField, Typography } from '@mui/material';

const MasInfo = () => {
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        listarAsistencia()
    }, [id, loading, authUser])
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)

    const { loading, authUser } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [asistencia, setAsistencia] = useState()

    const listarAsistencia = async () => {
        if (id) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/detalles/${id}`)
            if (res.data) {
<<<<<<< HEAD
                console.log(res.data)
=======
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
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
<<<<<<< HEAD
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
=======

    return (
        <Layout>
            <div>
                <Typography variant='h4' sx={{ marginBottom: 2 }}>Mas Información</Typography>
                <form className='needs-validation'>
                    <div className='hstack gap-2 '>
                        <Box component='div' sx={{ marginBottom: 2 }}>
                            <Typography variant='h5' sx={{ fontWeight: 500 }}>Alumno: </Typography>
                            <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.alumnoXcursoXdivision?.usuario?.apellido} {asistencia?.alumnoXcursoXdivision?.usuario?.nombre}</Typography>
                        </Box>
                        <Box component='div' sx={{ marginBottom: 2 }}>
                            <Typography variant='h5' sx={{ fontWeight: 500 }}>Curso: </Typography>
                            <Typography variant='body' sx={{ fontSize: 18 }}>{asistencia?.alumnoXcursoXdivision?.cursoXdivision?.curso?.nombre} {asistencia?.alumnoXcursoXdivision?.cursoXdivision?.division?.division}</Typography>
                        </Box>
                        {
                            asistencia?.motivo != null ? (
                                <Box component={'div'} sx={{ marginBottom: 2 }}>
                                    <Typography variant={'h5'} sx={{ fontWeight: 500 }}>Editado por: </Typography>
                                    <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</Typography>
                                </Box>
                            ) :
                                (
                                    <Box component='div' sx={{ marginBottom: 2 }}>
                                        <Typography variant='h5' sx={{ fontWeight: 500 }}>Creado por:</Typography>
                                        <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}</Typography>
                                    </Box>
                                )
                        }
                    </div>
                    <Divider sx={{ width: '100%', marginBottom: 2 }} />
                    <div className='hstack gap-3'>
                        <Box component={'div'} sx={{ marginBottom: 2 }}>
                            <Typography variant={'h5'} sx={{ fontWeight: 500 }}>Asistencia Actual</Typography>
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
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
                                                                            )
                                                                    )
                                                            )
                                                    )
                                            )
                                    )
                            }
<<<<<<< HEAD
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
=======
                        </Box>
                        <Box component={'div'} sx={{ marginBottom: 2 }}>
                            <Typography variant={'h5'} sx={{ fontWeight: 500 }}>Creado el: </Typography>
                            <Typography variant={'body1'} sx={{ fontSize: 18 }}>{asistencia?.creadoEn}</Typography>
                        </Box>
                        <Divider sx={{ width: '100%', marginBottom: 2 }} />
                        {
                            asistencia?.actualizadoEn != null ? (
                                <Box component='div' sx={{ marginBottom: 2 }}>
                                    <Typography variant='h5' sx={{ fontWeight: 500 }}>Actualizado el:</Typography>
                                    <Typography variant={'body1'} sx={{ fontSize: 18 }}>{asistencia?.actualizadoEn}</Typography>
                                </Box>
                            ) :
                                (
                                    <Box component='div' sx={{ marginBottom: 2 }}>
                                        <Typography variant='h5' sx={{ fontWeight: 500 }}>Actualizado en:</Typography>
                                        <Typography variant={'body1'} sx={{ fontSize: 18 }}>--/--/----</Typography>
                                    </Box>
                                )
                        }
                    </div>

                    <Box component={'div'} sx={{ margin: 'auto' }}>
                        <Typography variant='h5' sx={{ fontWeight: 500 }}>Motivo</Typography>
                        <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.motivo}</Typography>
                    </Box>
                </form>
            </div>
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
        </Layout >
    )
}

export default MasInfo