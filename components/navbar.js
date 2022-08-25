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
        <header  className="header" id="header">
            <div className="header_toggle">
                <i className='bx bx-menu' id="header-toggle"></i>
            </div>
            <div className="header_img"> </div>
            <a href='/gestion/institucional'>
                Institucional
            </a>
        </header>
    )
}