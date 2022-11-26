import { useAuth } from "./context/authUserProvider"
import Notificaciones from "../components/notificacion_panel";
<<<<<<< Updated upstream


import { useEffect, useState } from 'react'
export const Navbar = ({ toggleDrawer, open }) => {
    const { loading, authUser } = useAuth()
    const router = useRouter()

    const [title, setTitle] = useState("Instituto Privado \"El Salvador\"")

    if ($(window).width() < 960) {
        setTitle = "El Salvador"
    }

    return (
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";
export const Navbar = () => {
    const { loading, authUser } = useAuth()
    /* Set the width of the side navigation to 250px */
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
>>>>>>> Stashed changes

    return (
        <div className="nav-bar">
<<<<<<< Updated upstream
            <div className="d-flex bd-highlight">
                <div className="p-2 w-100 bd-highlight" style={{marginLeft: "-10px"}} >
                    <a className="navbar-brand" href="#" style={{color: "white"}}> {title}</a>
=======
            <div className="row">
                <div className="col-mr-auto">
                    <a className="navbar-brand" style={{ color: "white" }} href="#">Instituto Privado &quot;El Salvador&quot;</a>
>>>>>>> Stashed changes
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {/* Use any element to open the sidenav */}
                        <span className="navbar-toggler-icon" onClick={openNav}>
                            <FontAwesomeIcon
                                color="white"
                                icon={faBars} />
                        </span>
                    </button>
<<<<<<< Updated upstream

                </div>
                <div className="p-2 flex-fill bd-highlight" >
=======
                </div>
                <div className="col-ml-auto">
                    <a className="nav-link active split text-light ml-auto" href="/gestion/institucional">Institucional</a>
                </div>

                <div className="col-ml-auto">
>>>>>>> Stashed changes
                    {
                        !loading && authUser && (
                            <Notificaciones />
                        )
                    }

                </div>
                <div className="p-2 flex-fill bd-highlight">
                    <a className="nav-link active split" href="/gestion/institucional">Institucional</a>
                </div>
            </div>
        </div>
    )
}


// <nav className="navbar navbar-expand-sm navbar-dark" style={{
//     paddingRight: '24px', // keep right padding when drawer closed
//     backgroundColor: '#3F51B5'
// }}>

//     <div className="container-fluid">
//         <a className="navbar-brand" href="#">Instituto Privado &quot;El Salvador&quot;</a>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//         </button>


//         <div className="collapse navbar-collapse d-flex justify-content-end">

//             <ul className="nav navbar-nav justify-content-end" style={{ display: " inline-block" }}>
//                 <li className="nav-item">
//                     {
//                         !loading && authUser && (

//                             <Notificaciones />





//                         )
//                     }

//                 </li>
//                 <li className="nav-item">

//                     <a className="nav-link active" href="/gestion/institucional">Institucional <span className="sr-only">(current)</span></a>

//                 </li>




//             </ul>

//         </div>
//     </div>
// </nav>

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