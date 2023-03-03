import { useEffect, useState } from 'react'
import { Alert, CircularProgress } from "@mui/material";

import { Layout } from "../../../components/layout";
import { Box, Button, Stack, IconButton, FormControl, ListSubheader, Item, TableContainer, TableRow, TableHead, Table, TableBody, TableCell, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';
import { useAuth } from '../../../components/context/authUserProvider';
import { useRouter } from 'next/router';
import { guardarImagen, traerImagen } from "../../api/servicios/portada";
import { Container } from '@mui/system';
import { Upload } from '@mui/icons-material';
import Loading from '../../../components/loading';

const MaterialEstudio = () => {
    const [idCurso, setIdCurso] = useState(0);
    const [materias, setMaterias] = useState()
    const [cursos, setCursos] = useState()
    const handleCurso = (e) => {
        setIdCurso(Number(e.target.value));
    };

    const { loading, authUser } = useAuth()
    const [idMateria, setIdMateria] = useState('');
    const [docs1erTrimestre, setDocs1erTrimestre] = useState(null)
    const [docs2doTrimestre, setDocs2doTrimestre] = useState(null)
    const [docs3erTrimestre, setDocs3erTrimestre] = useState(null)
    const [trimestres, setTrimestres] = useState()
    const [usuario, setUsuario] = useState({ id: 0, rol: '' })
    const [subiendoT1, setSubiendoT1] = useState(false)
    const [subiendoT2, setSubiendoT2] = useState(false)
    const [subiendoT3, setSubiendoT3] = useState(false)
    const [bajandoT1, setBajandoT1] = useState(false)
    const [bajandoT2, setBajandoT2] = useState(false)
    const [bajandoT3, setBajandoT3] = useState(false)
    const [t1SubidoMsg, setT1SubidoMsg] = useState("")
    const [t2SubidoMsg, setT2SubidoMsg] = useState("")
    const [t3SubidoMsg, setT3SubidoMsg] = useState("")
    const [materialEstudio, setMaterialEstudio] = useState()
    const [alumno, setAlumno] = useState()
    const [mensaje, setMensaje] = useState("")
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
            setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
        }
    }
    const traerAlumno = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario.id}`)
        if (res.status === 200) {
            setAlumno(res.data)
        }
    }
    const handleDocs1erTrimestre = (e) => {
        console.log(e.currentTarget.files);
        setDocs1erTrimestre(e.currentTarget.files)
    }
    const handleDocs2doTrimestre = (e) => {
        setDocs2doTrimestre(e.currentTarget.files)
    }
    const handleDocs3erTrimestre = (e) => {
        setDocs3erTrimestre(e.currentTarget.files)
    }

    const guardarMaterial = async () => {
        // console.log("Id Curso", idCurso);
        // console.log("Id Materia", idMateria);
        // console.log("Material 1er Trimestre", docs1erTrimestre);
        // console.log("Material 2do Trimestre", docs2doTrimestre);
        // console.log("Material 3er Trimestre", docs3erTrimestre);
        if (docs1erTrimestre) {
            setSubiendoT1(true)
            for (let i = 0; i < docs1erTrimestre?.length; i++) {
                const doc = docs1erTrimestre[i];
                await guardarImagen(`materialEstudio/${idMateria}/${trimestres[0]?.trimestre}/${doc.name}`, doc)
                const url = await traerImagen(`materialEstudio/${idMateria}/${trimestres[0]?.trimestre}/${doc.name}`)
                if (url.length) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                        titulo: doc.name,
                        url: url,
                        idCurso: idCurso,
                        idMateria: idMateria,
                        idTrimestre: trimestres[0]?.id,
                        idUsuario: usuario.id,
                        fecha: new Date().toISOString().split('T')[0]
                    })
                    if (res.data && i === docs1erTrimestre.length - 1) {
                        setT1SubidoMsg("Material 1 Subido!")
                        setTimeout(() => {
                            setT1SubidoMsg("")
                        }, 2000);
                        setDocs1erTrimestre(null)
                    }
                }
            }
            setSubiendoT1(false)
        }
        if (docs2doTrimestre) {
            setSubiendoT2(true)
            for (let i = 0; i < docs2doTrimestre?.length; i++) {
                const doc = docs2doTrimestre[i];
                const result = await guardarImagen(`materialEstudio/${idMateria}/${trimestres[1]?.trimestre}/${doc.name}`, doc)
                const url = await traerImagen(`materialEstudio/${idMateria}/${trimestres[1]?.trimestre}/${doc.name}`)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                    titulo: doc.name,
                    url: url,
                    idCurso: idCurso,
                    idMateria: idMateria,
                    idTrimestre: trimestres[1]?.id,
                    idUsuario: usuario.id,
                    fecha: new Date().toISOString().split('T')[0]
                })
                if (res.data && i === docs2doTrimestre.length - 1) {
                    setT2SubidoMsg("Material 2 Subido!")
                    setTimeout(() => {
                        setT2SubidoMsg("")
                    }, 2000);
                    setDocs2doTrimestre(null)
                }
            }
            setSubiendoT2(false)
        }
        if (docs3erTrimestre) {
            setSubiendoT3(true)
            for (let i = 0; i < docs3erTrimestre?.length; i++) {
                const doc = docs3erTrimestre[i];
                await guardarImagen(`materialEstudio/${idMateria}/${trimestres[2]?.trimestre}/${doc.name}`, doc)
                const url = await traerImagen(`materialEstudio/${idMateria}/${trimestres[2]?.trimestre}/${doc.name}`)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`, {
                    titulo: doc.name,
                    url: url,
                    idCurso: idCurso,
                    idMateria: idMateria,
                    idTrimestre: trimestres[2]?.id,
                    idUsuario: usuario.id,
                    fecha: new Date().toISOString().split('T')[0]
                })
                if (res.data && i === docs3erTrimestre.length - 1) {
                    setT3SubidoMsg("Material 3 Subido!")
                    setTimeout(() => {
                        setT3SubidoMsg("")
                    }, 2000);
                    setDocs3erTrimestre(null)
                }
            }
            setSubiendoT3(false)
        }
    }
    const descargarMaterial = async (idTrimestre) => {
        switch (idTrimestre) {
            case 1:
                setBajandoT1(true)
                break;
            case 2:
                setBajandoT2(true)
                break;
            case 3:
                setBajandoT3(true)
                break;
        }
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio/${idTrimestre}/${alumno?.cursoxdivision?.id}`)
        console.log(res.data);
        if (res.status === 200) {
            setMaterialEstudio(res.data)
        }
        if (!res.data?.length) {
            setMensaje('No hay material de estudio en este trimestre')
            setTimeout(() => {
                setMensaje('')
            }, 2000);
        }
        switch (idTrimestre) {
            case 1:
                setBajandoT1(false)
                break;
            case 2:
                setBajandoT2(false)
                break;
            case 3:
                setBajandoT3(false)
                break;
        }
    }

    const router = useRouter()
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuario.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerCursos()
                traerMaterias()
                traerTrimestres()
                traerAlumno()
            }
        }
    }, [loading, authUser, usuario.id, usuario.rol])
    const tienePermisos = () => {
        return usuario.rol === 'Administrador'
            || usuario.rol === 'Docente'
            || usuario.rol === 'Estudiante'
    }
    return (
        <Layout>
            <Typography variant='h3' sx={{ mb: 2 }}>Material de Estudio</Typography>
            <div>
                {
                    usuario.rol !== 'Estudiante' && (
                        <>
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
                                            disableScrollLock: true

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
                                <FormControl>
                                    <InputLabel htmlFor="inputMateria">Materia</InputLabel>
                                    <Select id="inputMateria"
                                        onChange={handleMateria}
                                        name="idMateria"
                                        value={idMateria}
                                        label="Materia"
                                        sx={{ width: '260px' }}
                                        MenuProps={{ disableScrollLock: true }}
                                    >
                                        <ListSubheader>Primero</ListSubheader>
                                        {

                                            materias && materias?.map((m, i) => (

                                                m?.idcurso === 1 && (

                                                    <MenuItem selected={i === 1} key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )

                                            ))
                                        }
                                        <ListSubheader>Segundo</ListSubheader>
                                        {

                                            materias && materias?.map((m, i) => (

                                                m?.idcurso === 2 && (

                                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )

                                            ))
                                        }
                                        <ListSubheader>Tercero</ListSubheader>
                                        {

                                            materias && materias?.map((m, i) => (

                                                m?.idcurso === 3 && (

                                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )
                                            ))
                                        }
                                        <ListSubheader>Cuarto</ListSubheader>
                                        {
                                            materias && materias?.map((m, i) => (

                                                m?.idcurso === 4 && (

                                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )
                                            ))
                                        }
                                        <ListSubheader>Quinto</ListSubheader>
                                        {
                                            materias && materias?.map((m, i) => (
                                                m?.idcurso === 5 && (

                                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )
                                            ))
                                        }
                                        <ListSubheader>Sexto</ListSubheader>
                                        {
                                            materias && materias?.map((m, i) => (
                                                m?.idcurso === 6 && (
                                                    <MenuItem key={i} value={m.id}>{m.nombre}</MenuItem>
                                                )
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </>
                    )
                }
                <Box sx={{ marginTop: "30px" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell colSpan={12}
                                        sx={{
                                            color: 'black',
                                            backgroundColor: 'lightblue',
                                        }}>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',


                                            }}
                                        >
                                            <Button variant="contained" size="small" endIcon={<FileUploadIcon />}>
                                                Subir apunte
                                            </Button>

                                            <Typography variant="h6"   >Primer Trimestre</Typography>
<h1></h1>

                                        </Box>




                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow >
                                    <TableCell variant="head"
                                        sx={{
                                            color: 'black',

                                        }}
                                        colSpan={7}
                                    >
                                        Archivo
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        20/03/23
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        <IconButton aria-label="fingerprint" color="primary"
                                            sx={{ marginRight: "20px" }}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton aria-label="fingerprint" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell variant="head"
                                        sx={{
                                            color: 'black',

                                        }}
                                        colSpan={7}
                                    >
                                        Archivo
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        20/03/23
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        <IconButton aria-label="fingerprint" color="primary"
                                            sx={{ marginRight: "20px" }}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton aria-label="fingerprint" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell variant="head"
                                        sx={{
                                            color: 'black',

                                        }}
                                        colSpan={7}
                                    >
                                        Archivo
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        20/03/23
                                    </TableCell>
                                    <TableCell
                                        sx={{ textAlign: "right" }}
                                    >
                                        <IconButton aria-label="fingerprint" color="primary"
                                            sx={{ marginRight: "20px" }}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton aria-label="fingerprint" color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box >



            </div>
        </Layout >
    )
}

export default MaterialEstudio