import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from './context/authUserProvider'
import React from 'react'

const Sidebar = ({ children }) => {
    const [menusGestion, setMenusGestion] = useState()
    const [menusReportes, setMenusReportes] = useState()
    const router = useRouter()
    const { loading, authUser, cerrarSesion } = useAuth()

    useEffect(() => {
        if (!loading && authUser) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
                .then(res => {
                    if (res.data) {
                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/gestion`)
                            .then(r => {
                                if (r.data) {
                                    console.log(r.data);
                                    setMenusGestion(r.data)
                                }
                            })

                        // axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/reportes`)
                        //     .then(r => {
                        //         if (r.data) {
                        //             console.log(r.data);
                        //             setMenusReportes(r.data)
                        //         }
                        //     })
                    }
                })
        }
    }, [authUser, loading])

    const logout = () => {
        cerrarSesion()
            .then(() => {
                router.reload()
            })
    }

    /* Set the width of the side navigation to 0 */
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    return (
        <>

            {/* <div id="mySidenav" className="sidenav">
                <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
                <a href="#">Inicio</a>
                <a href="#">Gestion</a>
                <a href="#">Reportes</a>
                <a href="#">Iniciar Sesion</a>
            </div> */}

<div class="offcanvas offcanvas-start" id="mySidenav">
  <div class="offcanvas-header">
    <h1 class="offcanvas-title">Heading</h1>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <p>Some text lorem ipsum.</p>
    <p>Some text lorem ipsum.</p>
    <button class="btn btn-secondary" type="button">A Button</button>
  </div>
</div>

            {/* Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page  */}
            <div id="main">
                {children}
            </div>
        </>
    )
}

export default Sidebar


