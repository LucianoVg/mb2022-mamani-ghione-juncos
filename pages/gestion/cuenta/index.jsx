import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Typography, Grid, Box, Divider, Stack, Item, MenuItem, TextField, Checkbox, FormControl, InputLabel, Select, OutlinedInput, Button, Alert, unstable_createMuiStrictModeTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Container } from "@mui/system";
import Loading from '../../../components/loading';

export default function Detalles() {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [usuario, setUsuario] = useState()
    const [enfermedades, setEnfermedades] = useState()
    const [selectedEnf, setSelectedEnf] = useState([])
    const [alergias, setAlergias] = useState('')
    const [alumno, setAlumno] = useState(null)
    const [docente, setDocente] = useState(null)
    const [respuesta, setRespuesta] = useState({ status: 0, mensaje: '' })
    const [guardando, setGuardando] = useState(false)
    const [cargando, setCargando] = useState(false)
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerAlumno()
        // traerDocente()
        traerEnfermedades()
    }, [loading, authUser])

    const handleEnfermedad = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedEnf(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    // const traerDocente = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/${usuario?.legajo}`)
    //     if (res.status === 200) {
    //         setDocente(res.data)
    //     }
    // }
    const traerAlumno = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario?.legajo}`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumno(res.data)
        }
    }
    const traerUsuario = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario(res.data)
        }
        setCargando(false)
    }
    const traerEnfermedades = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/enfermedades`)
        if (res.data) {
            setEnfermedades(res.data)
        }
    }
    const updateProfile = async () => {
        console.log(selectedEnf, alergias);
        console.log(usuario);
        setGuardando(true)
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios/update/${usuario?.id}`, {
            enfermedades: selectedEnf,
            alergias
        })
        setGuardando(false)
        setRespuesta({
            ...respuesta,
            status: res.status,
            mensaje: res.data?.mensaje
        })
        setTimeout(() => {
            setRespuesta({
                ...respuesta,
                status: 0,
                mensaje: ''
            })
        }, 2000);

    }

    const [password, setPassword] = useState()
    const onSave = async (idUsuario) => {
        // const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/update/${id}`, {
        //     asunto: asunto.length && asunto || notificacion?.asunto,
        //     contenido: contenido.length && contenido || notificacion?.contenido,
        //     idUsuario: notificacion.usuario?.id,
        // })
        onCancel()

    }

    const [inEditMode, setInEditMode] = useState({
        status: false
    });
    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false
        })

    }
    return (
        <Layout>
            {
                !cargando && (
                    <div>
                        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                            <strong>
                                Datos Personales
                            </strong>
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >

                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Nombre</strong> <br />
                                {usuario?.nombre}
                            </Typography>


                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Apellido</strong> <br />
                                {usuario?.apellido}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Legajo</strong> <br />
                                {usuario?.legajo}
                            </Typography>

                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >
                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Mail</strong> <br />
                                {usuario?.correo}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Localidad</strong> <br />
                                {usuario?.localidad}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '400px' }} >
                                <strong>Direccion</strong> <br />
                                {usuario?.direccion}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '150px' }} >
                                <strong>Telefono</strong> <br />
                                {usuario?.telefono}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >
                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Edad</strong> <br />
                                {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechanacimiento).getFullYear()) : 'N/A'}
                            </Typography>
                            <Typography variant="h5" sx={{ width: '250px' }} >
                                <strong>Fecha de Nacimiento</strong> <br />
                                {usuario?.fechanacimiento || 'N/A'}
                            </Typography>

                        </Stack>
                        <Divider sx={{ marginTop: '20px' }}></Divider>
                        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                            <strong>
                                Datos de Usuario
                            </strong>
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >

                            <Typography variant="h5" sx={{ width: '200px' }} >
                                <strong>Correo</strong> <br />
                                {usuario?.correo}
                            </Typography>

                            {
                                inEditMode.status === true ? (

                                    <FormControl>
                                        <Typography variant="h5" sx={{ width: '200px' }} >
                                            <strong>Contraseña</strong> <br />
                                        </Typography>
                                        <TextField value={password} style={{ marginBottom: "15px" }} />
                                        <Button disabled={guardando} variant="contained" onClick={(e) => onSave(usuario?.id)}>
                                            {
                                                guardando && (
                                                    <Loading size={30} />
                                                )
                                            }
                                            {
                                                !guardando && <span>Actualizar contraseña</span>
                                            }
                                        </Button>
                                        <Button disabled={guardando} variant="contained" color="error" onClick={onCancel()}>
                                            Cancelar
                                        </Button>
                                    </FormControl>



                                ) : (

                                    <FormControl>
                                        <Typography variant="h5" sx={{ width: '200px' }} >
                                            <strong>Contraseña</strong> <br />
                                        </Typography>
                                        <TextField disabled value={usuario?.password}
                                            type="password"
                                            style={{ marginBottom: "15px" }}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setInEditMode({
                                                    status: true
                                                })
                                                setPassword(usuario?.password)

                                            }
                                            }
                                        >
                                            Cambiar contraseña
                                        </Button>
                                    </FormControl>

                                )
                            }

                        </Stack>
                        <Divider sx={{ marginTop: '20px' }}></Divider>
                        {
                            docente && (
                                <Typography variant="h5" sx={{ width: '250px' }} >
                                    <strong>Materia/s Impartidas</strong> <br />
                                    {
                                        docente?.materia?.map(m => (
                                            <span key={m.id}>{m.nombre}</span>
                                        ))
                                    }
                                </Typography>
                            )
                        }
                        <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                            <strong>
                                Datos de salud
                            </strong>
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >
                            <Typography variant="h5"><strong>Alergias:</strong> {usuario?.alergias}</Typography>
                            <Typography variant="h5"><strong>Enfermedades:</strong></Typography>

                        </Stack>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 10 }}
                        >

                            <FormControl >
                                <InputLabel id="demo-multiple-name-label">Tienes alguna enfermedad?</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={selectedEnf}
                                    onChange={handleEnfermedad}
                                    input={<OutlinedInput label="Enfermedad" />}
                                    style={{ minWidth: "250px" }}>
                                    {enfermedades?.map((enf) => (
                                        <MenuItem
                                            key={enf.id}
                                            value={enf.descripcion}>
                                            {enf.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField label="Tienes alguna alergia?" multiline value={alergias} onChange={(e) => { setAlergias(e.target.value) }} />
                            </FormControl>
                            <Button disabled={guardando} variant="contained" onClick={updateProfile}>
                                {
                                    guardando && (
                                        <Loading size={30} />
                                    )
                                }
                                {
                                    !guardando && <span>Actualizar Perfil</span>
                                }
                            </Button>
                        </Stack>
                        {
                            !guardando && respuesta.mensaje && (
                                <Alert sx={{ mt: 2 }} color={respuesta.status === 200 ? 'success' : 'error'}>
                                    {respuesta.mensaje}
                                </Alert>
                            )
                        }
                        {
                            alumno && (
                                <>
                                    <Divider sx={{ marginTop: '20px' }}></Divider>

                                    <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                                        <strong>
                                            Datos del Tutor
                                        </strong>
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Nombre</strong> <br />
                                            {alumno?.tutor?.nombre || 'N/A'}
                                        </Typography>
                                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Apellido</strong> <br />
                                            {alumno?.tutor?.apellido || 'N/A'}
                                        </Typography>
                                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Dni</strong> <br />
                                            {alumno?.tutor?.legajo || 'N/A'}
                                        </Typography>
                                    </Stack>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Mail</strong> <br />
                                            {alumno?.tutor?.correo || 'N/A'}
                                        </Typography>
                                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Telefono</strong> <br />
                                            {alumno?.tutor?.telefono || 'N/A'}
                                        </Typography>
                                    </Stack>


                                    <Divider sx={{ marginTop: '20px' }}></Divider>

                                    <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                                        <strong>
                                            Datos de Matriculacion
                                        </strong>
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h5" sx={{ width: '250px' }} >
                                            <strong>Año de Matriculacion</strong> <br />
                                            {alumno?.fechamatriculacion || 'N/A'}
                                        </Typography>
                                        <Typography variant="h5" sx={{ width: '250px' }} >
                                            <strong>Curso</strong> <br />
                                            {`${alumno?.cursoxdivision?.curso?.nombre} ${alumno?.cursoxdivision?.division?.division}` || 'N/A'}
                                        </Typography>
                                    </Stack>

                                </>
                            )
                        }
                    </div>
                )
            }
            {
                cargando && (
                    <Container sx={{ maxWidth: 'fit-content', textAlign: 'center' }}>
                        <Loading size={80} />
                    </Container>
                )
            }
        </Layout >
    )
}