import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserProvider";
import { Layout } from "../../components/layout";
import {
  Box,
  Button,
  Autocomplete,
  FormControl,
  Typography,
  Grid,
  InputLabel,
  Stack,
  ListSubheader,
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
import { Container } from "@mui/system";
import Loading from "../../components/loading";

export default function Notas() {
  const [idMateria, setIdMateria] = useState(1);
  const [materias, setMaterias] = useState([]);
  const [notaTrimestre, setNotaTrimestre] = useState([]);
  const [promedioTrimestre, setPromedioTrimestre] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const { loading, authUser } = useAuth();
  const [idAlumno, setIdAlumno] = useState(1);
  const router = useRouter();
  const [cargando1, setCargando1] = useState(false);
  const [cargando2, setCargando2] = useState(false);
  const [idCurso, setIdCurso] = useState(1);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerUsuario();
    if (usuario.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerMaterias();
        listarAlumnos();
        promedioPorTrimestre();
        notasPorTrimestre();
        listarCursos();
      }
    }
  }, [usuario.id, usuario.rol, loading, authUser]);

  const traerUsuario = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    if (res.data) {
      console.log(res.data);
      setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo });
    }
  };
  const tienePermisos = () => {
    return (
      usuario.rol === "Administrador" ||
      usuario.rol === "Director" ||
      usuario.rol === "Vicedirector" ||
      usuario.rol === "Estudiante" ||
      usuario.rol === "Tutor"
    );
  };
  const notasPorTrimestre = async () => {
    setCargando1(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/notas_trimestres/${idAlumno}/${idMateria}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setNotaTrimestre(res.data);
    }
    setCargando1(false);
  };
  const promedioPorTrimestre = async () => {
    setCargando2(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/promedios_trimestres/${idAlumno}/${idMateria}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setPromedioTrimestre(res.data);
    }
    setCargando2(false);
  };
  const listarAlumnos = async (idCurso) => {
    let param = idCurso ? `?idCurso=${idCurso}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos${param}`
    );
    if (res.status === 200) {
      console.log(res.data);
      setAlumnos(res.data);
    }
  };
  const traerMaterias = async (idCurso) => {
    let param = idCurso ? `?idCurso=${idCurso}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias${param}`
    );
    if (res.status === 200) {
      console.log("Materias: ", res.data);
      let tempMaterias = [];
      res.data.forEach((m) => {
        if (!tempMaterias.find((mat) => mat.materia?.id === m.materia?.id))
          tempMaterias.push(m);
      });
      setMaterias(tempMaterias);
    }
  };
  const listarCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
    );
    if (res.data) {
      setCursos(res.data);
    }
  };
  const handleCurso = async (e) => {
    setIdCurso(Number(e.target.value));
    await traerMaterias(Number(e.target.value));
    await listarAlumnos(Number(e.target.value));
  };
  const handleMateria = (e) => {
    if (e.target.value) {
      setIdMateria(Number(e.target.value));
    } else {
      setIdMateria("");
    }
  };

  const handleAlumno = (e, newValue) => {
    if (newValue) {
      console.log(newValue);
      setIdAlumno(newValue.id);
    } else {
      setIdAlumno("");
    }
  };
  const handleSearch = async () => {
    await notasPorTrimestre();
    await promedioPorTrimestre();
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ marginBottom: "30px" }}>
        Reporte Notas
      </Typography>
      {usuario?.rol !== "Estudiante" && !usuario?.rol !== "Tutor" ? (
        <Box>
          <h3>Buscar Alumno</h3>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 5 }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">Curso</InputLabel>
              <Select
                sx={{ width: "90px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Curso"
                name="idCurso"
                value={idCurso}
                onChange={handleCurso}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value={0}>Seleccione un curso</MenuItem>
                {cursos &&
                  cursos.map((c, i) => (
                    <MenuItem selected={i === 0} value={c.curso?.id} key={i}>
                      {c.curso?.nombre} {c.division?.division}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "150px" }}>
              <InputLabel id="demo-simple-select-label">Materia</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={idMateria}
                label="Materia"
                onChange={handleMateria}
                MenuProps={{ disableScrollLock: true }}
              >
                <ListSubheader>Primero</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 1 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
                <ListSubheader>Segundo</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 2 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
                <ListSubheader>Tercero</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 3 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
                <ListSubheader>Cuarto</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 4 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
                <ListSubheader>Quinto</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 5 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
                <ListSubheader>Sexto</ListSubheader>
                {materias &&
                  materias?.map(
                    (m, i) =>
                      m?.cursoxdivision?.idcurso === 6 && (
                        <MenuItem
                          selected={i === 0}
                          key={i}
                          value={m.materia?.id}
                        >
                          {m.materia?.nombre}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: "20px" }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // value={value}
                name="idAlumno"
                onChange={handleAlumno}
                getOptionLabel={(alumno) =>
                  `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre}`
                }
                options={alumnos}
                sx={{ width: "250px" }}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                noOptionsText={"No existe un alumno con ese nombre"}
                renderOption={(props, alumno) => (
                  <Box component="li" {...props} key={alumno?.id}>
                    {alumno?.usuario?.apellido} {alumno?.usuario?.nombre}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Alumno" />
                )}
              />
            </FormControl>
          </Stack>

          <Button
            onClick={handleSearch}
            variant="outlined"
            startIcon={<Search />}
            color="info"
            sx={{ marginTop: "20px" }}
          >
            Buscar
          </Button>
        </Box>
      ) : (
        <Box direction="row" rowSpacing={2}>
          <FormControl sx={{ width: "150px" }}>
            <InputLabel id="demo-simple-select-label">Materia</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idMateria}
              label="Materia"
              onChange={handleMateria}
              MenuProps={{ disableScrollLock: true }}
            >
              <ListSubheader>Primero</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 1 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
              <ListSubheader>Segundo</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 2 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
              <ListSubheader>Tercero</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 3 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
              <ListSubheader>Cuarto</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 4 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
              <ListSubheader>Quinto</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 5 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
              <ListSubheader>Sexto</ListSubheader>
              {materias &&
                materias?.map(
                  (m, i) =>
                    m?.cursoxdivision?.idcurso === 6 && (
                      <MenuItem selected={i === 0} key={i} value={m.id}>
                        {m.materia?.nombre}
                      </MenuItem>
                    )
                )}
            </Select>
          </FormControl>
          <Button
            onClick={handleSearch}
            variant="outlined"
            startIcon={<Search />}
            color="info"
            sx={{ marginTop: "20px" }}
          >
            Buscar
          </Button>
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid item xs>
          <h2>Notas por trimestre</h2>
          <div sx={{ marginBottom: "100px" }}>
            {!cargando1 && notaTrimestre.length > 0 && (
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
                        {notaTrimestre[0]?.materia}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notaTrimestre.map((n, i) =>
                      n.id == 1 ? (
                        <TableRow key={i}>
                          <TableCell
                            variant="head"
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            Primer Trimestre
                          </TableCell>
                          <TableCell>{n.nota1}</TableCell>
                          <TableCell>{n.nota2}</TableCell>
                          <TableCell>{n.nota3}</TableCell>
                          <TableCell>{n.nota4}</TableCell>
                          <TableCell>{n.nota5}</TableCell>
                        </TableRow>
                      ) : n.id === 2 ? (
                        <TableRow key={i}>
                          <TableCell
                            variant="head"
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            Segundo Trimestre
                          </TableCell>
                          <TableCell>{n.nota1}</TableCell>
                          <TableCell>{n.nota2}</TableCell>
                          <TableCell>{n.nota3}</TableCell>
                          <TableCell>{n.nota4}</TableCell>
                          <TableCell>{n.nota5}</TableCell>
                        </TableRow>
                      ) : (
                        <TableRow key={i}>
                          <TableCell
                            variant="head"
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            Tercer Trimestre
                          </TableCell>
                          <TableCell>{n.nota1}</TableCell>
                          <TableCell>{n.nota2}</TableCell>
                          <TableCell>{n.nota3}</TableCell>
                          <TableCell>{n.nota4}</TableCell>
                          <TableCell>{n.nota5}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {cargando1 && (
              <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                <Loading size={50} />
              </Container>
            )}
          </div>
        </Grid>
        <Grid item xs>
          <h2>Promedio por trimestre</h2>

          <div sx={{ marginTop: "200px" }}>
            {!cargando2 && promedioTrimestre.length > 0 && (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={6}
                        sx={{
                          color: "black",
                          backgroundColor: "lightblue",
                          borderRightColor: "black",
                          borderRight: 1,

                          borderBottom: 1,
                          borderBottomColor: "black",
                        }}
                      >
                        {promedioTrimestre[0]?.materia}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          color: "black",
                          backgroundColor: "lightblue",
                          borderRightColor: "black",
                          borderRight: 1,

                          borderBottom: 1,
                          borderBottomColor: "black",
                        }}
                      >
                        Primer Trimestre
                      </TableCell>
                      <TableCell
                        colSpan={2}
                        sx={{
                          color: "black",
                          backgroundColor: "lightblue",
                          borderRightColor: "black",
                          borderRight: 1,

                          borderBottom: 1,
                          borderBottomColor: "black",
                        }}
                      >
                        Segundo Trimestre
                      </TableCell>

                      <TableCell
                        colSpan={2}
                        align="center"
                        sx={{
                          color: "black",
                          backgroundColor: "lightblue",
                          borderRightColor: "black",
                          borderRight: 1,

                          borderBottom: 1,
                          borderBottomColor: "black",
                        }}
                      >
                        Tercer Trimestre
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          component="th"
                          scope="row"
                          sx={{
                            borderRightColor: "black",
                            borderRight: 1,
                            borderTop: 1,
                            borderTopColor: "black",
                            borderBottom: 1,
                            borderBottomColor: "black",
                          }}
                        >
                          {Number(promedioTrimestre[0]?.promedio).toFixed(2)}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          component="th"
                          scope="row"
                          sx={{
                            borderRightColor: "black",
                            borderRight: 1,
                            borderTop: 1,
                            borderTopColor: "black",
                            borderBottom: 1,
                            borderBottomColor: "black",
                          }}
                        >
                          {Number(promedioTrimestre[1]?.promedio).toFixed(2)}
                        </TableCell>
                        <TableCell
                          colSpan={2}
                          component="th"
                          scope="row"
                          sx={{
                            borderRightColor: "black",
                            borderRight: 1,
                            borderTop: 1,
                            borderTopColor: "black",
                            borderBottom: 1,
                            borderBottomColor: "black",
                          }}
                        >
                          {Number(promedioTrimestre[2]?.promedio).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {cargando2 && (
              <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
                <Loading size={50} />
              </Container>
            )}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}
