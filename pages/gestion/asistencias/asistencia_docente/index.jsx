import { Layout } from "../../../../components/layout";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  FormControl,
  Button,
  Container,
  Grid,
  InputLabel,
  Autocomplete,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Typography,
  Modal,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import Switch from "@mui/material/Switch";
// DATEPICKER
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Select from "@mui/material/Select";
import { usePagination } from "../../../../components/hooks/paginationHook";
import { Add, Close, Search } from "@mui/icons-material";
import { useAuth } from "../../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import Loading from "../../../../components/loading";
import "dayjs/locale/es-mx";

export default function Asistencias() {
  const [pagina, setPagina] = useState(1);
  const pageSize = 5;
  const [presente, setPresente] = useState(false);
  const [ausente, setAusente] = useState(false);
  const [llegadaTarde, setLlegadaTarde] = useState(false);
  const [aj, setAj] = useState(false);
  const [mf, setMf] = useState(false);
  const [asistencias, setAsistencias] = useState();
  const cantidadPaginas = Math.ceil(asistencias?.length / pageSize);
  const paginacion = usePagination(asistencias || [], pageSize);
  const [fecha, setFecha] = useState(null);

  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [cargandoInfo, setCargandoInfo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  let queryParams = [];

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerDocentes();
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        listarAsistencias();
      }
    }
  }, [loading, authUser]);
  const tienePermisos = () => {
    return (
      authUser.rol?.tipo === "Administrador" ||
      authUser.rol?.tipo === "Director" ||
      authUser.rol?.tipo === "Vicedirector" ||
      authUser.rol?.tipo === "Preceptor"
    );
  };
  const listarAsistencias = async () => {
    if (idDocente) {
      queryParams.push({ idDocente });
    }
    if (fecha) {
      queryParams.push({
        fecha: fecha.toLocaleDateString("en-GB").split("T")[0],
      });
    }
    let params = "";
    queryParams.forEach((qp) => {
      for (const key in qp) {
        params += `${key}=${qp[key]}&`;
      }
    });
    console.log(params);
    setCargandoInfo(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente?${params}`
    );
    setCargandoInfo(false);
    if (res.data) {
      setAsistencias(res.data);
    }
  };

  const traerDocentes = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/`
    );
    console.log(res.data);
    if (res.data) {
      setDocentes(res.data);
    }
  };
  const [docentes, setDocentes] = useState([]);
  const [idDocente, setIdDocente] = useState("");

  const handleDocente = (e, newValue) => {
    if (newValue) {
      setIdDocente(newValue.id);
    } else {
      setIdDocente("");
    }
  };

  const handlerCambioPagina = (e, pagina) => {
    setPagina(pagina);
    paginacion.saltar(pagina);
  };

  const handleFecha = (value) => {
    setFecha(new Date(value));
  };
  const resetValues = () => {
    setIdDocente("");
    setFecha(new Date());
    queryParams = [];
  };
  const bloquearCheck = (a) => {
    return (
      a.presente ||
      a.ausente ||
      a.ausentejustificado ||
      a.llegadatarde ||
      a.llegadatardejustificada ||
      a.mediafalta ||
      a.mediafaltajustificada
    );
  };
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const onSave = async (id) => {
    setGuardando(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente/update/${id}`,
      {
        presente: presente,
        ausente: ausente,
        ausenteJustificado: aj,
        llegadaTarde: llegadaTarde,
        mediaFalta: mf,
        idUsuario: authUser?.id,
        motivo: motivo,
      }
    );
    console.log(res.data);
    setGuardando(false);
    onCancel();
    listarAsistencias();
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    if (open) {
      handleClose();
    }
  };
  const [open, setOpen] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [asistenciaId, setAsistenciaId] = useState(0);
  const handleMotivo = (e) => {
    setMotivo(e.target.value);
  };
  const handleOpen = (asistencia) => {
    setMotivo(asistencia.motivo);
    setAsistenciaId(asistencia.id);
    setOpen(true);
  };

  const handleClose = () => {
    setMotivo("");
    setAsistenciaId(0);
    setOpen(false);
  };
  const handlePresente = (e, checked) => {
    setPresente(checked);
    setAusente(false);
    setLlegadaTarde(false);
    setAj(false);
    setMf(false);
  };
  const handleAusente = (e, checked) => {
    setPresente(false);
    setAusente(checked);
    setLlegadaTarde(false);
    setAj(false);
    setMf(false);
  };
  const handleLlegadaTarde = (e, checked) => {
    setPresente(false);
    setAusente(false);
    setLlegadaTarde(checked);
    setAj(false);
    setMf(false);
  };
  const handleAj = (e, checked) => {
    setPresente(false);
    setAusente(false);
    setLlegadaTarde(false);
    setAj(checked);
    setMf(false);
  };
  const handleMf = (e, checked) => {
    setPresente(false);
    setAusente(false);
    setLlegadaTarde(false);
    setAj(false);
    setMf(checked);
  };

  return (
    <Layout>
      <Container maxWidth="xl" style={{ position: "relative" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Asistencia Docente
        </Typography>

        {/* MODAL */}
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "320px",
              width: "min(100% - 15px, 500px)",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Ingrese motivo
            </Typography>
            <TextareaAutosize
              style={{
                border: "2px solid #ccc",
                borderRadius: "10px",
                height: "150px",
                width: "min(100% - 15px, 410px)",
                margin: "auto",
                maxLenght: "300",
                resize: "none",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
              name="motivo"
              value={motivo}
              onChange={handleMotivo}
            ></TextareaAutosize>

            <Stack direction="row">
              <Button
                variant="contained"
                type="submit"
                style={{ marginLeft: "48px", marginTop: "10px" }}
                // onClick={handleClose}
                onClick={() => onSave(asistenciaId)}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                color="error"
                type="submit"
                style={{ marginLeft: "10px", marginTop: "10px" }}
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </Modal>
        {/* MODAL */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>
              <FormControl>
                <LocalizationProvider
                  adapterLocale="es-mx"
                  dateAdapter={AdapterDayjs}
                >
                  <MobileDatePicker
                    label="Fecha"
                    value={fecha}
                    onChange={handleFecha}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>
              Buscar Docente:
            </Typography>

            <Box sx={{ marginTop: "25px" }}>
              <FormControl
                style={{ marginRight: "20px", marginBottom: "25px" }}
              >
                <Autocomplete
                  sx={{ width: "250px" }}
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  // value={value}
                  name="idAlumno"
                  onChange={handleDocente}
                  getOptionLabel={(docente) =>
                    `${docente?.apellido} ${docente?.nombre}`
                  }
                  options={docentes}
                  isOptionEqualToValue={(option, value) =>
                    option?.apellido === value?.apellido
                  }
                  noOptionsText={"No existe un docente con ese nombre"}
                  renderOption={(props, docente) => (
                    <Box component="li" {...props} key={docente?.id}>
                      {docente?.apellido} {docente?.nombre}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Docente" />
                  )}
                />
              </FormControl>
            </Box>

            <Box flexDirection={"row"}>
              <Button
                variant="contained"
                onClick={listarAsistencias}
                endIcon={<Search />}
                color="info"
              >
                Buscar
              </Button>
              <Button
                variant="outlined"
                sx={{ mx: 1 }}
                onClick={async () => {
                  resetValues();
                  await listarAsistencias();
                }}
                endIcon={<Close />}
                color="info"
              >
                Quitar Filtros
              </Button>
            </Box>
          </Grid>

        </Grid>
        {cargandoInfo && (
          <Container sx={{ textAlign: "center" }}>
            <Loading sixe={80} />
          </Container>
        )}
        {!cargandoInfo && (
          <TableContainer component={Paper} style={{ marginTop: "40px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell scope="col">Fecha</TableCell>
                  <TableCell scope="col">Legajo</TableCell>
                  <TableCell scope="col">Apellido</TableCell>
                  <TableCell scope="col">Nombre</TableCell>
                  {/* <TableCell scope="col">Preceptor</TableCell> */}
                  <TableCell align="center" scope="col">
                    Presente
                  </TableCell>
                  <TableCell align="center" scope="col">
                    Ausente
                  </TableCell>
                  <TableCell align="center" scope="col">
                    Ausente Justificado
                  </TableCell>
                  <TableCell align="center" scope="col">
                    Llegada Tarde
                  </TableCell>
                  <TableCell align="center" scope="col">
                    Media Falta
                  </TableCell>
                  <TableCell scope="col">
                    {!guardando && <span>Acción</span>}
                    {guardando && <Loading size={30} />}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginacion.dataActual().map((a, i) =>
                  !a.presente &&
                    !a.ausente &&
                    !a.ausentejustificado &&
                    !a.llegadatarde &&
                    !a.llegadatardejustificada &&
                    !a.mediafalta &&
                    !a.mediafaltajustificada ? (
                    <TableRow key={a.id}>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.creadoen}
                      </TableCell>
                      <TableCell className="col-md-1">
                        {a.docente?.legajo}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.apellido}{" "}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.nombre}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="presente"
                            checked={presente}
                            onChange={handlePresente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.presente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="ausente"
                            checked={ausente}
                            onChange={handleAusente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch checked={aj} onChange={handleAj} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausentejustificado}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="llegadaTarde"
                            checked={llegadaTarde}
                            onChange={handleLlegadaTarde}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.llegadatarde}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch name="mf" checked={mf} onChange={handleMf} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.mediafalta}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-2">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Stack spacing={1} direction="row">
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "lightblue",
                                color: "black",
                              }}
                              onClick={() => onSave(a?.id)}
                            >
                              Cargar
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => onCancel()}
                            >
                              Cancelar
                            </Button>
                          </Stack>
                        ) : (
                          <Stack spacing={1} direction="row">
                            <IconButton
                              size="large"
                              onClick={() =>
                                setInEditMode({
                                  status: true,
                                  rowKey: a?.id,
                                })
                              }
                              color="success"
                            >
                              <Add />
                            </IconButton>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : a.motivo ? (
                    <TableRow
                      key={a.id}
                      style={{
                        backgroundColor: "lightsteelblue",
                        color: "black",
                      }}
                    >
                      <TableCell className="col-md-1 text-capitalize">
                        {a.creadoen}
                      </TableCell>
                      <TableCell className="col-md-1">
                        {a.docente?.legajo}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.apellido}{" "}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.nombre}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="presente"
                            checked={presente}
                            onChange={handlePresente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.presente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="ausente"
                            checked={ausente}
                            onChange={handleAusente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch checked={aj} onChange={handleAj} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausentejustificado}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="llegadaTarde"
                            checked={llegadaTarde}
                            onChange={handleLlegadaTarde}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.llegadatarde}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch name="mf" checked={mf} s onChange={handleMf} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.mediafalta}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-2">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <React.Fragment>
                            <Stack spacing={1} direction="row">
                              <Button
                                variant="contained"
                                color="error"
                                style={{ marginLeft: 8 }}
                                onClick={() => onCancel()}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          </React.Fragment>
                        ) : (
                          <Stack spacing={1} direction="row">
                                                     <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "lightblue",
                                color: "black",
                              }}
                              onClick={() =>
                                router.push(
                                  `/gestion/asistencias/asistencia_docente/${a?.id}`
                                )
                              }
                            >
                              Info.
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={a.id}>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.creadoen}
                      </TableCell>
                      <TableCell className="col-md-1">
                        {a.docente?.legajo}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.apellido}{" "}
                      </TableCell>
                      <TableCell className="col-md-1 text-capitalize">
                        {a.docente?.nombre}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="presente"
                            checked={presente}
                            onChange={handlePresente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.presente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="ausente"
                            checked={ausente}
                            onChange={handleAusente}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausente}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch checked={aj} onChange={handleAj} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.ausentejustificado}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>
                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch
                            name="llegadaTarde"
                            checked={llegadaTarde}
                            onChange={handleLlegadaTarde}
                          />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.llegadatarde}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-1 ">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <Switch name="mf" checked={mf} onChange={handleMf} />
                        ) : (
                          <Switch
                            type="checkbox"
                            checked={a.mediafalta}
                            disabled={bloquearCheck(a)}
                          />
                        )}
                      </TableCell>

                      <TableCell className="col-md-2">
                        {inEditMode.status && inEditMode.rowKey === a?.id ? (
                          <React.Fragment>
                            <Stack spacing={1} direction="row">
                              {
                                aj ? (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleOpen(a)}
                                  >
                                    Actualizar
                                  </Button>
                                ) : (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => onSave(a.id)}
                                  >
                                    Actualizar
                                  </Button>
                                )
                              }

                              <Button
                                variant="contained"
                                color="error"
                                style={{ marginLeft: 8 }}
                                onClick={() => onCancel()}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          </React.Fragment>
                        ) : (
                          <Stack spacing={1} direction="row">
                            <Button
                              variant="contained"
                              onClick={() =>
                                setInEditMode({
                                  status: true,
                                  rowKey: a?.id,
                                })
                              }
                            >
                              Editar
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "lightblue",
                                color: "black",
                              }}
                              onClick={() =>
                                router.push(
                                  `/gestion/asistencias/asistencia_docente/${a?.id}`
                                )
                              }
                            >
                              Info.
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!cargandoInfo && asistencias && asistencias?.length > 0 && (
          <Container
            maxWidth={"lg"}
            sx={{ marginTop: 2, width: "fit-content", textAlign: "center" }}
          >
            <Pagination
              count={cantidadPaginas}
              size="large"
              page={pagina}
              variant="outlined"
              shape="circular"
              onChange={handlerCambioPagina}
            />
          </Container>
        )}
      </Container>
    </Layout>
  );
}
