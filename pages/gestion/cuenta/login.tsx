import { NextPage } from "next"
import { useState } from "react"
import { Layout } from "../../../components/layout"

const Login: NextPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (e: any) => {
        setEmail(e.target.value as string)
    }
    const handlePassword = (e: any) => {
        setPassword(e.target.value as string)
    }
    const onSubmitData = (e: any) => {
        e.preventDefault()
        console.log("Data", { email, password });
    }

    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                            <div className="card-body">
                                <form method="post" onSubmit={onSubmitData}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" value={email} onChange={handleEmail} name="email" id="inputEmail" type="email" placeholder="name@example.com" />
                                        <label>Email address</label>
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
                                <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Login