import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserProvider";
import { Layout } from "../../components/layout";
import {
  Typography,
  Box,
  Button,
  Autocomplete,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Search } from "@mui/icons-material";
import Loading from "../../components/loading";

export default function AsistenciasDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [listado, setListado] = useState([]);
  const [mensual, setMensual] = useState([]);
  const [anual, setAnual] = useState([]);
  const { loading, authUser } = useAuth();
  const [idDocente, setIdDocente] = useState("");
  const [mes, setMes] = useState(3);
  const router = useRouter();
  const [cargando1, setCargando1] = useState(false);
  const [cargando2, setCargando2] = useState(false);
  const [cargando3, setCargando3] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/");
      } else {
        if (authUser?.rol?.tipo !== "Docente") {
          listarDocentes();
        }
        listadoAsistencias();
        listarAsistenciasAnuales();
        listarAsistenciasMensuales();
      }
    }
  }, [loading, authUser]);

  const listarAsistenciasAnuales = async () => {
    setCargando3(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL
      }/reportes/asistencias/asistencias_docente/conteo_anual/${authUser?.rol?.tipo === "Docente"
        ? authUser?.docentexmateria[0]?.idusuario
        : idDocente
          ? idDocente
          : 1
      }`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAnual(res.data);
    }
    setCargando3(false);
  };
  const listarAsistenciasMensuales = async () => {
    setCargando2(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL
      }/reportes/asistencias/asistencias_docente/conteo_mensual?idDocente=${authUser?.rol?.tipo === "Docente"
        ? authUser?.docentexmateria[0]?.idusuario
        : idDocente
          ? idDocente
          : 1
      }&mes=${mes}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setMensual(res.data);
    }
    setCargando2(false);
  };
  const listadoAsistencias = async () => {
    setCargando1(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL
      }/reportes/asistencias/asistencias_docente/listado_mensual?idDocente=${authUser?.rol?.tipo === "Docente"
        ? authUser?.docentexmateria[0]?.idusuario
        : idDocente
          ? idDocente
          : 1
      }&mes=${mes}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setListado(res.data);
    }
    setCargando1(false);
  };

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Preceptor" ||
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Docente"
    );
  };

  const listarDocentes = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes`
    );
    if (res.status === 200) {
      setDocentes(res.data);
    }
  };

  const handleDocente = (e, newValue) => {
    if (newValue) {
      setIdDocente(newValue.id);
    }
  };
  const handleMes = (e) => {
    setMes(Number(e.target.value || 3));
  };

  const [bandera, setBandera] = useState(0);
  const handleSearch = async () => {
    setBandera(1)
    await listarAsistenciasAnuales();
    await listarAsistenciasMensuales();
    await listadoAsistencias();

    // console.log("bandera", bandera)
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Reporte Asistencias Docentes{" "}
        {authUser?.rol?.tipo === "Docente" ? `de ${authUser?.nombre}` : ""}
      </Typography>

      {authUser?.rol?.tipo != "Docente" ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Buscar docente:
          </Typography>
          <Box>
            <FormControl style={{ marginRight: "20px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // value={value}
                name="idDocente"
                size="small"
                onChange={handleDocente}
                getOptionLabel={(docentes) =>
                  `${docentes?.apellido} ${docentes?.nombre}`
                }
                options={docentes}
                sx={{ width: "250px" }}
                isOptionEqualToValue={(option, value) =>
                  option?.apellido === value?.apellido
                }
                noOptionsText={"No existe un docente con ese nombre"}
                renderOption={(props, docentes) => (
                  <Box component="li" {...props} key={docentes?.id}>
                    {docentes?.apellido} {docentes?.nombre}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Docente" />
                )}
              />
            </FormControl>
            <FormControl style={{ marginRight: "20px" }}>
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
            <Box sx={{ marginBottom: "20px", marginTop: 2 }}>
              <Button
                onClick={handleSearch}
                variant="outlined"
                startIcon={<Search />}
                color="info"
              >
                Buscar
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <FormControl style={{ marginRight: "20px" }}>
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
          <Box sx={{ marginBottom: "20px", marginTop: 2 }}>
            <Button
              onClick={handleSearch}
              variant="outlined"
              startIcon={<Search />}
              color="info"
            >
              Buscar
            </Button>
          </Box>
        </>
      )}

      {
        bandera != 0 ? (
          <div sx={{ marginTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs>
                {cargando2 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={50} />
                  </Container>
                )}
                {!cargando2 && (
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
              </Grid>
              <Grid item xs>
                {cargando3 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={50} />
                  </Container>
                )}
                {!cargando3 && (
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
              </Grid>
              <Grid item xs={12}>
                {cargando1 && (
                  <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                    <Loading size={80} />
                  </Container>
                )}
                {!cargando1 && (
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
                        {listado.map((l, i) => (
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
              </Grid>
            </Grid>
          </div>
        ): (
          <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
            Seleccione un docente
          </Typography>
        )
      }
    </Layout>
  );
}
