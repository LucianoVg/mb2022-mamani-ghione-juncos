import axios from "axios"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Layout } from "../../../components/layout"
import LoginLayout from "../../../components/loginLayout"
import { cerrarSesion, iniciarSesion, registrarse } from "../../../servicios/cuenta"

const Login = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleCorreo = (e) => {
        setCorreo(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const onSubmitData = async (e) => {
        e.preventDefault()
        const res = await axios.get(`http://localhost:3000/api/gestion/cuenta?correo=${correo}`)
        if (res.data) {
            iniciarSesion(correo, password)
                .then(credencial => {
                    console.log(credencial);
                    router.push('/')
                }).catch(err => {
                    setError("Usuario y/o contraseña incorrectos")
                    setTimeout(() => {
                        setError("")
                    }, 3000);
                })
        } else {
            registrarse(correo, password)
                .then(credencial => {
                    console.log(credencial);
                    router.push('/')
                }).catch(err => {
                    setError("Usuario y/o contraseña incorrectos")
                    setTimeout(() => {
                        setError("")
                    }, 3000);
                })
        }
    }

    return (
        <LoginLayout>
            <h3 className="text-center">Ingrese con su cuenta</h3>
            <Form onSubmit={onSubmitData}>
                <FormGroup>
                    <Label for="inputEmail">Correo Electronico</Label>
                    <Input value={correo} id="inputEmail" type="email" name="email" placeholder="example@mail.com" onChange={handleCorreo} />
                </FormGroup>
                <FormGroup>
                    <Label for="inputPassword">Contraseña</Label>
                    <Input value={password} id="inputPassword" type="password" name="password" placeholder="**********" onChange={handlePassword} />
                </FormGroup>
                <Button className="mt-4" type="submit" color="info" block>Ingresar</Button>
                <p className="mt-4">
                    No posee cuenta? <Link href={'/registro'}>
                        <a style={{ textDecoration: 'none' }}>Registrarse</a>
                    </Link>
                </p>
                <p className="mt-4">
                    Olvido sus credenciales? <Link href={'/recuperarCredenciales'}>
                        <a style={{ textDecoration: 'none' }}>Recuperar Cuenta</a>
                    </Link>
                </p>
            </Form>
            {
                error !== "" && (
                    <Alert color="warning">
                        {error}
                    </Alert>
                )
            }
        </LoginLayout>
    )
}
export default Login