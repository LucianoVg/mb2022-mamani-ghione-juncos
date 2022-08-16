import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authStateChanged, cerrarSesion } from "../servicios/cuenta";

export const Navbar = () => {
    const router = useRouter()
    const [usuario, setUsuario] = useState({ email: '' })

    const logout = () => {
        cerrarSesion()
            .then(() => {
                router.reload()
            })
    }

    useEffect(() => {
        authStateChanged(user => {
            console.log("Usuario logeado", user);
            if (user.email) {
                setUsuario({
                    email: user.email
                })
            }
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="navbar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link href={'/gestion/institucional'}>
                                <a className="nav-link">Institucional</a>
                            </Link>
                        </li>
                        {
                            usuario.email === '' ? (
                                <li className="nav-item">
                                    <a className="nav-link" href="gestion/cuenta/login">Iniciar Sesion</a>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" onClick={logout} type="button">Cerrar Sesion</a>
                                </li>
                            )
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}