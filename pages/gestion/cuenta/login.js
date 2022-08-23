import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import { Layout } from "../../../components/layout"

const Login = () => {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const { authUser, loading, iniciarSesion, registrarse } = useAuth()

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
            registrarse(correo, password)
                .then(authUser => {
                    console.log(authUser);
                    router.push('/')
                }).catch(err => {
                    iniciarSesion(correo, password)
                        .then(authUser => {
                            console.log(authUser);
                            router.push('/')
                        }).catch(err => {
                            setError("Usuario y/o contraseña incorrectos")
                            setTimeout(() => {
                                setError("")
                            }, 3000);
                        })
                })
        } else {
            setError("No se encontró al usuario en el sistema")
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }

    useEffect(() => {
        if (!loading && authUser) {
            router.push('/')
        }
    }, [authUser, loading])


    return (
        <Layout title={'Iniciar Sesion'}>
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                        <div className="card-body">
                            <form method="post" onSubmit={onSubmitData}>

                                <div className="form-floating mb-3">
                                    <input className="form-control" value={correo} onChange={handleCorreo} name="correo" id="inputEmail" type="email" placeholder="correo@mail.com" />
                                    <label>Correo electronico</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" value={password} onChange={handlePassword} name="password" id="inputPassword" type="password" placeholder="Password" />
                                    <label>Password</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <a className="small" href="password.html">Forgot Password?</a>
                                    <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center py-3">
                            <div className="small"><a type="button" onClick={() => router.push('registro')}>No posee cuenta? Registrese</a></div>
                        </div>
                        {
                            error !== "" && (
                                <div className="alert alert-warning">
                                    {error}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Login