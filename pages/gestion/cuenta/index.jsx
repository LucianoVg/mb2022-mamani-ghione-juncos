import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Typography, Divider, Stack, MenuItem, Grid, TextField, FormControl, InputLabel, Select, OutlinedInput, Button, Alert, Box } from "@mui/material";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Loading from '../../../components/loading';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Detalles() {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [usuario, setUsuario] = useState()
    const [enfermedades, setEnfermedades] = useState([])
    const [selectedEnf, setSelectedEnf] = useState([])
    const [alergias, setAlergias] = useState('')
    const [alumno, setAlumno] = useState()
    const [docente, setDocente] = useState()
    const [respuesta, setRespuesta] = useState({ status: 0, mensaje: '' })
    const [guardando, setGuardando] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [mensaje, setMensaje] = useState("")
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerAlumno()
        traerDocente()
        // traerEnfermedades()
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
    const traerDocente = async () => {
        if (usuario) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/${usuario?.id}`)
            if (res.data) {
                setDocente(res.data)
            }
        }
    }
    const traerAlumno = async () => {
        if (usuario) {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario?.id}`)
            console.log(res.data);
            if (res.data) {
                console.log(res.data);
                setAlumno(res.data)
            }
        }
    }
    const traerUsuario = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        console.log(res.data);
        if (res.data) {
            setUsuario(res.data)
        }
        setCargando(false)
    }
    // const traerEnfermedades = async () => {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/enfermedades/${usuario?.id}`)
    //     if (res.status === 200) {
    //         setEnfermedades(res.data)
    //         console.log(res.data)
    //     }
    // }
    const updateProfile = async () => {
        console.log(selectedEnf, alergias);
        console.log(usuario);

        let campos = {}
        if (selectedEnf.length) {
            campos = {
                ...campos,
                enfermedades: selectedEnf
            }
        }
        if (alergias) {
            campos = {
                ...campos,
                alergias: alergias
            }
        }
        if (newPassword) {
            if (usuario?.password === confirmPassword) {
                setMensaje("Contraseña invalida")
            }
            campos = {
                ...campos,
                password: newPassword
            }
        }
        console.log(campos);
        // setGuardando(true)
        // const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios/update/${usuario?.id}`, campos)
        // setGuardando(false)
        // setRespuesta({
        //     ...respuesta,
        //     status: res.status,
        //     mensaje: res.data?.mensaje
        // })
        // setTimeout(() => {
        //     setRespuesta({
        //         ...respuesta,
        //         status: 0,
        //         mensaje: ''
        //     })
        // }, 2000);

    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12}>
                    <Button variant="outlined" sx={{ border: "none", marginLeft: "-20px" }}
                        className="buttonRegresar"
                        href="/"
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Regresar
                    </Button>
                </Grid>
            </Grid>
            {
                !cargando && (

                    <Container sx={{marginLeft: "20px"}}>

                        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                            <strong>
                                Datos Personales
                            </strong>
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >

                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Nombre</strong> <br />
                                {usuario?.nombre}
                            </Typography>


                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Apellido</strong> <br />
                                {usuario?.apellido}
                            </Typography>
                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Legajo</strong> <br />
                                {usuario?.legajo}
                            </Typography>

                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >

                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Localidad</strong> <br />
                                {usuario?.localidad}
                            </Typography>
                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Direccion</strong> <br />
                                {usuario?.direccion}
                            </Typography>
                            <Typography variant="h6" sx={{ width: '150px' }} >
                                <strong>Telefono</strong> <br />
                                {usuario?.telefono}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2, md: 23 }}
                            sx={{ marginBottom: '30px' }}
                        >
                            <Typography variant="h6" sx={{ width: '200px' }} >
                                <strong>Edad</strong> <br />
                                {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechanacimiento).getFullYear()) : 'N/A'}
                            </Typography>
                            <Typography variant="h6" sx={{ width: '250px' }} >
                                <strong>Fecha de Nacimiento</strong> <br />
                                {usuario?.fechanacimiento || 'N/A'}
                            </Typography>

                        </Stack>
                        <Divider sx={{ marginTop: '20px' }}></Divider>
                        <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                            <strong>
                                Datos de Usuario
                            </strong>
                        </Typography>
                        {
                            !editMode && (
                                <Button
                                    style={{ height: "40px", width: "220px", marginBottom: "15px" }}
                                    variant="contained"
                                    onClick={() => setEditMode(!editMode)}>

                                    Editar Info

                                </Button>
                            )
                        }
                        {
                            editMode ? (
                                <Box>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2 }}
                                        sx={{ marginBottom: '15px' }}
                                    >
                                        <Button disabled={guardando} variant="contained" onClick={updateProfile} sx={{ height: "40px", width: "220px" }}>
                                            {
                                                guardando && (
                                                    <Loading size={10} />
                                                )
                                            }
                                            {
                                                !guardando && <span>Actualizar Perfil</span>
                                            }
                                        </Button>
                                        <Button
                                            style={{ height: "40px", width: "220px" }}
                                            variant="contained"
                                            color="error"
                                            onClick={() => setEditMode(!editMode)}>
                                            <span>Cancelar</span>
                                        </Button>
                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >

                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Correo</strong> <br />
                                            {usuario?.correo}
                                        </Typography>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Contraseña Actual</strong> <br />
                                            </Typography>
                                            <TextField error={mensaje.length > 0} name="confirmPassword" value={confirmPassword} style={{ marginBottom: "15px", width: "220px" }}
                                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                            />
                                            {
                                                mensaje.length > 0 && <Alert color="error">{mensaje}</Alert>
                                            }

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Contraseña Nueva</strong> <br />
                                            </Typography>
                                            <TextField
                                                value={newPassword}
                                                type="newPassword"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                style={{ marginBottom: "15px", width: "220px" }}
                                            />
                                        </FormControl>
                                    </Stack>
                                </Box>

                            ) : (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 2, sm: 2, md: 23 }}
                                    sx={{ marginBottom: '30px' }}
                                >
                                    <Typography variant="h6" sx={{ width: '200px' }} >
                                        <strong>Correo</strong> <br />
                                        {usuario?.correo}
                                    </Typography>
                                    <FormControl>
                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Contraseña</strong> <br />
                                        </Typography>
                                        <TextField
                                            value="12341342342141321312"
                                            type="password"
                                            disabled
                                        />
                                    </FormControl>
                                </Stack>


                            )
                        }

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 2, sm: 2 }}
                        >

                        </Stack>
                        <Divider sx={{ marginTop: '20px' }}></Divider>
                        {
                            docente && (
                                <Typography variant="h6" sx={{ width: '250px' }} >
                                    <strong>Materia/s Impartidas</strong> <br />
                                    {
                                        docente?.materia?.map(m => (
                                            <span key={m.id}>{m.nombre}</span>
                                        ))
                                    }
                                </Typography>
                            )
                        }
                        {/* <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                            <strong>
                                Datos de salud
                            </strong>
                        </Typography>

                        {
                            editMode ? (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 2, sm: 2 }}
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
                                            {enfermedades.length > 0 && enfermedades?.map((enf) => (
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


                                </Stack>

                            ) : (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 2, sm: 2, md: 23 }}
                                    sx={{ marginBottom: '30px' }}
                                >


                                    {
                                        !usuario?.enfermedadesxusuario ? (
                                            <Typography variant="h5">
                                                <strong>Enfermedades:</strong> <br />
                                                No tiene enfermedad/es
                                            </Typography>
                                        ) : (
                                            <Box>
                                                <Typography variant="h5">
                                                    <strong>Enfermedades:</strong>
                                                </Typography>
                                                <ul>
                                                    {
                                                        usuario?.enfermedadesxusuario.length > 0 && usuario?.enfermedadesxusuario.map((e) => (
                                                            <li key={e.id}>{e.enfemedad?.descripcion}</li>
                                                        ))
                                                    }

                                                </ul>
                                            </Box>
                                        )
                                    }

                                    {
                                        !usuario?.alergias ? (
                                            <Typography variant="h5">
                                                <strong>Alergias:</strong> <br />
                                                No tiene alergia/s
                                            </Typography>
                                        ) : (
                                            <Typography variant="h5">
                                                <strong>Alergias:</strong> <br />
                                                {usuario?.alergias}
                                            </Typography>
                                        )
                                    }

                                </Stack>

                            )

                        } */}

                        {
                            alumno && (
                                <>
                                    <Divider sx={{ marginTop: '20px' }}></Divider>

                                    <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                                        <strong>
                                            Datos del Tutor
                                        </strong>
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h6" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Nombre</strong> <br />
                                            {alumno?.tutor?.nombre || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Apellido</strong> <br />
                                            {alumno?.tutor?.apellido || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Legajo</strong> <br />
                                            {alumno?.tutor?.legajo || 'N/A'}
                                        </Typography>
                                    </Stack>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h6" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Mail</strong> <br />
                                            {alumno?.tutor?.correo || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px', marginBottom: '20px' }} >
                                            <strong>Telefono</strong> <br />
                                            {alumno?.tutor?.telefono || 'N/A'}
                                        </Typography>
                                    </Stack>


                                    <Divider sx={{ marginTop: '20px' }}></Divider>

                                    <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                                        <strong>
                                            Datos de Matriculacion
                                        </strong>
                                    </Typography>

                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                    >
                                        <Typography variant="h6" sx={{ width: '250px' }} >
                                            <strong>Año de Matriculacion</strong> <br />
                                            {alumno?.fechamatriculacion || 'N/A'}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '250px' }} >
                                            <strong>Curso</strong> <br />
                                            {`${alumno?.cursoxdivision?.curso?.nombre} ${alumno?.cursoxdivision?.division?.division}` || 'N/A'}
                                        </Typography>
                                    </Stack>

                                </>
                            )
                        }
                    </Container>
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