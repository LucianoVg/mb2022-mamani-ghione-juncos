
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { guardarImagen, traerImagen } from "../../../servicios/portada";
import { Typography, TextField, Button, Select, Box, Grid, MenuItem, InputLabel } from "@mui/material";


const FichaInstitucional = () => {
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: '', nombreInstitucion: '', ubicacion: '', tipoInstitucion: '', descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: '', portadasFicha: []
    })
    const [usuario, setUsuario] = useState({ id: '' })
    const router = useRouter()
    const { loading, authUser } = useAuth()
    const [imagenes, setImagenes] = useState(null)

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    console.log(res.data);
                    setUsuario({
                        id: res.data.id
                    })
                }
            })
    }, [authUser, loading])

    const handleImagenes = (e) => {
        setImagenes(e.currentTarget.files)
        setTimeout(() => {
            console.log(imagenes);
        }, 3000);
    }
    const handleForm = (e) => {
        setFichaInstitucional({ ...fichaInstitucional, [e.target.name]: e.target.value })
    }
    const guardarFicha = (e) => {
        e.preventDefault()
        cargarImagenes()

        fichaInstitucional.idUsuario = usuario.id

        axios.post(`${process.env.BASE_URL}/gestion/institucional`, {
            nombreInstitucion: fichaInstitucional.nombreInstitucion,
            ubicacion: fichaInstitucional.ubicacion,
            tipoInstitucion: fichaInstitucional.tipoInstitucion,
            descripcion: fichaInstitucional.descripcion,
            telefono1: fichaInstitucional.telefono1,
            telefono2: fichaInstitucional.telefono2,
            oficina1: fichaInstitucional.oficina1,
            oficina2: fichaInstitucional.oficina2,
            mail: fichaInstitucional.mail,
            idUsuario: fichaInstitucional.idUsuario
        }).then(res => {
            console.log(res.data);
            fichaInstitucional.portadasFicha.map(p => {
                axios.post(`${process.env.BASE_URL}/gestion/portadas`, {
                    nombre: p.name,
                    url: p.url,
                    fichaInstitucionalId: res.data.id
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }
    const cargarImagenes = () => {
        if (fichaInstitucional.portadasFicha.length > 0) {
            fichaInstitucional.portadasFicha.splice(0, fichaInstitucional.portadasFicha.length)
        }
        for (let i = 0; i < imagenes?.length; i++) {
            const file = imagenes[i];
            guardarImagen('portadas/' + file.name, file)
                .then(result => {
                    traerImagen('portadas/' + file.name).then(url => {
                        console.log(url);
                        fichaInstitucional.portadasFicha.push({
                            name: file.name,
                            url: url
                        })
                    })
                    // console.log(fichaInstitucional);
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Layout title={'Generar Ficha Institucional'}>
            <Typography component={'h1'} variant={'h3'}>Generar Ficha Institucional</Typography>
            <Box component={'form'} onSubmit={guardarFicha}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Nombre de la institucion"
                            value={fichaInstitucional.nombreInstitucion}
                            name="nombreInstitucion"
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Ubicacion"
                            value={fichaInstitucional.ubicacion}
                            name="ubicacion"
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Correo electronico"
                            value={fichaInstitucional.mail}
                            name="ubicacion"
                            autoComplete="email"
                            type={'email'}
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Descripcion"
                            value={fichaInstitucional.descripcion}
                            name="descripcion"
                            multiline
                            rows={3}
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Telefono 1"
                            value={fichaInstitucional.telefono1}
                            name="telefono1"
                            type={'tel'}
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Telefono 2"
                            value={fichaInstitucional.telefono2}
                            name="telefono2"
                            type={'tel'}
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Oficina 1"
                            value={fichaInstitucional.oficina1}
                            name="oficina1"
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Oficina 2"
                            value={fichaInstitucional.oficina2}
                            name="oficina2"
                            onChange={handleForm}
                            required />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="selectTipo">Tipo de Institucion</InputLabel>
                        <Select
                            id="selectTipo"
                            fullWidth
                            label="Tipo de Institucion"
                            onChange={handleForm}
                            value={fichaInstitucional.tipoInstitucion}
                            name="tipoInstitucion">
                            <MenuItem value={'Privada'}>Privada</MenuItem>
                            <MenuItem value={'Publica'}>Publica</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" component="label">
                            <input hidden type="file" name="imagenes" id="inputImg" className="form-control" accept="image/*" multiple={true} onChange={handleImagenes} />
                            Subir Imagenes
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit">
                            Guardar Ficha
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}

export default FichaInstitucional;