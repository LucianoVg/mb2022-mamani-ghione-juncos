import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import LoginLayout from "../../../components/loginLayout"
import styles from '../../../styles/loginLayout.module.css'

const Login = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
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
        const res = await axios.get(`${process.env.BASE_URL}/gestion/cuenta/${correo}`)
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
            <h3 className="text-center">Ingrese con su cuenta</h3>
            <form onSubmit={onSubmitData}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Correo Electronico</label>
                    <input className="form-control" value={correo} id="inputEmail" type="email" name="email" placeholder="example@mail.com" onChange={handleCorreo} />
                </div>
                <div>
                    <label htmlFor="inputPassword">Contraseña</label>
                    <input className="form-control" value={password} id="inputPassword" type="password" name="password" placeholder="**********" onChange={handlePassword} />
                </div>
                <button className={styles.btnSubmit} type="submit">Ingresar</button>
                {/* <p className="mt-4">
                    No posee cuenta? <Link href={'/registro'}>
                        <a style={{ textDecoration: 'none' }}>Registrarse</a>
                    </Link>
                </p> */}
                {/* <p className="mt-4">
                    Olvido sus credenciales? <Link href={'/recuperarCredenciales'}>
                        <a style={{ textDecoration: 'none' }}>Recuperar Cuenta</a>
                    </Link>
                </p> */}
            </form>
            {
                error !== "" && (
                    <div className="alert alert-warning">
                        {error}
                    </div>
                )
            }
        </LoginLayout>
    )
}
export default Login