import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserProvider";
import { Layout } from "../../components/layout";
import {
  Box,
  Button,
  Stack,
  Autocomplete,
  Menu,
  Popover,
  TextareaAutosize,
  ButtonGroup,
  Container,
  IconButton,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
import Loading from "../../components/loading";

export default function Asistencias() {
  const [alumnos, setAlumnos] = useState([]);
  const [listado, setListado] = useState([]);
  const [mensual, setMensual] = useState([]);
  const [anual, setAnual] = useState([]);
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const { loading, authUser } = useAuth();
  const [idAlumno, setIdAlumno] = useState();
  const [mes, setMes] = useState(3);
  const router = useRouter();
  const [cargando1, setCargando1] = useState(false);
  const [cargando2, setCargando2] = useState(false);
  const [cargando3, setCargando3] = useState(false);
  const [nombreAlumno, setNombreAlumno] = useState();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/");
      } else {
        if (
          authUser?.rol?.tipo !== "Estudiante" &&
          authUser?.rol?.tipo !== "Tutor"
        ) {
          listarAlumnos();
        }
        if (idAlumno && mes) {
          listadoAsistencias();
          conteoAsistenciasAnuales();
          conteoAsistenciasMensuales();
        }
      }
    }
  }, [authUser?.id, authUser?.rol?.tipo, loading, authUser]);

  const conteoAsistenciasAnuales = async () => {
    setCargando2(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/conteo_anual/${authUser?.rol?.tipo === "Estudiante"
        ? authUser?.alumnoxcursoxdivision1[0].id
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0].id
          : idAlumno
      }`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAnual(res.data);
    }
    setCargando2(false);
  };
  const conteoAsistenciasMensuales = async () => {
    setCargando1(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/conteo_mensual?idAlumno=${authUser?.rol?.tipo === "Estudiante"
        ? authUser?.alumnoxcursoxdivision1[0].id
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0].id
          : idAlumno
      }&mes=${mes}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setMensual(res.data);
    }
    setCargando1(false);
  };
  const listadoAsistencias = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/asistencias/listado_mensual?idAlumno=${authUser?.rol?.tipo === "Estudiante"
        ? authUser?.alumnoxcursoxdivision1[0].id
        : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0].id
          : idAlumno
      }&mes=${mes}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setListado(res.data);
    }
  };
  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Preceptor" ||
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Estudiante" ||
      authUser?.rol?.tipo === "Tutor"
    );
  };

  const listarAlumnos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAlumnos(res.data);
    }
  };

  const handleAlumno = (e, newValue) => {
    if (newValue) {
      setIdAlumno(newValue.id);
      let alumno = authUser.alumnoxcursoxdivision2?.find(
        (a) => newValue?.id === a.id
      );
      if (alumno) {
        let nombre = `${alumno?.usuario?.nombre} ${alumno?.usuario?.apellido}`;
        setNombreAlumno(nombre);
      }
    }
  };

  const handleMes = (event) => {
    setMes(Number(event.target.value));
  };

  const handleSearch = async () => {
    await conteoAsistenciasAnuales();
    await conteoAsistenciasMensuales();
    await listadoAsistencias();
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Reporte Asistencias{" "}
        {authUser?.rol?.tipo === "Estudiante"
          ? ` de ${authUser?.apellido} ${authUser?.nombre}`
          : authUser?.rol?.tipo === "Tutor" && !authUser?.alumnoxcursoxdivision2[1]
            ? ` de ${authUser?.alumnoxcursoxdivision2[0].usuario?.apellido} ${authUser?.alumnoxcursoxdivision2[0].usuario?.nombre}`
            : authUser?.rol?.tipo === "Tutor" && nombreAlumno
              ? ` de ${nombreAlumno}`
              : ""}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          flexWrap: "wrap",
          my: 2,
        }}
      >
        {authUser?.rol?.tipo === "Tutor" &&
          authUser?.alumnoxcursoxdivision2[1] && (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Buscar estudiante:</Typography>
                </Grid>
              </Grid>
              <Box>
                <FormControl sx={{ width: "250px", marginRight: "20px" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    // value={value}
                    name="idAlumno"
                    size="small"
                    onChange={handleAlumno}
                    getOptionLabel={(alumno) =>
                      `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre} `
                    }
                    options={authUser?.alumnoxcursoxdivision2}
                    sx={{ width: "250px" }}
                    isOptionEqualToValue={(option, value) =>
                      option?.id === value?.id
                    }
                    noOptionsText={"No existe un estudiante con ese nombre"}
                    renderOption={(props, alumno) => (
                      <Box component="li" {...props} key={alumno?.id}>
                        {alumno?.usuario?.apellido} {alumno?.usuario?.nombre}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Estudiante" />
                    )}
                  />
                </FormControl>
              </Box>
            </>
          )}
        {authUser?.rol?.tipo != "Estudiante" &&
          authUser?.rol?.tipo != "Tutor" && (
            <>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Buscar estudiante:</Typography>
                </Grid>
              </Grid>
              <Box>
                <FormControl style={{ marginRight: "20px" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    // value={value}
                    name="idAlumno"
                    size="small"
                    onChange={handleAlumno}
                    getOptionLabel={(alumnos) =>
                      `${alumnos?.usuario?.apellido} ${alumnos?.usuario?.nombre}`
                    }
                    options={alumnos}
                    sx={{ width: "250px" }}
                    isOptionEqualToValue={(option, value) =>
                      option?.apellido === value?.apellido
                    }
                    noOptionsText={"No existe un estudiante con ese nombre"}
                    renderOption={(props, alumnos) => (
                      <Box component="li" {...props} key={alumnos?.id}>
                        {alumnos?.usuario?.apellido} {alumnos?.usuario?.nombre}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Estudiante" />
                    )}
                  />
                </FormControl>
              </Box>
            </>
          )}
        <FormControl sx={{ my: 1 }}>
          <InputLabel id="demo-simple-select-label">Mes</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mes}
            label="Mes"
            size="small"
            onChange={handleMes}
            style={{ width: "160px" }}
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value={3}>Marzo</MenuItem>
            <MenuItem value={4}>Abril</MenuItem>
            <MenuItem value={5}>Mayo</MenuItem>
            <MenuItem value={6}>Junio</MenuItem>
            <MenuItem value={7}>Julio</MenuItem>
            <MenuItem value={8}>Agosto</MenuItem>
            <MenuItem value={9}>Septiembre</MenuItem>
            <MenuItem value={10}>Octubre</MenuItem>
            <MenuItem value={11}>Noviembre</MenuItem>
            <MenuItem value={12}>Diciembre</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleSearch}
          variant="outlined"
          startIcon={<Search />}
          color="info"
          sx={{ mx: 2, my: 1 }}
        >
          Buscar
        </Button>
      </Box>



      {
        authUser?.rol?.tipo === "Tutor" &&
          authUser?.alumnoxcursoxdivision2[1] ? (
          <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
            Seleccione un estudiante
          </Typography>
        ) : (
          <div sx={{ marginTop: "200px" }}>
            <Grid container spacing={2}>
              <Grid item xs>
                {!cargando1 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={12}
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            Total de Asistencias Mensuales
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Presente</TableCell>
                          <TableCell>Ausente</TableCell>
                          <TableCell>Llegada Tarde</TableCell>
                          <TableCell>Media Falta</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{mensual[0]?.presente}</TableCell>
                          <TableCell>{mensual[0]?.ausente} </TableCell>
                          <TableCell>{mensual[0]?.llegadatarde}</TableCell>
                          <TableCell>{mensual[0]?.mediafalta}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {cargando1 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={50} />
                  </Container>
                )}
              </Grid>
              <Grid item xs>
                {!cargando2 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={6}
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            Total de Asistencias Anuales
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Presente</TableCell>
                          <TableCell>Ausente</TableCell>
                          <TableCell>Llegada Tarde</TableCell>
                          <TableCell>Media Falta</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{anual[0]?.presente}</TableCell>
                          <TableCell>{anual[0]?.ausente} </TableCell>
                          <TableCell>{anual[0]?.llegadatarde}</TableCell>
                          <TableCell>{anual[0]?.mediafalta}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {cargando2 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={50} />
                  </Container>
                )}
              </Grid>
              <Grid item xs={12}>
                {!cargando3 && (
                  <TableContainer component={Paper} style={{ marginTop: "40px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" scope="col">
                            Fecha
                          </TableCell>
                          <TableCell align="center" scope="col">
                            Asistencia
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listado &&
                          listado.map((l, i) => (
                            <TableRow key={i}>
                              <TableCell
                                align="center"
                                className="col-md-1 text-capitalize"
                              >
                                {l.creadoen}
                              </TableCell>
                              <TableCell align="center" className="col-md-1 ">
                                {l.presente
                                  ? "Presente"
                                  : l.ausente
                                    ? "Ausente"
                                    : l.ausentejustificado
                                      ? "Ausente Justificado"
                                      : l.llegadatarde
                                        ? "Llegada Tarde"
                                        : l.llegadatardejustificada
                                          ? "Llegada Tarde Justificada"
                                          : l.mediafalta
                                            ? "Media Falta"
                                            : l.mediafaltajustificada
                                              ? "Media Falta Justificada"
                                              : "No tiene asistencia cargada"}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {cargando3 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={50} />
                  </Container>
                )}
              </Grid>
            </Grid>
          </div>
        )
      }

    </Layout>
  );
}
