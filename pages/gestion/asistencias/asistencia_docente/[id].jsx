import { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../../components/layout';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../components/context/authUserProvider';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import Loading from '../../../../components/loading';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';

const MasInfo = () => {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const [asistencia, setAsistencia] = useState()
    const [cargando, setCargando] = useState(false)
    const listarAsistencia = async () => {
        if (id) {
            setCargando(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente/detalles/${id}`)
            if (res.data) {
                console.log(res.data)
                setAsistencia(res.data)
            }
            setCargando(false)
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
            {
                !cargando && (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography variant='h4' sx={{ marginBottom: 2 }}>Mas Información</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Link href={'/gestion/asistencias/asistencia_docente'}>
                                    <Button endIcon={<ArrowBack />} color="secondary" variant="outlined">
                                        Volver
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <div className='hstack gap-2 '>
                            <Box component='div' sx={{ marginBottom: 2 }}>
                                <Typography variant='h5' sx={{ fontWeight: 500 }}>Alumno: </Typography>
                                <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.docentexmateria?.usuario?.apellido} {asistencia?.docentexmateria?.usuario?.nombre}</Typography>
                            </Box>
                            {/* <Box component='div' sx={{ marginBottom: 2 }}>
                                <Typography variant='h5' sx={{ fontWeight: 500 }}>Curso: </Typography>
                                <Typography variant='body' sx={{ fontSize: 18 }}>{asistencia?.docentexmateria?.cursoxdivision?.curso?.nombre} {asistencia?.docentexmateria?.cursoxdivision?.division?.division}</Typography>
                            </Box> */}
                            {
                                asistencia?.motivo ? (
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
                                        <h4>Presente</h4>
                                    ) :
                                        (
                                            asistencia?.ausente ? (
                                                <h4>Ausente</h4>
                                            ) :
                                                (
                                                    asistencia?.ausentejustificado ? (
                                                        <h4>Ausente Justificado</h4>
                                                    ) :
                                                        (
                                                            asistencia?.llegadatarde ? (
                                                                <h4>Llegada Tarde</h4>
                                                            ) :
                                                                (
                                                                    asistencia?.llegadatardejustificada ? (
                                                                        <h4>llegada Tarde Justificada</h4>
                                                                    ) :
                                                                        (
                                                                            asistencia?.mediafalta ? (
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
                            </Box>
                            <Box component={'div'} sx={{ marginBottom: 2 }}>
                                <Typography variant={'h5'} sx={{ fontWeight: 500 }}>Creado el: </Typography>
                                <Typography variant={'body1'} sx={{ fontSize: 18 }}>{asistencia?.creadoen}</Typography>
                            </Box>
                            <Divider sx={{ width: '100%', marginBottom: 2 }} />
                            {
                                asistencia?.actualizadoen ? (
                                    <Box component='div' sx={{ marginBottom: 2 }}>
                                        <Typography variant='h5' sx={{ fontWeight: 500 }}>Actualizado el:</Typography>
                                        <Typography variant={'body1'} sx={{ fontSize: 18 }}>{asistencia?.actualizadoen}</Typography>
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
                            <Typography variant='body1' sx={{ fontSize: 18 }}>{asistencia?.motivo || 'N/A'}</Typography>
                        </Box>
                    </div>
                )
            }
            {
                cargando && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Loading size={80} />
                    </Container>
                )
            }
        </Layout >
    )
}

export default MasInfo