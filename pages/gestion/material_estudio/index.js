import { useEffect, useState } from 'react'
import { CircularProgress } from "@mui/material";

import { Layout } from "../../../components/layout";
import { Box, Button, Stack, IconButton, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DownloadIcon from '@mui/icons-material/Download';

import axios from 'axios';
import { useAuth } from '../../../components/context/authUserProvider';
import { useRouter } from 'next/router';
import { guardarImagen, traerImagen } from '../../../servicios/portada';

const MaterialEstudio = () => {
    const [idCurso, setIdCurso] = useState('');
    const [materias, setMaterias] = useState()
    const [cursos, setCursos] = useState()
    const handleCurso = (e) => {
        setIdCurso(e.target.value);
    };

    const { loading, authUser } = useAuth()
    const [idMateria, setIdMateria] = useState('');
    const [docs1erTrimestre, setDocs1erTrimestre] = useState(null)
    const [docs2doTrimestre, setDocs2doTrimestre] = useState(null)
    const [docs3erTrimestre, setDocs3erTrimestre] = useState(null)
    const [trimestres, setTrimestres] = useState()
    const [usuario, setUsuario] = useState({ id: '' })
    const [subiendoT1, setSubiendoT1] = useState(false)
    const [subiendoT2, setSubiendoT2] = useState(false)
    const [subiendoT3, setSubiendoT3] = useState(false)

    const handleMateria = (e) => {
        setIdMateria(e.target.value);
    };
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.data) {
            setMaterias(res.data)
        }
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerTrimestres = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`)
        if (res.data) {
            setTrimestres(res.data)
        }
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const handleDocs1erTrimestre = (e) => {
        setDocs1erTrimestre(e.currentTarget.files)
    }
    const handleDocs2doTrimestre = (e) => {
        setDocs2doTrimestre(e.currentTarget.files)
    }
    const handleDocs3erTrimestre = (e) => {
        setDocs3erTrimestre(e.currentTarget.files)
    }

    const guardarMaterial = () => {
        // console.log("Id Curso", idCurso);
        // console.log("Id Materia", idMateria);
        // console.log("Material 1er Trimestre", docs1erTrimestre);
        // console.log("Material 2do Trimestre", docs2doTrimestre);
        // console.log("Material 3er Trimestre", docs3erTrimestre);
        if (docs1erTrimestre) {
            setSubiendoT1(true)
            for (let i = 0; i < docs1erTrimestre?.length; i++) {
                const doc = docs1erTrimestre[i];
                guardarImagen(`materialEstudio/${idMateria}/${trimestres[0]?.trimestre}/${doc.name}`, doc)
                    .then(result => {
                        traerImagen(`materialEstudio/${idMateria}/${trimestres[0]?.trimestre}/${doc.name}`)
                            .then(async (url) => {
                                const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                                    titulo: doc.name,
                                    url: url,
                                    idCurso: idCurso,
                                    idMateria: idMateria,
                                    idTrimestre: trimestres[0]?.id,
                                    idUsuario: usuario.id,
                                    fecha: new Date().toISOString().split('T')[0]
                                })
                                if (res.data && i === 2) {
                                    setSubiendoT1(false)
                                    setDocs1erTrimestre(null)
                                }
                            })
                    })
            }
        }
        if (docs2doTrimestre) {
            setSubiendoT2(true)
            for (let i = 0; i < docs2doTrimestre?.length; i++) {
                const doc = docs2doTrimestre[i];
                guardarImagen(`materialEstudio/${idMateria}/${trimestres[1]?.trimestre}/${doc.name}`, doc)
                    .then(result => {
                        traerImagen(`materialEstudio/${idMateria}/${trimestres[1]?.trimestre}/${doc.name}`)
                            .then(async (url) => {
                                const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                                    titulo: doc.name,
                                    url: url,
                                    idCurso: idCurso,
                                    idMateria: idMateria,
                                    idTrimestre: trimestres[1]?.id,
                                    idUsuario: usuario.id,
                                    fecha: new Date().toISOString().split('T')[0]
                                })
                                if (res.data && i === 2) {
                                    setSubiendoT2(false)
                                    setDocs2doTrimestre(null)
                                }
                            })
                    })
            }
        }
        if (docs3erTrimestre) {
            setSubiendoT3(true)
            for (let i = 0; i < docs3erTrimestre?.length; i++) {
                const doc = docs3erTrimestre[i];
                guardarImagen(`materialEstudio/${idMateria}/${trimestres[2]?.trimestre}/${doc.name}`, doc)
                    .then(result => {
                        traerImagen(`materialEstudio/${idMateria}/${trimestres[2]?.trimestre}/${doc.name}`)
                            .then(async (url) => {
                                const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                                    titulo: doc.name,
                                    url: url,
                                    idCurso: idCurso,
                                    idMateria: idMateria,
                                    idTrimestre: trimestres[2]?.id,
                                    idUsuario: usuario.id,
                                    fecha: new Date().toISOString().split('T')[0]
                                })
                                if (res.data && i === 2) {
                                    setSubiendoT3(false)
                                    setDocs3erTrimestre(null)
                                }
                            })
                    })
            }
        }
    }

    const router = useRouter()
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerCursos()
        traerMaterias()
        traerTrimestres()
    }, [loading, authUser, usuario.id])

    return (
        <Layout>
            <Typography variant='h3' sx={{ mb: 2 }}>Material de Estudio</Typography>
            <div>
                <Box sx={{ marginBottom: '20px' }}>
                    <FormControl sx={{ width: '100px' }}>
                        <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                        <Select
                            direction='row'
                            // PONER LA LISTA EN HORIZONTAL 
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'center',
                                    horizontal: 'right',
                                },
                                transformOrigin: {
                                    vertical: 'center',
                                    horizontal: 'left',
                                },

                            }}
                            IconComponent={ArrowRightIcon}
                            name='idCurso'
                            value={idCurso}
                            label="Curso"
                            onChange={handleCurso}
                        >
                            {
                                cursos && cursos?.map((c, i) => (
                                    <MenuItem key={i} value={c.id} sx={{ display: "inline-block" }}>
                                        {c.curso?.nombre} {c.division?.division}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl sx={{ width: '150px' }}>
                        <InputLabel id="demo-simple-select-label">Materia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='idMateria'
                            value={idMateria}
                            label="Materia"
                            onChange={handleMateria}
                        >
                            {
                                materias && materias?.map((m, i) => (
                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs >
                            <h3>Primer Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden name='docs1erTrimestre' onChange={handleDocs1erTrimestre}
                                        accept=".pdf,.xlsx,.pptx,.docx"
                                        multiple type="file" />
                                </Button>
                                {
                                    !subiendoT1 && (
                                        <IconButton spacing={4} color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                    )
                                }
                                {
                                    subiendoT1 && (
                                        <CircularProgress sx={{ margin: 'auto' }} size={30} color="primary" />
                                    )
                                }
                            </Stack>
                            {/* <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack> */}
                        </Grid>
                        <Grid item xs>
                            <h3>Segundo Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden name='docs2doTrimestre' onChange={handleDocs2doTrimestre}
                                        accept=".pdf,.xlsx,.pptx,.docx"
                                        multiple type="file" />
                                </Button>
                                {
                                    !subiendoT2 && (
                                        <IconButton spacing={4} color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                    )
                                }
                                {
                                    subiendoT2 && (
                                        <CircularProgress sx={{ margin: 'auto' }} size={30} color="primary" />
                                    )
                                }
                            </Stack>
                            {/* <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack> */}

                        </Grid>
                        <Grid item xs >
                            <h3>Tercer Trimestre</h3>

                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden name='docs3erTrimestre'
                                        onChange={handleDocs3erTrimestre}
                                        accept=".pdf,.xlsx,.pptx,.docx"
                                        multiple type="file" />
                                </Button>
                                {
                                    !subiendoT3 && (
                                        <IconButton spacing={4} color="primary">
                                            <DownloadIcon />
                                        </IconButton>
                                    )
                                }
                                {
                                    subiendoT3 && (
                                        <CircularProgress sx={{ margin: 'auto' }} size={30} color="primary" />
                                    )
                                }
                            </Stack>
                            {/* <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack>
                            <Stack direction="row" mt={2} sx={{ minWidth: '200px' }}>
                                <Button variant='outlined' component="label"
                                    sx={{ width: '180px' }}
                                    spacing={4}
                                >
                                    Subir apunte
                                    <input hidden accept=".pdf,.xlsx,.pptx,.docx" multiple type="file" />
                                </Button>
                                <IconButton spacing={4} color="primary">
                                    <DownloadIcon />
                                </IconButton>
                            </Stack> */}
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={2}>
                    <Button variant="contained" onClick={guardarMaterial} color="primary">
                        Guardar
                    </Button>
                </Box>
            </div>
        </Layout >
    )
}

export default MaterialEstudio