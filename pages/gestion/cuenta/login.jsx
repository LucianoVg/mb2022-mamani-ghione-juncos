import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import LoginLayout from "../../../components/loginLayout"
import style from '../../../styles/login.module.css';

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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${correo}/${password}`)
        if (res.data) {
            console.log(res.data);
            iniciarSesion(res.data.correo, res.data.password)
                .then(user => {
                    console.log(user);
                }).catch(error => {
                    console.log(error);
                    if (res.data.correo === correo
                        && res.data.password === password) {
                        registrarse(res.data.correo, res.data.password)
                            .then(user => {
                                console.log(user);
                            }).catch(error => {
                                console.log(error);
                            })
                    } else {
                        setError('Usuario y/o contraseña incorrectos')
                        setTimeout(() => {
                            setError('')
                        }, 3000);
                    }
                })
        } else {
            setError('No se encontró al usuario')
            setTimeout(() => {
                setError('')
            }, 3000);
        }
    }

    return (
        <LoginLayout>
            <form onSubmit={onSubmitData}>
                <div className="form-group">
                    <label htmlFor="email">Correo electronico</label>
                    <input
                        id="email"
                        type="email"
                        name="correo"
                        onChange={handleCorreo}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handlePassword} />
                </div>

                <button type="submit" className="btn btn-primary">Ingresar</button>
                <a className={style.forgetPwd} onClick={() => {
                    setMensaje("Consulte con el administrador del sistema")
                    setTimeout(() => {
                        setMensaje("")
                    }, 3000);
                }}> Olvidó sus credenciales?</a>
                {
                    error !== "" && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )
                }
                {
                    mensaje !== "" && (
                        <div className="alert alert-info mt-2" role="alert">
                            {mensaje}
                        </div>
                    )
                }
            </form>
        </LoginLayout>
    )
}
export default Login