import { useAuth } from "./context/authUserProvider"
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export const Navbar = ({ toggleDrawer, open }) => {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{
                paddingRight: '24px', // keep right padding when drawer closed
                backgroundColor: '#3F51B5'
            }}>
                <a className="navbar-brand" href="/">Instituto Privado &quot;El Salvador&quot;</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/gestion/institucional">Insitucional <span className="sr-only">(current)</span></a>
                        {
                            !loading && authUser && (
                                <>
                                    <div style={{ alignContent: 'right', marginLeft: '-30px', marginRight: '-20px' }} >
                                        <FontAwesomeIcon
                                            icon={faBell} />
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            </nav>
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
        </>
    )
}