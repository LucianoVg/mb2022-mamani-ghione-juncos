import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../../../components/layout";
import {
  Box,
  Button,
  TextareaAutosize,
  Container,
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../../components/context/authUserProvider";
import Loading from "../../../components/loading";

const Notificaciones = () => {
  const router = useRouter();
  const { loading, authUser } = useAuth();
  const [notificacion, setNotificacion] = useState({
    asunto: "",
    contenido: "",
  });
  const [listNotificaciones, setListNotificaciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idCurso, setIdCurso] = useState("");
  const [cargandoInfo, setCargandoInfo] = useState(false);
  const [tutores, setTutores] = useState([]);
  const [idTutor, setIdTutor] = useState("");

  const handleTutor = (e, newValue) => {
    if (newValue) {
      setIdTutor(newValue.id);
    } else {
      setIdTutor("");
    }
  };

  const handleCurso = (e) => {
    setIdCurso(e.target.value);
  };

  const handleNotificacion = (e) => {
    setNotificacion({ ...notificacion, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/");
      } else {
        ListarNotificaciones();
        listarCursos();
        listarTutores();
      }
    }
  }, [loading, authUser]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Preceptor"
    );
  };

  const listarTutores = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/tutores`
    );
    if (res.status === 200 && res.data) {
      setTutores(res.data);
    }
  };
  const listarCursos = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`)
      .then((res) => {
        console.log(res.data);
        setCursos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const ListarNotificaciones = async () => {
    setCargandoInfo(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/listar_notificaciones`
    );
    console.log(res.data);
    setListNotificaciones(res.data);
    setCargandoInfo(false);
  };
  const CrearNotificacion = async (e) => {
    e.preventDefault();
    console.log(notificacion);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones`,
      {
        asunto: notificacion.asunto,
        contenido: notificacion.contenido,
        fecha: new Date().toLocaleDateString("es-AR").split("T")[0],
        idCurso: idCurso,
        idUsuario: authUser?.id,
        idTutor: idTutor,
      }
    );
    if (res.status === 200) {
      router.reload();
    } else {
      console.error(res.data);
    }
  };
  const [inEditMode, setInEditMode] = useState({
    status: false,
  });

  return (
    <Layout>
      <div>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              Envio de Notificaciones
            </Typography>
            <Box direction="column">
              <Box direction="row">
                {inEditMode.status === true ? (
                  <Box>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      style={{ marginRight: "20px", marginBottom: "20px" }}
                      onClick={() => {
                        setInEditMode({ status: false });
                      }}
                    >
                      Volver a notificación para tutor
                    </Button>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Curso
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={idCurso}
                          name="idCurso"
                          label="Curso"
                          onChange={handleCurso}
                          sx={{ width: "90px", marginRight: "20px" }}
                          MenuProps={{ disableScrollLock: true }}
                        >
                          <MenuItem value={"todos"}>Todos</MenuItem>
                          {cursos &&
                            cursos.map((c, i) => (
                              <MenuItem key={i} value={c.id}>
                                {c.curso?.nombre} {c.division?.division}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      style={{ marginRight: "20px", marginBottom: "20px" }}
                      onClick={() => {
                        setInEditMode({ status: true });
                      }}
                    >
                      Ir a notificación por curso
                    </Button>
                    <Box>
                      <FormControl
                        style={{ marginRight: "20px", marginBottom: "25px" }}
                      >
                        <Autocomplete
                          sx={{ width: "250px" }}
                          disablePortal
                          id="combo-box-demo"
                          // value={value}
                          name="idTutor"
                          onChange={handleTutor}
                          getOptionLabel={(tutor) =>
                            `${tutor?.apellido} ${tutor?.nombre}`
                          }
                          options={tutores}
                          isOptionEqualToValue={(option, value) =>
                            option?.apellido === value?.apellido
                          }
                          noOptionsText={"No existe un tutor con ese nombre"}
                          renderOption={(props, tutor) => (
                            <Box component="li" {...props} key={tutor?.id}>
                              {tutor?.apellido} {tutor?.nombre}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField {...params} label="Tutores" />
                          )}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                )}
              </Box>

              <Box component={"form"} onSubmit={CrearNotificacion}>
                <h2>
                  <strong>Asunto</strong>
                </h2>
                <TextareaAutosize
                  name="asunto"
                  value={notificacion.asunto}
                  onChange={handleNotificacion}
                  style={{
                    width: "350px",
                    height: "35px",
                    resize: "none",
                    fontSize: "20px",
                  }}
                />
                <h2>
                  <strong>Contenido</strong>
                </h2>
                <TextareaAutosize
                  name="contenido"
                  value={notificacion.contenido}
                  onChange={handleNotificacion}
                  maxLength={300}
                  style={{
                    width: "350px",
                    maxLenght: "300",
                    height: "200px",
                    resize: "none",
                    fontSize: "20px",
                  }}
                />

                {/* PERMITIR COMO MAXIMO 300 CARACTERES PARA EVITAR QUE SE BUGUE EN EL CELULAR */}
                <Box xs={12} sx={{ mt: 2 }}>
                  <Button variant="contained" type="submit">
                    Enviar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs>
            {cargandoInfo && (
              <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                <Loading size={50} />
              </Container>
            )}
            {!cargandoInfo && (
              <>
                <h1>Notificaciones enviadas</h1>
                <Box sx={{ width: "350px" }}>
                  <List
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      border: "0 10px 15px black",
                      borderRadius: "15px",
                    }}
                  >
                    {listNotificaciones.map((n, i) => (
                      <ListItem disablePadding key={i} value={n.id}>
                        <ListItemButton
                          component="a"
                          onClick={() =>
                            router.push(
                              `/gestion/notificaciones/detalles/${n.id}`
                            )
                          }
                        >
                          <ListItemText primary={n.asunto} />
                        </ListItemButton>
                        <Divider />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Notificaciones;
