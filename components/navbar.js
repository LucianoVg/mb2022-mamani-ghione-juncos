import Link from "next/link"
import { useAuth } from "./context/authUserProvider"
<<<<<<< HEAD
<<<<<<< HEAD:components/navbar.jsx
import Notificaciones from "../components/notificacion_panel";
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "./hooks/windowSizeHook";
=======
=======
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
import { Toolbar, IconButton, Typography, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Notificacion from '../components/notificacion_panel'
import { useRouter } from "next/router";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 280,
        width: `calc(100% - ${280}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

<<<<<<< HEAD
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap):components/navbar.js

export const Navbar = () => {
    const { loading, authUser } = useAuth()
<<<<<<< HEAD:components/navbar.jsx
    const windowSize = useWindowSize()
    const [title, setTitle] = useState("Instituto Privado \"El Salvador\"")

    useEffect(() => {
        setTitle(windowSize.width <= 440 ? "El Salvador" : "Instituto Privado \"El Salvador\"")
    }, [windowSize])

    return (
        <div className="nav-bar">
            <div className="d-flex bd-highlight">
                <div className="p-1 flex-fill bd-highlight" style={{ marginLeft: "-10px", marginRight: "10px", marginTop: '4px' }} >

                    <button className="navbar-toggler" style={{ fontSize: "20px" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <a href="#mySidenav" data-bs-toggle="offcanvas" >
                            <span className="navbar-toggler-icon" data-bs-target="mySidenav">
                                <FontAwesomeIcon
                                    color="white"
                                    icon={faBars} />
                            </span>
                        </a>
                    </button>
                </div>
                <div className="p-1 w-100 bd-highlight" style={{ marginLeft: "-10px", marginTop: "3px" }}  >
                    <a className="navbar-brand" href="/" style={{ color: "white", fontSize: "15px" }}> <strong>{title}</strong></a>
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



{/* <AppBar position="absolute" open={open}>
=======
=======

export const Navbar = ({ toggleDrawer, open }) => {
    const { loading, authUser } = useAuth()
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
    const router = useRouter()
    return (
        <>
            <AppBar position="absolute" open={open}>
<<<<<<< HEAD
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap):components/navbar.js
=======
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Instituto Privado &quot;El Salvador&quot;
                    </Typography>

                    <Typography href='/gestion/institucional' component={'a'} variant="body1" sx={{ mr: 1, textDecoration: 'none' }} color='white'>
                        Institucional
                    </Typography>
                    {
                        !loading && authUser && (
                            <>
                                <div style={{ alignContent: 'right', marginLeft: '-30px', marginRight: '-20px' }} >
                                    <Notificacion disablePadding />
                                </div>
                                <IconButton onClick={() => router.push('/gestion/cuenta')}>
                                    <AccountCircleIcon />
                                </IconButton>
                            </>
                        )
                    }

                </Toolbar>
<<<<<<< HEAD
<<<<<<< HEAD:components/navbar.jsx
            </AppBar> */}
=======
            </AppBar>
        </>
    )
}
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap):components/navbar.js
=======
            </AppBar>
        </>
    )
}
>>>>>>> parent of f4c7492 (reemplazo de material por bootstrap)
