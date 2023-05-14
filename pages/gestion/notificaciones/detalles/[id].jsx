import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import Loading from "../../../../components/loading";
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import styles from "../../../../styles/fontSize.module.css";
import React from "react";
import { useAuth } from "../../../../components/context/authUserProvider";

export default function DetallesNoticia() {
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState();
  const { loading, authUser } = useAuth();
  const [asunto, setAsunto] = useState("");
  const [contenido, setContenido] = useState("");

  const handleAsunto = (e) => {
    setAsunto(e.target.value);
    console.log(asunto);
  };
  const handleContenido = (e) => {
    setContenido(e.target.value);
    console.log(contenido);
  };

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerDetalle();
      }
    }
  }, [loading, authUser, id]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Preceptor" ||
      authUser?.rol?.tipo === "Estudiante"
    );
  };
  const traerDetalle = async () => {
    if (id) {
      setCargando(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/detalles/${id}`
      );
      if (res.data) {
        console.log(res.data);
        setNotificacion(res.data);
      }
      setCargando(false);
    }
  };
  const onSave = async (id) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notificaciones/update/${id}`,
      {
        asunto: (asunto.length && asunto) || notificacion?.asunto,
        contenido: (contenido.length && contenido) || notificacion?.contenido,
        idUsuario: notificacion.usuario?.id,
      }
    );
    onCancel();
    if (res.status === 200) {
      router.push("/gestion/notificaciones");
    }
  };
  const [editMode, setEditMode] = useState(false);
  const onCancel = () => {
    // reset the inEditMode state value
    setEditMode(false);
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Detalle de Notificación
      </Typography>
      {!cargando && notificacion && (
        <div className="container text-center">
          <Card
            sx={{
              minWidth: "300px",
              height: "400px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              backgroundColor: "white",
              borderRadius: "30px",
            }}
          >
            <div>
              {editMode ? (
                <Box>
                  <Stack
                    spacing={1}
                    direction="row"
                    sx={{ marginLeft: "30px", marginTop: "19px" }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      onClick={(e) => onSave(notificacion?.id)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "gray",
                        ":hover": {
                          backgroundColor: "gray",
                        },
                      }}
                      onClick={() => onCancel()}
                    >
                      {" "}
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginLeft: "40px", marginTop: "20px" }}
                    >
                      Eliminar
                    </Button>
                  </Stack>

                  <Grid>
                    <Grid item>
                      <TextField
                        variant="standard"
                        autoFocus
                        fullWidth
                        sx={{ alignItems: "center" }}
                        maxRows={2}
                        inputProps={{
                          className: styles.Typography,
                          style: {
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "24.6px",
                            marginTop: "20.5px",
                            marginLeft: "30px",
                            marginRight: "30px",
                          },
                          disableunderline: "true",
                        }}
                        placeholder={notificacion?.asunto}
                        name="asunto"
                        defaultValue={asunto}
                        onChange={handleAsunto}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="standard"
                        multiline
                        autoFocus
                        fullWidth
                        maxRows={7}
                        inputProps={{
                          className: styles.Typography2,
                          style: {
                            marginBottom: "25px",
                            marginLeft: "30px",
                            marginRight: "20px",
                          },
                          disableunderline: "true",
                        }}
                        placeholder={notificacion?.contenido}
                        name="contenido"
                        defaultValue={contenido}
                        onChange={handleContenido}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        sx={{ marginBottom: "30px", marginLeft: "30px" }}
                        className={`${styles.Typography3}`}
                      >
                        {" "}
                        <strong>
                          Atte. {notificacion.usuario?.nombre}{" "}
                          {notificacion.usuario?.apellido} (
                          {notificacion.usuario?.rol?.tipo})
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  {authUser?.rol?.tipo !== "Estudiante" &&
                    authUser?.rol?.tipo !== "Tutor" && (
                      <Button
                        variant="contained"
                        sx={{ marginLeft: "30px", marginTop: "20px" }}
                        onClick={() => {
                          setEditMode(true);
                          setAsunto(notificacion?.asunto);
                          setContenido(notificacion?.contenido);
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  <Grid>
                    <Grid item>
                      <Typography
                        textAlign="center"
                        variant={"h6"}
                        sx={{
                          marginBottom: "30px",
                          marginTop: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                        className={`${styles.Typography}`}
                      >
                        <strong>{notificacion?.asunto}</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant={"body2"}
                        sx={{
                          marginBottom: "30px",
                          marginLeft: "30px",
                          marginRight: "20px",
                        }}
                        className={`${styles.Typography2}`}
                      >
                        {notificacion?.contenido}{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="caption"
                        sx={{ marginBottom: "30px", marginLeft: "30px" }}
                        className={`${styles.Typography3}`}
                      >
                        {" "}
                        <strong>
                          Atte. {notificacion.usuario?.nombre}{" "}
                          {notificacion.usuario?.apellido} (
                          {notificacion.usuario?.rol?.tipo})
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </div>
          </Card>
        </div>
      )}
      {cargando && (
        <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
          <Loading size={80} />
        </Container>
      )}
    </Layout>
  );
}
