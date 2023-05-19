import { useEffect, useState } from "react";
import axios from "axios";

import { Tooltip, IconButton, Container, Badge } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Popover from "@mui/material/Popover";
import { useAuth } from "./context/authUserProvider";

export const Notificacion = () => {
  const { loading, authUser } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    if (!localStorage.getItem(idUsuario.toString()) && notificaciones.length) {
      localStorage.setItem(idUsuario.toString(), true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let idUsuario =
    authUser?.rol?.tipo === "Estudiante"
      ? authUser?.alumnoxcursoxdivision1[0]?.id
      : authUser?.id;
  useEffect(() => {
    if (!loading && authUser) {
      if (authUser?.rol && authUser?.rol?.tipo === "Estudiante") {
        ListarNotificacionesAlumno();
      }
      if (authUser?.rol && authUser?.rol?.tipo === "Tutor") {
        ListarNotificacionesTutor();
      }
    }
  }, [loading, authUser, idUsuario]);

  const ListarNotificacionesAlumno = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/alumno/${idUsuario}`
    );
    if (res.status === 200) {
      setNotificaciones(res.data);
    }
  };
  const ListarNotificacionesTutor = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/tutor/${idUsuario}`
    );
    if (res.status === 200) {
      setNotificaciones(res.data);
    }
  };
  return (
    <Container>
      <Tooltip title="Ver Notificacion">
        <IconButton onClick={handleClick}>
          <Badge
            aria-describedby={id}
            variant="contained"
            badgeContent={
              !localStorage.getItem(idUsuario) && notificaciones.length
                ? notificaciones.length
                : null
            }
            color="info"
            style={{ float: "right" }}
          >
            <NotificationsRoundedIcon
              sx={{ cursor: "pointer", color: "white" }}
            />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
        PaperProps={{
          style: { width: "320px" },
        }}
      >
        <List>
          {(!notificaciones || notificaciones?.length === 0) && (
            <ListItem>
              <ListItemText>No hay notificaciones</ListItemText>
            </ListItem>
          )}
          {notificaciones &&
            notificaciones?.map((n, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  component="a"
                  href={`/gestion/notificaciones/detalles/${n.notificacion?.id}`}
                >
                  <ListItemText primary={n.notificacion?.asunto} />
                </ListItemButton>
              </ListItem>
            ))}

          {notificaciones && notificaciones?.length > 0 && (
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="/gestion/notificaciones/listado_notificaciones"
              >
                <ListItemText>
                  <div style={{ textAlign: "center" }}>
                    <strong>Ver todo</strong>
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Popover>
    </Container>
  );
};

export default Notificacion;
