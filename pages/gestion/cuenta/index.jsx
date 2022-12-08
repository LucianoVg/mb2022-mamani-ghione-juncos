import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Typography, Grid, Box, Divider, Stack, Item, MenuItem, TextField, Checkbox, FormControl, InputLabel, Select, OutlinedInput } from "@mui/material";
import { useRouter } from "next/router";

export default function Detalles() {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    const [usuario, setUsuario] = useState()
    const [enfermedades, setEnfermedades] = useState()
    const [selectedEnf, setSelectedEnf] = useState([])
    const [alergias, setAlergias] = useState('')
    const [alumno, setAlumno] = useState(null)
    const [docente, setDocente] = useState(null)

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        traerUsuario()
        traerAlumno()
        traerDocente()
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
    const traerDocente = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/${usuario?.legajo}`)
        if (res.status === 200) {
            setDocente(res.data)
        }
    }
    const traerAlumno = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario?.legajo}`)
        if (res.status === 200) {
            console.log(res.data);
            setAlumno(res.data)
        }
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario(res.data)
        }
    }
    const traerEnfermedades = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/enfermedades`)
        if (res.data) {
            setEnfermedades(res.data)
        }
    }
    return (
        <Layout>
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
                    spacing={{ xs: 2, sm: 2, md: 23}}
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
                        {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechaNacimiento).getFullYear()) : 'N/A'}
                    </Typography>
                    <Typography variant="h5" sx={{ width: '250px' }} >
                        <strong>Fecha de Nacimiento</strong> <br />
                        {usuario?.fechanacimiento || 'N/A'}
                    </Typography>

                </Stack>

                <Divider sx={{ marginTop: '20px' }}></Divider>

                <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>
                    <strong>
                        Datos de salud
                    </strong>
                </Typography>

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
                            style={{ minWidth: "250px" }}
                        >
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
                </Stack>



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
        </Layout >
    )
}