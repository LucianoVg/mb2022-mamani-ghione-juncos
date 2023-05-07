import Link from "next/link";
import { useAuth } from "./context/authUserProvider";
import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  AppBar,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Notificacion from "./notificacion_panel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWindowSize from "./hooks/windowSize";
import axios from "axios";

export const Navbar = ({ toggleDrawer }) => {
  const { loading, authUser } = useAuth();
  const [title, setTitle] = useState('Instituto Privado "El Salvador"');
  const router = useRouter();
  const windowSize = useWindowSize();
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  useEffect(() => {
    setTitle(
      windowSize.width <= 900
        ? '"El Salvador"'
        : 'Instituto Privado "El Salvador"'
    );
    traerUsuario();
  }, [windowSize, usuario.rol, usuario.id]);
  const traerUsuario = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    if (res.status === 200) {
      setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo });
    }
  };

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
          <Typography
            variant="h7"
            component="div"
            sx={{ flexGrow: 1, fontSize: "20px" }}
          >
            <strong>{title}</strong>
          </Typography>
          {!loading && usuario.rol && (
            <Typography variant="body1" color={"white"} sx={{ mx: 2 }}>
              Logueado como <strong>{usuario.rol}</strong>
            </Typography>
          )}
          <Link
            href={"/gestion/institucional"}
            style={{ textDecoration: "none", color: "#f9f9f9" }}
          >
            <Button color="inherit" style={{ marginRight: "10px" }}>
              Institucional
            </Button>
          </Link>
          {
            // authUser && (usuario.rol == 'Estudiante'
            //     || usuario.rol == 'Tutor' || usuario.rol == 'Administrador') &&
            !loading &&
              authUser &&
              (usuario.rol != "Docente" ||
                usuario.rol != "Director" ||
                usuario.rol != "Vicedirector" ||
                usuario.rol != "Preceptor" ||
                usuario.rol != "Secretaria") && (
                <>
                  <div
                    style={{
                      alignContent: "right",
                      marginLeft: "-30px",
                      marginRight: "-20px",
                    }}
                  >
                    <Notificacion disablePadding />
                  </div>
                </>
              )
          }
          {!loading && authUser && (
            <>
              <IconButton onClick={() => router.push(`/gestion/cuenta`)}>
                <AccountCircleIcon sx={{ color: "white" }} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
