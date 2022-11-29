import Link from "next/link"
import { useAuth } from "./context/authUserProvider"
import { Toolbar, IconButton, Typography, Badge, Box, AppBar, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles';
import Notificacion from './notificacion_panel'
import { useRouter } from "next/router";

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: 280,
//         width: `calc(100% - ${280}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

export const Navbar = ({ toggleDrawer }) => {
    const { loading, authUser } = useAuth()
    const router = useRouter()
    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        // sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h7" component="div" sx={{ flexGrow: 1, fontSize: "20px" }}>
                        <strong>Instituto Privado &quot;El Salvador&quot;</strong>
                    </Typography>
                    <Link href={'/gestion/institucional'}>
                        <Button color="inherit" style={{ marginRight: "10px" }}>Institucional</Button>
                    </Link>
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
        </Box>
    )
}

