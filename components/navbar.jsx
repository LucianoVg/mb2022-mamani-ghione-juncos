import { useAuth } from "./context/authUserProvider"
import Notificaciones from "../components/notificacion_panel";
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";




export const Navbar = () => {
    const { loading, authUser } = useAuth()
    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    const [title, setTitle] = useState("Instituto Privado \"El Salvador\"")
    return (

        <div className="nav-bar">
            <div className="d-flex bd-highlight">
                <div className="p-1 flex-fill bd-highlight" style={{ marginLeft: "-10px", marginRight: "10px", marginTop: '4px' }} >
                  
                        <button className="navbar-toggler" style={{fontSize: "20px"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                    <a className="nav-link active" style={{color: "white"}} href="/gestion/institucional">Institucional</a>
                </div>

            </div>

        </div>


    )
}




{/* <AppBar position="absolute" open={open}>
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
            </AppBar> */}