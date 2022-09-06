import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import LoginLayout from "../../../components/loginLayout"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

const Login = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [mensaje, setMensaje] = useState("")
    const router = useRouter()
    const { iniciarSesion, registrarse, loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && authUser) {
            router.push('/')
        }
    }, [loading, authUser])


    const handleCorreo = (e) => {
        setCorreo(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitData = async (e) => {
        e.preventDefault()
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${correo}`)
        if (res.data) {
            iniciarSesion(correo, password)
                .then(credencial => {
                    console.log(credencial);
                    router.push('/')
                }).catch(err => {
                    if (res.data.correo === correo && res.data.password === password) {
                        registrarse(correo, password)
                            .then(credencial => {
                                router.push('/')
                            }).catch(error => {
                                console.log(error);
                            })
                    } else {
                        setError("Usuario y/o contraseña incorrectos")
                        setTimeout(() => {
                            setError("")
                        }, 3000);
                    }
                })
        } else {
            setError("Usuario no encontrado en el sistema, consulte con el administrador")
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }

    return (
        <LoginLayout>
            <Box component="form" onSubmit={onSubmitData} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="correo"
                    onChange={handleCorreo}
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    onChange={handlePassword}
                    label="Contrasenia"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Ingresar
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Typography component={'a'} variant="a" onClick={() => setMensaje("Consulte con el administrador del sistema")} sx={{ cursor: 'pointer' }}>
                            Olvidó sus credenciales?
                        </Typography>
                    </Grid>
                </Grid>
                {
                    error !== "" && (
                        <Alert sx={{ m: 2 }} severity="warning">{error}</Alert>
                    )
                }
                {
                    mensaje !== "" && (
                        <Alert sx={{ m: 2 }} severity="info">{mensaje}</Alert>
                    )
                }
            </Box>
        </LoginLayout>
    )
}
export default Login