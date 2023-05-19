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
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Loading from "../../components/loading";
import { Search } from "@mui/icons-material";

export default function Sancion() {
  const [alumnos, setAlumnos] = useState([]);
  const [sanciones, setSanciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [idAlumno, setIdAlumno] = useState(0);
  const [idCurso, setIdCurso] = useState("");
  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [cursos, setCursos] = useState([]);
  const [nombreAlumno, setNombreAlumno] = useState("");

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/");
      } else {
        if (
          authUser?.rol?.tipo !== "Estudiante" &&
          authUser?.rol?.tipo !== "Tutor"
        ) {
          traerCursos();
          listarAlumnos();
        }
        listarSanciones();
      }
    }
  }, [loading, authUser]);

  const traerCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
    );
    if (res.status === 200) {
      setCursos(res.data);
    }
  };

  const listarSanciones = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/sanciones/${
        authUser?.rol?.tipo === "Estudiante"
          ? authUser?.alumnoxcursoxdivision1[0]?.id
          : authUser?.rol?.tipo === "Tutor" &&
            !authUser?.alumnoxcursoxdivision2[1]
          ? authUser?.alumnoxcursoxdivision2[0]?.id
          : idAlumno
      }`
    );
    setCargando(false);
    if (
      authUser?.rol?.tipo === "Tutor" &&
      !authUser?.alumnoxcursoxdivision2[1]
    ) {
      setNombreAlumno(
        `${authUser?.alumnoxcursoxdivision2[0].usuario?.nombre} ${authUser?.alumnoxcursoxdivision2[0].usuario?.apellido}`
      );
    }
    if (res.status === 200) {
      console.log(res.data);
      setSanciones(res.data);
    }
  };

  const tienePermisos = () => {
    return (
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
  const buscarAlumnos = async (idCurso) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos?idCurso=${idCurso}`
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

  const handleCurso = (e) => {
    setIdCurso(Number(e.target.value));
    buscarAlumnos(Number(e.target.value));
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Reporte Sanciones{" "}
        {authUser?.rol?.tipo === "Estudiante"
          ? ` de ${authUser?.apellido} ${authUser?.nombre}`
          : authUser?.rol?.tipo === "Tutor" &&
            !authUser?.alumnoxcursoxdivision2[1]
          ? ` de ${authUser?.alumnoxcursoxdivision2[0].usuario?.apellido} ${authUser?.alumnoxcursoxdivision2[0].usuario?.nombre}`
          : authUser?.rol?.tipo === "Tutor" && nombreAlumno
          ? ` de ${nombreAlumno}`
          : ""}
      </Typography>
      {cargando && (
        <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
          <Loading size={80} />
        </Container>
      )}
      {authUser?.rol?.tipo === "Tutor" &&
        authUser?.alumnoxcursoxdivision2[1] && (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Buscar estudiante:
                </Typography>
              </Grid>
            </Grid>
            <Box>
              <FormControl
                sx={{
                  width: "250px",
                  marginBottom: "20px",
                  marginRight: "10px",
                }}
              >
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
              <Button
                onClick={listarSanciones}
                variant="outlined"
                startIcon={<Search />}
                color="info"
              >
                Buscar
              </Button>
            </Box>
          </>
        )}

      {authUser?.rol?.tipo !== "Estudiante" &&
        authUser?.rol?.tipo !== "Tutor" && (
          <Box>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Buscar estudiante:
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2, md: 5 }}
              sx={{ marginBottom: "30px" }}
            >
              <FormControl size={"small"}>
                <InputLabel htmlFor="selectCurso">Curso</InputLabel>
                <Select
                  sx={{ width: 120 }}
                  name="idCurso"
                  value={idCurso}
                  onChange={handleCurso}
                  size="small"
                  MenuProps={{ disableScrollLock: true }}
                >
                  {cursos.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.curso?.nombre} {c.division?.division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  // value={value}
                  name="idAlumno"
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
              <Button
                onClick={listarSanciones}
                variant="outlined"
                startIcon={<Search />}
                color="info"
              >
                Buscar
              </Button>
            </Stack>
          </Box>
        )}

      <div sx={{ marginTop: "200px" }}>
        {!cargando &&
          authUser?.rol?.tipo === "Tutor" &&
          authUser?.alumnoxcursoxdivision2[1] &&
          sanciones.length === 0 &&
          idAlumno === 0 && (
            <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
              Seleccione un estudiante
            </Typography>
          )}
        {!cargando && sanciones.length === 0 && idAlumno !== 0 && (
          <Typography variant="h5" sx={{ textAlign: "center", my: 3 }}>
            Este estudiante no fue sancionado.
          </Typography>
        )}
        {!cargando && sanciones.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Motivo
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                    }}
                  >
                    Autoridad
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                    }}
                  >
                    Cargo
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="left"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                    }}
                  >
                    Tipo
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sanciones &&
                  sanciones.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell
                        colSpan={4}
                        component="th"
                        scope="row"
                        sx={{
                          borderRightColor: "black",
                        }}
                      >
                        {s?.motivo}
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        sx={{
                          borderRightColor: "black",
                        }}
                      >
                        {`${s?.usuario.apellido} ${s?.usuario.nombre}`}
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        sx={{
                          borderRightColor: "black",
                        }}
                      >
                        {s?.usuario?.rol?.tipo}
                      </TableCell>
                      <TableCell colSpan={1} component="th" scope="row">
                        {s?.fecha}
                      </TableCell>
                      <TableCell colSpan={1} component="th" scope="row">
                        {s?.tiposancion?.tipo}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </Layout>
  );
}
