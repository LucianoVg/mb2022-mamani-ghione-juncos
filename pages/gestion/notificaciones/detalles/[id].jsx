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
import { clamp } from "lodash";

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
      authUser?.rol?.tipo === "Estudiante" ||
      authUser?.rol?.tipo === "Tutor"
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
                        sx={{ alignItems: "center", marginTop: "-9px" }}
                        maxRows={2}
                        inputProps={{
                          // className: styles.Typography,
                          style: {
                            fontSize: "clamp(25px, 3vw, 50px)",
                            lineHeight: "clamp(25px, 3vw, 40px)",
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "24.6px",
                            marginTop: "19.5px",
                            marginLeft: "30px",
                            marginRight: "30px",
                          },
                          disableunderline: "true",
                          maxLength: 30,
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
                        sx={{ marginTop: "-9px" }}
                        inputProps={{
                          // className: styles.Typography2,
                          style: {
                            fontSize: "clamp(15px, 2vw, 40px)",
                            lineHeight: "clamp(20px, 3vw, 40px)",
                            marginBottom: "25px",
                            marginLeft: "30px",
                            marginRight: "20px",
                          },
                          disableunderline: "true",
                          maxLength: 200,
                        }}
                        placeholder={notificacion?.contenido}
                        name="contenido"
                        defaultValue={contenido}
                        onChange={handleContenido}
                      />
                    </Grid>
                    <Grid item sx={{ marginTop: "-8px" }}>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "30px", fontSize: "clamp(15px, 2vw, 40px)" }}
                      // className={`${styles.Typography3}`}
                      >
                        {" "}
                        <strong>
                          Atte. {notificacion.usuario?.nombre}{" "}
                          {notificacion.usuario?.apellido} (
                          {notificacion.usuario?.rol?.tipo})
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Grid container direction="row-reverse" >
                        <Grid item sx={{ marginRight: "50px" }}>
                          {
                            notificacion?.notificacionxalumno.length > 0 && (authUser?.rol?.tipo !== "Estudiante" ||
                              authUser?.rol?.tipo !== "Tutor") ? (
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "clamp(15px, 2vw, 40px)" }}
                              // className={`${styles.Typography3}`}
                              >
                                {" "}
                                <strong>
                                  Enviado a: {notificacion.notificacionxalumno[0]?.alumnoxcursoxdivision?.cursoxdivision?.curso?.nombre}° {" "} Año {" "} &quot;{notificacion.notificacionxalumno[0]?.alumnoxcursoxdivision?.cursoxdivision?.division?.division}&quot;
                                </strong>
                              </Typography>
                            ) : (
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "clamp(15px, 2vw, 40px)" }}
                              // className={`${styles.Typography3}`}
                              >
                                {" "}
                                <strong>
                                  Enviado a: {notificacion.notificacionxtutor[0]?.tutor?.nombre} {notificacion.notificacionxtutor[0]?.tutor?.apellido}
                                </strong>
                              </Typography>
                            )
                          }
                        </Grid>
                      </Grid>
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
                  {
                    (authUser?.rol?.tipo === "Estudiante" ||
                    authUser?.rol?.tipo === "Tutor") && (
                      <Button
                        variant="contained"
                        disabled
                        sx={{ marginLeft: "30px", marginTop: "20px", opacity: "0%" }}
                        onClick={() => {
                          setEditMode(true);
                          setAsunto(notificacion?.asunto);
                          setContenido(notificacion?.contenido);
                        }}
                      >
                        Editar
                      </Button>
                    )
                  }
                  <Grid>

                    <Grid item>
                      <Typography
                        textAlign="center"
                        variant={"h6"}
                        sx={{
                          fontSize: "clamp(25px, 3vw, 50px)",
                          lineHeight: "clamp(25px, 3vw, 40px)",
                          marginBottom: "30px",
                          marginTop: "20px",
                          marginLeft: "30px",
                          marginRight: "30px",
                        }}
                      // className={`${styles.Typography}`}
                      >
                        <strong>{notificacion?.asunto}</strong>{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant={"body2"}
                        sx={{
                          fontSize: "clamp(15px, 2vw, 40px)",
                          lineHeight: "clamp(20px, 3vw, 40px)",
                          marginBottom: "30px",
                          marginLeft: "30px",
                          marginRight: "20px",
                        }}
                      // className={`${styles.Typography2}`}
                      >
                        {notificacion?.contenido}{" "}
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Typography
                        variant="caption"
                        sx={{ marginBottom: "35px", marginLeft: "30px", fontSize: "clamp(15px, 2vw, 40px)" }}
                      // className={`${styles.Typography3}`}
                      >
                        {" "}
                        <strong>
                          Atte. {notificacion.usuario?.nombre}{" "}
                          {notificacion.usuario?.apellido} (
                          {notificacion.usuario?.rol?.tipo})
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item >
                      <Grid container direction="row-reverse" >
                        <Grid item sx={{ marginRight: "50px" }}>
                          {
                            authUser?.rol?.tipo != "Estudiante" &&
                            authUser?.rol?.tipo != "Tutor" && (
                              notificacion?.notificacionxalumno.length > 0 ? (
                                <Typography
                                  variant="caption"
                                  sx={{ fontSize: "clamp(15px, 2vw, 40px)" }}
                                // className={`${styles.Typography3}`}
                                >
                                  {" "}
                                  <strong>
                                    Enviado a: {notificacion.notificacionxalumno[0]?.alumnoxcursoxdivision?.cursoxdivision?.curso?.nombre}° {" "} Año {" "} &quot;{notificacion.notificacionxalumno[0]?.alumnoxcursoxdivision?.cursoxdivision?.division?.division}&quot;
                                  </strong>
                                </Typography>
                              ) : (
                                <Typography
                                  variant="caption"
                                  sx={{ fontSize: "clamp(15px, 2vw, 40px)" }}
                                // className={`${styles.Typography3}`}
                                >
                                  {" "}
                                  <strong>
                                    Enviado a: {notificacion.notificacionxtutor[0]?.tutor?.nombre} {notificacion.notificacionxtutor[0]?.tutor?.apellido}
                                  </strong>
                                </Typography>
                              )
                            )}

                        </Grid>
                      </Grid>
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
