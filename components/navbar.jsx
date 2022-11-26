import { useAuth } from "./context/authUserProvider"
import Notificaciones from "../components/notificacion_panel";
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "./hooks/windowSizeHook";

export const Navbar = () => {
    const { loading, authUser } = useAuth()
    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    const windowSize = useWindowSize()

    const [title, setTitle] = useState("Instituto Privado \"El Salvador\"")
    useEffect(() => {
        setTitle(windowSize.width <= 400 ? "\"El Salvador \"" : "Instituto Privado \"El Salvador\"")
    }, [windowSize])

    return (
        <div className="nav-bar">
            <div className="d-flex bd-highlight">
                <div className="p-1 flex-fill bd-highlight" style={{ marginLeft: "-10px", marginRight: "10px", marginTop: '4px' }} >

                    <button className="navbar-toggler" style={{ fontSize: "20px" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" onClick={openNav}>
                            <FontAwesomeIcon
                                color="white"
                                icon={faBars} />
                        </span>
                    </button>
                </div>
                <div className="p-1 w-100 bd-highlight" style={{ marginLeft: "-10px", marginTop: "3px" }}  >
                    <a className="navbar-brand" href="#" style={{ color: "white", fontSize: "15px" }}> {title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="p-2 flex-fill bd-highlight" style={{ marginLeft: "-25px" }}>
                    {
                        !loading && authUser && (
                            <Notificaciones />
                        )
                    }
                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <a className="nav-link active" style={{ color: "white" }} href="/gestion/institucional">Institucional</a>
                </div>
            </div>
        </div>
    )
}