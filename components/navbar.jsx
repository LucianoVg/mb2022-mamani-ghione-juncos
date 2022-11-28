import { useAuth } from "./context/authUserProvider"
import { Toolbar, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Notificacion from './notificacion_panel'
import { useRouter } from "next/router";

const navWidth = 285;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: navWidth,
        width: `calc(100% - ${navWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export const Navbar = ({ open, toggleDrawer }) => {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    return (
        <AppBar position="absolute" open={open}>
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
        </AppBar>
    )
}

