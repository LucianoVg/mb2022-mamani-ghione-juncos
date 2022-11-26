import { useEffect, useState } from 'react'
import axios from "axios";

import { Tooltip, IconButton, Container, Badge } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Popover from '@mui/material/Popover';
import { useAuth } from './context/authUserProvider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faUser, faLock, faLockOpen, faListCheck, faChartPie, faUsers, faFileCircleCheck, faCheck, faCertificate, faWarning, faCalendar, faBell } from "@fortawesome/free-solid-svg-icons";

export const Notificacion = () => {
    const { loading, authUser } = useAuth()

    const [notificaciones, setNotificaciones] = useState()
    const [usuario, setUsuario] = useState({ id: 0 })
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        if (!localStorage.getItem('vistas')) {
            localStorage.setItem('vistas', true)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        if (!loading && authUser) {
            traerUsuario()
            ListarNotificaciones()
        }
    }, [loading, authUser, usuario.id])

    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            setUsuario({ id: res.data?.id })
        }
    }
    const ListarNotificaciones = () => {
        if (usuario.id.length) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/${usuario.id}`)
                .then(res => {
                    setNotificaciones(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
    }
    return (
        <div id="dropdown">
            <a className="dropdown" data-toggle="dropdown" role="button"
                data-mdb-toggle="dropdown" onClick={handleClick}>
                <FontAwesomeIcon icon={faBell} style={{ color: "white", fontSize: "15px" }} />

                <span className="badge rounded-pill notify-badge badge-notification bg-danger">100</span>
            </a>

            <div className="dropdown-menu dropdown-menu-right" style={{ width: "250px", position: "absolute", inset: " 0px 0px auto auto", margin: "0px", transform: "translate3d(0px, 43.5px, 0px)", borderRadius: "5px" }}>

                <a className="dropdown-item" href="#">
                    Some news
                    <p className="small mb-2"
                        style={{ textTransform: "lowercase", fontSize: "11px" }}
                    ><strong>4/10/2022</strong></p>
                </a>


                <a className="dropdown-item" href="#">Another news
                    <p className="small mb-2"
                        style={{ textTransform: "lowercase", fontSize: "11px" }}
                    ><strong>4/10/2022</strong></p>
                </a>


                <a className="dropdown-item" href="#">Something else here
                    <p className="small mb-2"
                        style={{ textTransform: "lowercase", fontSize: "11px" }}
                    ><strong>4/10/2022</strong></p>
                </a>

                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item"><strong>Ver todo</strong></a>
            </div>
        </div>
    )
}

export default Notificacion