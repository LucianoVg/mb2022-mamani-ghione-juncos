import { Alert, Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";

export default function NuevoUsuario() {
    const router = useRouter()
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: '',
        direccion: '', contrasenia: '', idTutor: '', sexo: 'M', idCurso: ''
    })
    const [cursos, setCursos] = useState()
    const [tutor, setTutor] = useState({
        id: '', nombre: '', apellido: '', dni: '',
        correo: '', localidad: '', telefono: '', idRol: roles?.find(r => r.tipo === 'Tutor')?.id,
        direccion: '', contrasenia: '', sexo: 'M'
    })
    const [curso, setCurso] = useState('')
    const [rol, setRol] = useState('')

    const [mensaje, setMensaje] = useState("")
    const [esAlumno, setEsAlumno] = useState(false)
    const [roles, setRoles] = useState([{ id: '', tipo: '' }])
    const { loading, authUser } = useAuth()

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_CLIENT_URL);
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/roles`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setRoles(res.data)
                }
            })
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
            .then(res => {
                if (res.data) {
                    setCursos(res.data)
                }
            })
    }, [authUser, loading])

    const handleTutor = (e) => {
        setTutor({ ...tutor, [e.target.name]: e.target.value })
    }
    const handleForm = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleRol = (e) => {
        setRol(e.target.value)
        setEsAlumno(e.target.value === roles?.find(r => r.tipo === 'Estudiante')?.id)
    }
    const handleCurso = (e) => {
        setCurso(e.target.value)
    }

    const registrarUsuario = (e) => {
        e.preventDefault()
        usuario.idRol = rol
        // tutor.nombre !== '' && tutor.apellido !== '' && tutor.correo !== ''
        // && tutor.dni !== '' && tutor.localidad !== '' && tutor.sexo !== ''
        // && tutor.telefono !== '' && tutor.contrasenia !== '' && tutor.idRol !== 0
        // && tutor.direccion !== ''
        if (esAlumno) {
            axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`, {
                login: tutor.correo.split('@')[0],
                nombre: tutor.nombre,
                apellido: tutor.apellido,
                dni: tutor.dni,
                telefono: tutor.telefono,
                correo: tutor.correo,
                direccion: tutor.direccion,
                localidad: tutor.localidad,
                idRol: tutor.idRol,
                sexo: tutor.sexo,
                contrasenia: tutor.contrasenia
            }).then(res => {
                usuario.idTutor = res.data?.id
                usuario.idCurso = curso
                console.log(res.data);
            })
        }

        axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`, {
            login: usuario.correo.split('@')[0],
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            telefono: usuario.telefono,
            correo: usuario.correo,
            direccion: usuario.direccion,
            localidad: usuario.localidad,
            idRol: usuario.idRol,
            idTutor: usuario.idTutor,
            idCurso: usuario.idCurso,
            sexo: usuario.sexo,
            contrasenia: usuario.contrasenia
        }).then(res => {
            if (res.data && res.data.id) {
                setMensaje("Usuario creado!")
                setTimeout(() => {
                    router.push('/gestion/usuarios/mantenimiento_usuario')
                }, 1300);
            }
        })
    }
    return (
        <Layout>
            {
                mensaje !== "" && (
                    <Alert color="success">
                        {mensaje}
                    </Alert>
                )
            }
            <Typography variant="h4">Nuevo Usuario</Typography>
            <Box component={'form'} onSubmit={registrarUsuario}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="nombre"
                            onChange={handleForm}
                            label="Nombre"
                            value={usuario.nombre}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="apellido"
                            onChange={handleForm}
                            label="Apellido"
                            value={usuario.apellido}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="correo"
                            onChange={handleForm}
                            label="Correo"
                            type={'email'}
                            value={usuario.correo}
                            required />
                    </Grid>
                    {
                        esAlumno && (
                            <Grid item xs={4}>
                                <InputLabel id="select-label">Curso</InputLabel>
                                <Select fullWidth labelId="select-label"
                                    name="curso"
                                    label="Curso"
                                    required
                                    onChange={handleCurso}
                                    value={curso}>

                                    {
                                        cursos && cursos.map((c, i) => (
                                            <MenuItem key={i} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        )
                    }
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="dni"
                            onChange={handleForm}
                            label="Legajo"
                            value={usuario.dni}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="localidad"
                            onChange={handleForm}
                            label="Localidad"
                            value={usuario.localidad}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="telefono"
                            onChange={handleForm}
                            label="Telefono"
                            value={usuario.telefono}
                            type={'tel'}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="direccion"
                            onChange={handleForm}
                            label="Direccion"
                            value={usuario.direccion}
                            required />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel id="select-label">Sexo</InputLabel>
                        <Select labelId="select-label"
                            name="sexo"
                            label="Sexo"
                            fullWidth
                            required
                            onChange={handleForm}
                            value={usuario.sexo}>

                            <MenuItem value="M">Masculino</MenuItem>
                            <MenuItem value="F">Femenino</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel id="select-label">Rol</InputLabel>
                        <Select labelId="select-label"
                            name="rol"
                            label="Rol"
                            required
                            onChange={handleRol}
                            fullWidth
                            value={rol}>
                            {
                                roles && roles.map((r, i) => (
                                    <MenuItem key={i} value={r.id}>{r.tipo}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="contrasenia"
                            onChange={handleForm}
                            label="Contraseña Temporal"
                            value={usuario.contrasenia}
                            type={'password'}
                            required />
                    </Grid>
                </Grid>
                <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">Registrar Usuario</Button>
            </Box>
            {
                esAlumno && (
                    <>
                        <Typography variant="h5" sx={{ mt: 2 }}>Datos del Tutor</Typography>
                        <Box component={'form'}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="nombre"
                                        onChange={handleTutor}
                                        label="Nombre"
                                        value={tutor.nombre}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="apellido"
                                        onChange={handleTutor}
                                        label="Apellido"
                                        value={tutor.apellido}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="correo"
                                        onChange={handleTutor}
                                        label="Correo"
                                        type={'email'}
                                        value={tutor.correo}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="dni"
                                        onChange={handleTutor}
                                        label="DNI"
                                        value={tutor.dni}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="localidad"
                                        onChange={handleTutor}
                                        label="Localidad"
                                        value={tutor.localidad}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="telefono"
                                        onChange={handleTutor}
                                        label="Telefono"
                                        value={tutor.telefono}
                                        type={'tel'}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="direccion"
                                        onChange={handleTutor}
                                        label="Direccion"
                                        value={tutor.direccion}
                                        required />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel id="select-label">Sexo</InputLabel>
                                    <Select labelId="select-label"
                                        name="sexo"
                                        label="Sexo"
                                        required
                                        fullWidth
                                        onChange={handleTutor}
                                        value={tutor.sexo}>

                                        <MenuItem value="M">Masculino</MenuItem>
                                        <MenuItem value="F">Femenino</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="contrasenia"
                                        onChange={handleTutor}
                                        label="Contraseña Temporal"
                                        value={tutor.contrasenia}
                                        type={'password'}
                                        required />
                                </Grid>
                            </Grid>
                            <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">Registrar Tutor</Button>
                        </Box>
                    </>
                )
            }
        </Layout >
    )
}