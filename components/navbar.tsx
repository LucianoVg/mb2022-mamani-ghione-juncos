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
                <a className="navbar-brand ps-3">
                    {/* Agregar icono del instituto */}

                </a>
            </Link>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
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
            </ul>

        </nav>
    )
}