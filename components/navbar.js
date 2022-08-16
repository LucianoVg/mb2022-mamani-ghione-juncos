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
        <header className="header" id="header">
            <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
            <div className="header_img"> </div>
        </header>

        // <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">
        //     <div classNameName="container-fluid">

        //         <button type="button" id="sidebarCollapse" classNameName="navbar-btn">
        //             <span></span>
        //             <span></span>
        //             <span></span>
        //         </button>
        //         <button classNameName="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
        //             data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        //             aria-expanded="false" aria-label="Toggle navigation">
        //             <i classNameName="fas fa-align-justify"></i>
        //         </button>

        //         <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul classNameName="nav navbar-nav ml-auto">
        //                 <li classNameName="nav-item active">
        //                     <Link href={'/gestion/institucional'}>
        //                         <a classNameName="nav-link">Institucional</a>
        //                     </Link>
        //                 </li>
        //                 {
        //                     usuario.email === '' ? (
        //                         <li classNameName="nav-item">
        //                             <a classNameName="nav-link" href="gestion/cuenta/login">Iniciar Sesion</a>
        //                         </li>
        //                     ) : (
        //                         <li classNameName="nav-item">
        //                             <a classNameName="nav-link" onClick={logout} type="button">Cerrar Sesion</a>
        //                         </li>
        //                     )
        //                 }

        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    )
}