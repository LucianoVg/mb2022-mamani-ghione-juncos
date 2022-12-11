import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from '../../../components/loading';

export default function NuevoUsuario() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme()
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    function getStyles(materia, materias = []) {
        return {
            fontWeight:
                materias.findIndex(m => m.id === materia.id) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const router = useRouter()
    const [roles, setRoles] = useState([])
    const [usuario, setUsuario] = useState({
        nombre: '', apellido: '', legajo: '',
        correo: '', localidad: '', telefono: '', idRol: 0,
        direccion: '', contrasenia: '', idTutor: 0, sexo: 'M', idCurso: 0
    })
    const [cursos, setCursos] = useState()
    const [materias, setMaterias] = useState([])
    const [idMaterias, setIdMaterias] = useState([])
    const [tutor, setTutor] = useState({
        id: 0, nombre: '', apellido: '', legajo: '',
        correo: '', localidad: '', telefono: '', idRol: roles?.find(r => r.tipo === 'Tutor')?.id,
        direccion: '', contrasenia: '', sexo: 'M'
    })
    const [curso, setCurso] = useState(0)
    const [rol, setRol] = useState(0)
    const [usuarioLogeado, setUsuarioLogueado] = useState({ id: 0, rol: '' })
    const [mensaje, setMensaje] = useState("")
    const [esAlumno, setEsAlumno] = useState(false)
    const [esDocente, setEsDocente] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const { loading, authUser } = useAuth()
    const [buscando, setBuscando] = useState(false)

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        if (usuarioLogeado.rol) {
            if (!tienePermisos()) {
                router.push('/error')
            } else {
                traerRoles()
                traerCursos()
                traerMaterias()
            }
        }
    }, [authUser, loading, usuarioLogeado.id, usuarioLogeado.rol])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuarioLogueado({ ...usuarioLogeado, id: Number(res.data?.id), rol: res.data?.rol?.tipo })
        }
    }
    const tienePermisos = () => {
        return usuarioLogeado.rol === 'Administrador'
            || usuarioLogeado.rol === 'Secretario'
    }
    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data)
        }
    }
    const traerRoles = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/roles`)
        if (res.status === 200) {
            console.log(res.data);
            setRoles(res.data)
        }
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.status === 200) {
            setMaterias(res.data?.map(d => ({ id: d.id, nombre: d.nombre })))
        }
    }
    const handleTutor = (e) => {
        setTutor({ ...tutor, [e.target.name]: e.target.value })
    }
    const handleForm = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleRol = (e) => {
        setRol(e.target.value)
        setEsAlumno(Number(e.target.value) === roles?.find(r => r.tipo === 'Estudiante')?.id)
        setEsDocente(Number(e.target.value) === roles?.find(r => r.tipo === 'Docente')?.id)
    }

    const handleCurso = (e) => {
        setCurso(Number(e.target.value))
    }
    const handleMaterias = (event) => {
        const {
            target: { value },
        } = event;

        setIdMaterias(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const existeUsuario = async (legajo, correo) => {
        setBuscando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios?legajo=${legajo}&correo=${correo}`)
        setBuscando(false)

        if (res.data.length) {
            setMensaje('Ya existen usuarios con esa informacion (correo/legajo) 😡')
            return true
        }
        return false
    }
    const registrarUsuario = async (e) => {
        e.preventDefault()

        const existe = await existeUsuario(usuario.legajo, usuario.correo)
        if (!existe) {
            console.log(idMaterias);
            usuario.idRol = rol
            setGuardando(true)

            let data = {
                login: usuario.correo.split('@')[0],
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                legajo: usuario.legajo,
                telefono: usuario.telefono,
                correo: usuario.correo,
                direccion: usuario.direccion,
                localidad: usuario.localidad,
                idRol: usuario.idRol,
                idCurso: usuario.idCurso,
                idTutor: usuario.idTutor,
                sexo: usuario.sexo,
                contrasenia: usuario.contrasenia,
                esAlumno: esAlumno,
                esDocente: esDocente,
                idUsuario: usuarioLogeado.id,
                idMaterias: idMaterias
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`, data)
            setGuardando(false)
            if (res.status === 200) {
                setMensaje('Usuario registrado! 😅🎉')
                setTimeout(() => {
                    router.push('/gestion/usuarios/mantenimiento_usuario')
                }, 2000);
                // console.log(res.data);
            } else {
                setMensaje('Algo salió mal 😱📛')
            }
        }
    }
    const registrarTutor = async (e) => {
        e.preventDefault()
        const existe = await existeUsuario(tutor.legajo, tutor.correo)
        if (!existe) {
            axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`, {
                login: tutor.correo.split('@')[0],
                nombre: tutor.nombre,
                apellido: tutor.apellido,
                legajo: tutor.legajo,
                telefono: tutor.telefono,
                correo: tutor.correo,
                direccion: tutor.direccion,
                localidad: tutor.localidad,
                idRol: tutor.idRol,
                sexo: tutor.sexo,
                contrasenia: tutor.contrasenia
            }).then(res => {
                usuario.idTutor = res.data?.id
                console.log(res.data);
            })
        }
    }
    return (
        <Layout>
            <Typography variant="h4">Nuevo Usuario</Typography>
            <Box component={'form'} onSubmit={registrarUsuario}>

                <Box direction='row' >
                    <TextField
                        margin="normal"
                        name="nombre"
                        onChange={handleForm}
                        label="Nombre"
                        value={usuario.nombre}
                        required
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />

                    <TextField
                        margin="normal"
                        name="apellido"
                        onChange={handleForm}
                        label="Apellido"
                        value={usuario.apellido}
                        required />


                </Box>
                <Box direction='row'>

                    <TextField
                        margin="normal"
                        name="correo"
                        onChange={handleForm}
                        label="Correo"
                        type={'email'}
                        value={usuario.correo}
                        required
                        sx={{ marginRight: '20px', marginBottom: '20px', width: '280px' }}
                    />
                    <TextField
                        margin="normal"
                        name="legajo"
                        type="number"
                        onChange={handleForm}
                        label="Legajo"
                        value={usuario.legajo}
                        required
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />
                </Box>

                <Box direction='row'>
                    <TextField
                        margin="normal"
                        name="localidad"
                        onChange={handleForm}
                        label="Localidad"
                        value={usuario.localidad}
                        required
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />


                    <TextField
                        margin="normal"
                        name="telefono"
                        onChange={handleForm}
                        label="Telefono"
                        value={usuario.telefono}
                        type="number"
                        required
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />


                    <TextField
                        margin="normal"
                        name="direccion"
                        onChange={handleForm}
                        label="Direccion"
                        value={usuario.direccion}
                        required
                        sx={{ marginBottom: '20px' }}
                    />
                </Box>
                <Box direction='row'>
                    <FormControl>
                        <InputLabel id="select-label">Sexo</InputLabel>
                        <Select labelId="select-label"
                            name="sexo"
                            label="Sexo"
                            required
                            onChange={handleForm}
                            value={usuario.sexo}
                            sx={{ marginRight: '20px', marginBottom: '20px' }}>
                            <MenuItem value="M">Masculino</MenuItem>
                            <MenuItem value="F">Femenino</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="select-label">Rol</InputLabel>
                        <Select labelId="select-label"
                            name="rol"
                            label="Rol"
                            required
                            onChange={handleRol}
                            value={rol}
                            sx={{ width: '170px', marginRight: '20px', marginBottom: '20px' }}
                        >

                            {
                                roles && roles.map((r, i) => (
                                    <MenuItem key={i} value={r.id}>{r.tipo}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                </Box>
                <Box>

                    <TextField

                        margin="normal"
                        name="contrasenia"
                        onChange={handleForm}
                        label="Contraseña Temporal"
                        value={usuario.contrasenia}
                        type={'password'}
                        required />

                </Box>

                {
                    esAlumno && (
                        <Box>
                            <h3>Seleccionar curso</h3>

                            <FormControl>
                                <InputLabel id="select-label">Curso</InputLabel>
                                <Select
                                    labelId="select-label"
                                    name="curso"
                                    label="Curso"
                                    required
                                    onChange={handleCurso}
                                    value={curso}
                                    sx={{ width: '100px', marginBottom: '10px' }}
                                >

                                    {
                                        cursos && cursos.map((c, i) => (
                                            <MenuItem key={i} value={c.id}>{c.curso?.nombre} {c.division?.division}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>

                    )
                }
                {
                    esDocente && (
                        <Box>
                            <h3>Seleccionar Materias</h3>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-name-label">Materias</InputLabel>
                                <Select
                                    required
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={idMaterias}
                                    onChange={handleMaterias}
                                    input={<OutlinedInput label="Materias" />}
                                    MenuProps={MenuProps}
                                >
                                    {materias.map((materia) => (
                                        <MenuItem
                                            key={materia.id}
                                            value={materia.id}
                                            style={getStyles(materia, materias)}
                                        >
                                            {materia.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )
                }

                <Button disabled={guardando || buscando}
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    type="submit">
                    {
                        !guardando && !buscando && <span>Registrar Usuario</span>
                    }
                    {
                        guardando || buscando && <Loading size={30} />
                    }
                </Button>
            </Box>
            {
                esAlumno && (
                    <>
                        <Typography variant="h5" sx={{ mt: 2 }}>Datos del Tutor</Typography>
                        <Box component={'form'} onSubmit={registrarTutor}>

                            <Box direction='row'>
                                <TextField

                                    margin="normal"
                                    name="nombre"
                                    onChange={handleTutor}
                                    label="Nombre"
                                    value={tutor.nombre}
                                    required
                                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                                />

                                <TextField

                                    margin="normal"
                                    name="apellido"
                                    onChange={handleTutor}
                                    label="Apellido"
                                    value={tutor.apellido}
                                    required />
                            </Box>

                            <Box direction='row'>
                                <TextField
                                    sx={{ width: '280px', marginRight: '20px', marginBottom: '20px' }}
                                    margin="normal"
                                    name="correo"
                                    onChange={handleTutor}
                                    label="Correo"
                                    type={'email'}
                                    value={tutor.correo}
                                    required

                                />

                                <TextField

                                    margin="normal"
                                    name="dni"
                                    onChange={handleTutor}
                                    label="Legajo"
                                    value={tutor.dni}
                                    required />
                            </Box>
                            <Box direction='row'>
                                <TextField
                                    margin="normal"
                                    name="localidad"
                                    onChange={handleTutor}
                                    label="Localidad"
                                    value={tutor.localidad}
                                    required
                                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                                />

                                <TextField

                                    margin="normal"
                                    name="telefono"
                                    onChange={handleTutor}
                                    label="Telefono"
                                    value={tutor.telefono}
                                    type={'tel'}
                                    required
                                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                                />

                                <TextField

                                    margin="normal"
                                    name="direccion"
                                    onChange={handleTutor}
                                    label="Direccion"
                                    value={tutor.direccion}
                                    required
                                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                                />
                            </Box>
                            <Box direction='row'>
                                <FormControl>
                                    <InputLabel id="select-label">Sexo</InputLabel>
                                    <Select labelId="select-label"
                                        name="sexo"
                                        label="Sexo"
                                        required
                                        onChange={handleTutor}
                                        value={tutor.sexo}
                                        sx={{ marginRight: '20px', marginBottom: '10px' }}
                                    >

                                        <MenuItem value="M">Masculino</MenuItem>
                                        <MenuItem value="F">Femenino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <TextField

                                    margin="normal"
                                    name="contrasenia"
                                    onChange={handleTutor}
                                    label="Contraseña Temporal"
                                    value={tutor.contrasenia}
                                    type={'password'}
                                    required
                                    sx={{ marginRight: '20px', marginBottom: '20px' }}
                                />

                            </Box>
                            <Box>
                                <Button disabled={guardando || buscando} sx={{ mt: 2 }} variant="contained" color="primary" type="submit">
                                    {
                                        guardando || buscando && <Loading size={30} />
                                    }
                                    {
                                        !guardando && !buscando && <span>Registrar Tutor</span>
                                    }
                                </Button>
                            </Box>
                        </Box>
                    </>
                )
            }
            {
                mensaje.length > 0 && (
                    <Alert sx={{ mt: 1 }} color={mensaje === 'Usuario registrado! 😅🎉' ? 'success' : 'error'}>
                        {mensaje}
                    </Alert>
                )
            }
        </Layout >
    )
}