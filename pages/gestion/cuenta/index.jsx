import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { Typography, Grid, Divider, MenuItem, TextField, Checkbox, FormControl, InputLabel, Select, OutlinedInput } from "@mui/material";
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
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>Datos Personales</Typography>

                <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                    <Grid item xs={4} spacing={2}>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Nombre</strong> <br />
                            {usuario?.nombre}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Apellido</strong> <br />
                            {usuario?.apellido}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Legajo</strong> <br />
                            {usuario?.legajo}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} s>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Mail</strong> <br />
                            {usuario?.correo}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Direccion</strong> <br />
                            {usuario?.direccion}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Telefono</strong> <br />
                            {usuario?.telefono}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                            <strong>Edad</strong> <br />
                            {usuario?.fechanacimiento ? (new Date().getFullYear() - new Date(usuario?.fechaNacimiento).getFullYear()) : 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" sx={{ width: '250px', marginBottom: '20px' }} >
                            <strong>Fecha de Nacimiento</strong> <br />
                            {usuario?.fechanacimiento || 'N/A'}
                        </Typography>
                    </Grid>
                </Grid>

                {
                    alumno && (
                        <>
                            <Divider sx={{ marginTop: '20px' }}></Divider>

                            <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos de salud</Typography>
                            <Grid container direction='row'>
                                <Grid item xs>
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <InputLabel id="demo-multiple-name-label">Tenés alguna Enfermedad?</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={selectedEnf}
                                            onChange={handleEnfermedad}
                                            input={<OutlinedInput label="Enfermedad" />}
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
                                </Grid>
                                <Grid item xs>
                                    <TextField label="Tiene alguna alergia?" multiline value={alergias} onChange={(e) => { setAlergias(e.target.value) }} />
                                </Grid>
                            </Grid>
                        </>
                    )
                }
                <Divider sx={{ marginTop: '20px' }}></Divider>

                {
                    alumno && (
                        <>
                            <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos del Tutor</Typography>
                            <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                        <strong>Nombre</strong> <br />
                                        {alumno?.tutor?.nombre || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                        <strong>Apellido</strong> <br />
                                        {alumno?.tutor?.apellido || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                        <strong>Dni</strong> <br />
                                        {alumno?.tutor?.legajo || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                        <strong>Mail</strong> <br />
                                        {alumno?.tutor?.correo || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5" sx={{ width: '200px', marginBottom: '20px' }} >
                                        <strong>Telefono</strong> <br />
                                        {alumno?.tutor?.telefono || 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ marginTop: '20px' }}></Divider>

                            <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px' }}>Datos de Matriculacion</Typography>
                            <Grid container direction='row' sx={{ marginBottom: '20px' }}>
                                <Grid item xs={4} sx={{ width: '200px', marginBottom: '20px' }} >
                                    <Typography variant="h5" sx={{ width: '250px' }} >
                                        <strong>Año de Matriculacion</strong> <br />
                                        {alumno?.fechamatriculacion || 'N/A'}
                                    </Typography>
                                    <Typography variant="h5" sx={{ width: '250px' }} >
                                        <strong>Curso</strong> <br />
                                        {`${alumno?.cursoxdivision?.curso?.nombre} ${alumno?.cursoxdivision?.division?.division}` || 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    )
                }

            </div>
        </Layout >
    )
}