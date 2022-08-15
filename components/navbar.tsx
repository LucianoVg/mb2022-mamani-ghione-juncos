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
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-auto" id="sidebarToggle"><i
                className="fas fa-bars"></i></button>

            <Link href="/">
                <a className="navbar-brand ps-3 ms-auto ms-md-0 me-3 me-lg-4">
                    {/* Agregar icono del instituto */}

                </a>
            </Link>
           
            {/* <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><hr className="dropdown-divider" /></li>
                        {
                            usuario && usuario.email !== '' ? (
                                <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                            ) : (
                                <li><a className="dropdown-item" onClick={() => router.push('/gestion/cuenta/login')}>Iniciar Sesion</a></li>
                            )
                        }
                    </ul>
                </li>
            </ul> */}
            <Link href="/">
                <a className="navbar-brand ps-1 ms-auto ms-md-0 me-3 me-lg-1">
                    {/* Agregar icono del instituto */}
                    Institucional
                </a>
            </Link>
            <Link href="/gestion/cuenta/login">
                <a className="navbar-brand ps-3 ms-auto ms-md-0 me-3 me-lg-4">
                    {/* Agregar icono del instituto */}
                    Iniciar sesion 
                </a>
            </Link>
        </nav>
    )
}