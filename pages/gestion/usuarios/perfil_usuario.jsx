import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Typography, Divider, Stack, MenuItem, Grid, TextField, useTheme, FormControl, InputLabel, Select, OutlinedInput, Button, Alert, Box } from "@mui/material";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Loading from '../../../components/loading';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function Detalles() {
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
        disableScrollLock: true
    };
    function getStyles(materia, materias = []) {
        return {
            fontWeight:
                materias.findIndex(m => m.id === materia.id) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const [cursos, setCursos] = useState()
    const [idCursos, setIdCursos] = useState([])
    const [materias, setMaterias] = useState([])
    const [idMaterias, setIdMaterias] = useState([])

    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [usuarioLogeado, setUsuarioLogueado] = useState()
    const [selectedEnf, setSelectedEnf] = useState([])
    const [fecha, setFecha] = useState(null)

    const [alumno, setAlumno] = useState()
    const [docente, setDocente] = useState()
    const [preceptor, setPreceptor] = useState()


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
        traerCursos()
        traerMaterias()
        // traerAlumno()
        // traerDocente()

    }, [loading, authUser])



    const traerCursos = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
        if (res.data) {
            setCursos(res.data?.map(d => ({ id: d.id, nombre: d.curso?.nombre + d.division?.division })))
            console.log(cursos)
        }
    }
    const traerMaterias = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`)
        if (res.status === 200) {
            setMaterias(res.data?.map(d => ({ id: d.id, nombre: d.nombre })))
        }
    }
    // const traerDocente = async () => {
    //     if (usuario) {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/${usuario?.id}`)
    //         if (res.data) {
    //             setDocente(res.data)
    //         }
    //     }
    // }
    // const traerAlumno = async () => {
    //     if (usuario) {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario?.id}`)
    //         console.log(res.data);
    //         if (res.data) {
    //             console.log(res.data);
    //             setAlumno(res.data)
    //         }
    //     }
    // }
    const traerUsuario = async () => {
        setCargando(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        console.log(res.data);
        if (res.data) {
            setUsuarioLogueado(res.data)
        }
        setCargando(false)
    }

    const handleFecha = (value) => {
        setFecha(new Date(value))
    }


    const handleCursos = (event) => {
        const {
            target: { value },
        } = event;

        setIdCursos(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleMaterias = (event) => {
        const {
            target: { value },
        } = event;

        setIdMaterias(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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

    const [age, setAge] = useState('');

    const handleChange = (e) => {
        setAge(e.target.value);
    };
    return (
        <Layout>
            <Grid container >
                <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                    <Button variant="outlined" sx={{ border: "none", marginLeft: "-20px" }}
                        className="buttonRegresar"
                        href="/"
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Regresar
                    </Button>
                </Grid>

            </Grid>
            <Stack
                direction="row" spacing={2}
                style={{ marginLeft: "30px", marginBottom: "20px" }}
            >
                <Typography variant="h4" >
                    <strong>
                        Detalles del Usuario
                    </strong>
                </Typography>

                {
                    !editMode && (
                        <Button
                            style={{ marginLeft: "40px" }}
                            variant="contained"
                            onClick={() => setEditMode(!editMode)}>

                            Editar

                        </Button>
                    )
                }

                {
                    editMode && (
                        <Stack
                            direction="row" spacing={2}
                            style={{ marginLeft: "40px" }}
                        >
                            <Button disabled={guardando} variant="contained" color='success' onClick={updateProfile} >
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

                                variant="contained"
                                color="error"
                                onClick={() => setEditMode(!editMode)}>
                                <span>Cancelar</span>
                            </Button>
                        </Stack>
                    )
                }
            </Stack>

            {
                !cargando && (

                    <Container sx={{ marginLeft: "20px" }}>

                        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                            <strong>
                                Datos Personales
                            </strong>
                        </Typography>

                        {
                            !editMode && (
                                <Box>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >

                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Nombre</strong> <br />
                                            Juan
                                            {/* {usuario?.nombre} */}
                                        </Typography>


                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Apellido</strong> <br />
                                            {/* {usuario?.apellido} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Legajo</strong> <br />
                                            {/* {usuario?.legajo} */}
                                        </Typography>
                                        {
                                            alumno && (
                                                <Typography variant="h6" sx={{ width: '200px' }} >
                                                    <strong>Curso</strong> <br />
                                                    {/* {usuario?.legajo} */}
                                                </Typography>
                                            )
                                        }


                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >

                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Mail</strong> <br />
                                            {/* {usuario?.localidad} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Contraseña</strong> <br />
                                            {/* {usuario?.direccion} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '150px' }} >
                                            <strong>Localidad</strong> <br />
                                            {/* {usuario?.telefono} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '150px' }} >
                                            <strong>Dirección</strong> <br />
                                            {/* {usuario?.telefono} */}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >
                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Telefono</strong> <br />
                                            {/* {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechanacimiento).getFullYear()) : 'N/A'} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '200px' }} >
                                            <strong>Edad</strong> <br />
                                            {/* {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechanacimiento).getFullYear()) : 'N/A'} */}
                                        </Typography>
                                        <Typography variant="h6" sx={{ width: '250px' }} >
                                            <strong>Fecha de Nacimiento</strong> <br />
                                            {/* {usuario?.fechanacimiento || 'N/A'} */}
                                        </Typography>

                                    </Stack>
                                </Box>
                            )
                        }

                        {
                            editMode && (
                                <Box>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >

                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Nombre</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "200px" }} variant="outlined" />

                                        </FormControl>

                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Apellido</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "200px" }} variant="outlined" />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Legajo</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "170px" }} variant="outlined" />

                                        </FormControl>
                                        {
                                            alumno && (
                                                <FormControl>
                                                    <Typography variant="h6" sx={{ width: '200px' }} >
                                                        <strong>Curso</strong> <br />
                                                    </Typography>
                                                    <FormControl>
                                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                                        <Select
                                                            value={age}
                                                            label="Age"
                                                            onChange={handleChange}
                                                        >
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </FormControl>
                                            )
                                        }


                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Mail</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" variant="outlined" sx={{ width: "250px" }} />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Contraseña</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "200px" }} variant="outlined" />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Localidad</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "200px" }} variant="outlined" />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Dirección</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" sx={{ width: "200px" }} variant="outlined" />

                                        </FormControl>

                                    </Stack>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 2, sm: 2, md: 23 }}
                                        sx={{ marginBottom: '30px' }}
                                    >
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Teléfono</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" variant="outlined" />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Edad</strong> <br />
                                            </Typography>
                                            <TextField id="outlined-basic" variant="outlined" />

                                        </FormControl>
                                        <FormControl>
                                            <Typography variant="h6" sx={{ width: '200px' }} >
                                                <strong>Fecha de Nacimiento</strong> <br />
                                            </Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDatePicker
                                                    label="Fecha"
                                                    name="fecha"
                                                    value={fecha}
                                                    onChange={handleFecha}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    MenuProps={{ disableScrollLock: true }}
                                                />
                                            </LocalizationProvider>

                                        </FormControl>

                                    </Stack>
                                </Box>
                            )
                        }



                        <Divider sx={{ marginTop: '20px' }}></Divider>
                        {
                            docente && !editmode && (
                                <Box>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        <strong>
                                            Datos Académicos
                                        </strong>
                                    </Typography>
                                    <Typography variant="h6" sx={{ width: '250px' }} >
                                        <strong>Materia/s Impartidas</strong> <br />
                                        {
                                            docente?.materia?.map(m => (
                                                <span key={m.id}>{m.nombre}</span>
                                            ))
                                        }
                                    </Typography>
                                </Box>
                            )
                        }
                        {
                            docente && editmode && (
                                <Box>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        <strong>
                                            Datos Académicos
                                        </strong>
                                    </Typography>
                                    <FormControl>
                                        <Typography variant="h6" sx={{ width: '250px' }} >
                                            <strong>Materia/s Impartidas</strong> <br />
                                        </Typography>
                                        <FormControl>
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
                                                {
                                                    materias.map((materia) => (
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

                                    </FormControl>
                                </Box>
                            )
                        }
                        {
                            preceptor && !editmode && (
                                <Box>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        <strong>
                                            Datos Académicos
                                        </strong>
                                    </Typography>
                                    <Typography variant="h6" sx={{ width: '250px' }} >
                                        <strong>Curso/s</strong> <br />
                                        {
                                            docente?.materia?.map(m => (
                                                <span key={m.id}>{m.nombre}</span>
                                            ))
                                        }
                                    </Typography>
                                </Box>
                            )
                        }
                        {
                            preceptor && editmode && (
                                <Box>
                                    <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                                        <strong>
                                            Datos Académicos
                                        </strong>
                                    </Typography>
                                    <FormControl>
                                        <Typography variant="h6" sx={{ width: '250px' }} >
                                            <strong>Curso/s</strong> <br />
                                        </Typography>
                                        <FormControl>
                                            <Select
                                                required
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={idCursos}
                                                onChange={handleCursos}
                                                input={<OutlinedInput label="Cursos" />}
                                                MenuProps={MenuProps}

                                            >
                                                {
                                                    cursos.map((c) => (
                                                        <MenuItem
                                                            key={c.id}
                                                            value={c.id}
                                                            style={getStyles(c, cursos)}
                                                        >
                                                            {c.nombre}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>

                                    </FormControl>
                                </Box>
                            )
                        }
                        {
                            alumno && (
                                <>


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