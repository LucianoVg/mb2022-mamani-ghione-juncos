import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import {
  Box,
  Button,
  TextareaAutosize,
  Container,
  IconButton,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Layout } from "../../../components/layout";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import styles from "../../../styles/tarjetaNoticias.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../../components/context/authUserProvider";
import Loading from "../../../components/loading";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ListadoNotificaciones() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const { loading, authUser } = useAuth();
  const [cargando, setCargando] = useState(false);
  let idUsuario =
    authUser?.rol?.tipo === "Estudiante"
      ? authUser?.alumnoxcursoxdivision1[0]?.id
      : authUser?.id;
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
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        if (authUser?.rol?.tipo === "Administrador") {
          ListarNotificacionesAdmin()
        }
        if (authUser?.rol && authUser?.rol?.tipo === "Estudiante") {
          ListarNotificacionesAlumno();
        }
        if (authUser?.rol && authUser?.rol?.tipo === "Tutor") {
          ListarNotificacionesTutor();
        }
      }
    }
  }, [authUser?.id, authUser?.rol?.tipo, loading, authUser]);

  const [notificaciones, setNotificaciones] = useState();
  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Preceptor" ||
      authUser?.rol?.tipo === "Estudiante" ||
      authUser?.rol?.tipo === "Tutor"
    );
  };
  // const traerUsuario = async () => {
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
  //     if (res.data) {
  //         console.log(res.data);
  //         setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
  //     }
  // }
  const ListarNotificacionesAdmin = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/listar_notificaciones`
    );
    if (res.status === 200) {
      console.log(res.data);
      setNotificaciones(res.data);
    }
    setCargando(false);
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Notificaciones recibidas
      </Typography>
      <div xs={12}>
        {!cargando && (
          <Box
            className={`${styles.box}`}
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: 550,
              minWidth: "280px",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              scrollButtons="auto"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                width: "350px",
                minWidth: "100px",
              }}
            >
              {notificaciones && authUser?.rol?.tipo != "Administrador" &&
                notificaciones?.map((n, i) => (
                  <Tab
                    key={i}
                    label={n.notificacion?.asunto}
                    {...a11yProps(i)}
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                  />
                ))}
              {notificaciones && authUser?.rol?.tipo === "Administrador" &&
                notificaciones?.map((n, i) => (
                  <Tab
                    key={i}
                    label={n.asunto}
                    {...a11yProps(i)}
                    sx={{ borderBottom: 1, borderColor: "divider" }}
                  />
                ))}
            </Tabs>
            {notificaciones && authUser?.rol?.tipo != "Administrador" &&
              notificaciones?.map((n, i) => (
                <TabPanel
                  key={i}
                  value={value}
                  index={i}
                  style={{ width: "680px" }}
                  container="true"
                >
                  <Typography
                    textAlign="center"
                    variant={"h6"}
                    sx={{
                      marginLeft: "30px",
                      marginTop: "50px",
                      marginBottom: "30px", fontSize: "clamp(25px, 3vw, 50px)",
                      lineHeight: "clamp(25px, 3vw, 40px)",
                    }}
                  // className={`${styles.Typography}`}
                  >
                    <strong>{n.notificacion?.asunto}</strong>{" "}
                  </Typography>
                  <Typography
                    variant={"body2"}
                    sx={{
                      marginLeft: "30px",
                      marginTop: "20px",
                      marginBottom: "30px", fontSize: "clamp(15px, 2vw, 40px)",
                      lineHeight: "clamp(20px, 3vw, 40px)",
                    }}
                  // className={`${styles.Typography2}`}
                  >
                    {n.notificacion?.contenido}{" "}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: "30px",
                      marginTop: "20px",
                      fontSize: "clamp(15px, 2vw, 25px)"
                    }}
                  // className={`${styles.Typography3}`}
                  >
                    {" "}
                    <strong>
                      Atte. {n.notificacion?.usuario?.nombre}{" "}
                      {n.notificacion?.usuario?.apellido} (
                      {n.notificacion?.usuario?.rol?.tipo})
                    </strong>
                  </Typography>
                </TabPanel>
              ))}
            {notificaciones && authUser?.rol?.tipo === "Administrador" &&
              notificaciones?.map((n, i) => (
                <TabPanel
                  key={i}
                  value={value}
                  index={i}
                  style={{ width: "680px" }}
                  container="true"
                >
                  <Typography
                    textAlign="center"
                    variant={"h6"}
                    sx={{
                      marginLeft: "30px",
                      marginTop: "50px",
                      marginBottom: "40px", fontSize: "clamp(25px, 3vw, 50px)",
                      lineHeight: "clamp(25px, 3vw, 20px)",
                    }}

                  // className={`${styles.Typography}`}
                  >
                    <strong>{n.asunto}</strong>{" "}
                  </Typography>
                  <Typography
                    variant={"body2"}
                    sx={{
                      marginLeft: "30px",
                      marginBottom: "40px", fontSize: "clamp(15px, 2vw, 40px)",
                      lineHeight: "clamp(20px, 3vw, 40px)",
                    }}
                  // className={`${styles.Typography2}`}
                  >
                    {n.contenido}{" "}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: "30px",
                      fontSize: "clamp(15px, 2vw, 25px)"
                    }}
                  // className={`${styles.Typography3}`}
                  >
                    {" "}
                    <strong>
                      Atte. {n.usuario?.nombre}{" "}
                      {n.usuario?.apellido} (
                      {n.usuario?.rol?.tipo})
                    </strong>
                  </Typography>
                </TabPanel>
              ))}
          </Box>
        )}
        {cargando && (
          <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
            <Loading size={80} />
          </Container>
        )}
      </div>
    </Layout>
  );
}
