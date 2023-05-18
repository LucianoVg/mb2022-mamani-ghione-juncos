import { Layout } from "../../../components/layout";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import styles from "../../../styles/notas.module.css";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Autocomplete,
  Paper,
  ListSubheader,
  FormHelperText,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  FormControl,
  Pagination,
} from "@mui/material";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import { SearchOutlined } from "@mui/icons-material";
import Loading from "../../../components/loading";
import { usePagination } from "../../../components/hooks/paginationHook";

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [index, setIndex] = useState(0);
  const [docente, setDocente] = useState();
  const [idMateria, setIdMateria] = useState("");
  const [idDivision, setIdDivision] = useState("");
  const [idAlumno, setIdAlumno] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [materias, setMaterias] = useState([]);
  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [cargandoInfo, setCargandoInfo] = useState(false);
  const [guardandoNotas, setGuardandoNotas] = useState(false);
  const pageSize = 5;
  const cantidadPaginas = Math.ceil(notas?.length / pageSize);
  const paginacion = usePagination(notas || [], pageSize);
  const [pagina, setPagina] = useState(1);
  const [trimestres, setTrimestres] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idCurso, setIdCurso] = useState("");

  let queryParams = [];

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const handlerCambioPagina = (e, pagina) => {
    setPagina(pagina);
    paginacion.saltar(pagina);
  };
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerAlumnos();
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        if (authUser?.rol?.tipo === "Docente") {
          traerTrimestres();
          traerMaterias();
          traerNotas(0);
        } else {
          traerTrimestres();
          traerMaterias();
          traerCursos();
          traerNotas(0);
        }
      }
    }
  }, [loading, authUser]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Docente"
    );
  };
  const handleTrimestre = (e, value) => {
    console.log(value);
    setIndex(value);
    traerNotas(Number(value));
  };

  const handleMateria = (e) => {
    if (e.target.value) {
      const materiaxdivision = materias?.find(
        (m) => m.id === Number(e.target.value)
      );
      // console.log(materiaxdivision);
      if (materiaxdivision) {
        setIdMateria(Number(materiaxdivision?.idmateria));
        setIdDivision(Number(materiaxdivision?.cursoxdivision?.iddivision));
        traerAlumnos(Number(materiaxdivision?.idcursoxdivision));
      }
    } else {
      setIdMateria("");
    }
  };
  const handleDivision = (e) => {
    if (e.target.value) {
      setIdDivision(Number(e.target.value));
    }
  };
  const traerDivisiones = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/division`
    );
    if (res.data) {
      setDivisiones(res.data);
    }
  };
  const traerMaterias = async (idCurso) => {
    let param = idCurso ? `?idCurso=${idCurso}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias${param}`
    );
    if (res.data) {
      setMaterias(res.data);
    }
  };
  const traerTrimestres = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`
    );
    setTrimestres((_) => res.data);

  };
  const traerCursos = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
      );
      setCursos(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const traerNotas = async (value = 0) => {
    if (idAlumno) {
      queryParams.push({ idAlumno });
    }
    if (authUser?.rol?.tipo === "Docente") {
      queryParams.push({
        idMateria:
          authUser?.docentexmateria[0].materiaxcursoxdivision?.idmateria
      });
    } else {
      if (idMateria) {
        queryParams.push({ idMateria });
      }
    }
    if (idCurso) {
      queryParams.push({ idCurso });
    }
    if (idDivision) {
      queryParams.push({ idDivision });
    }
    let params = "";
    queryParams.forEach((qp) => {
      for (const key in qp) {
        params += `${key}=${qp[key]}&`;
      }
    });
    params += `idTrimestre=${value + 1}`;
    console.log(params);
    setCargandoInfo(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas?${params}`
    );
    console.log("Notas", res.data);
    if (res.data) {
      setNotas(res.data);
    }
    setCargandoInfo(false);
  };

  const onSave = async (id) => {
    console.log(nota, columnName, id);
    setGuardandoNotas(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/notas/update/${id}`,
      {
        nota1: nota.nota1,
        nota2: nota.nota2,
        nota3: nota.nota3,
        nota4: nota.nota4,
        nota5: nota.nota5,
        columna1: columnName.columnName1,
        columna2: columnName.columnName2,
        columna3: columnName.columnName3,
        columna4: columnName.columnName4,
        columna5: columnName.columnName5,
      }
    );
    if (res.status === 200) {
      console.log(res.data);
      // reset inEditMode and unit price state values
      onCancel();
      // fetch the updated data
      traerNotas(index);
    }
    setGuardandoNotas(false);
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setNota({
      ...nota,
      nota1: 1,
      nota2: 1,
      nota3: 1,
      nota4: 1,
      nota5: 1,
    });
    setColumnName({
      ...columnName,
      columnName1: undefined,
      columnName2: undefined,
      columnName3: undefined,
      columnName4: undefined,
      columnName5: undefined,
    });
  };

  const [nota, setNota] = useState({
    nota1: 0,
    nota2: 0,
    nota3: 0,
    nota4: 0,
    nota5: 0,
  });
  const [columnName, setColumnName] = useState({
    columnName1: undefined,
    columnName3: undefined,
    columnName4: undefined,
    columnName2: undefined,
    columnName5: undefined,
  });

  const min = 1;
  const max = 10;
  const [value, setValue] = useState(1);
  const [value2, setValue2] = useState(1);
  const [value3, setValue3] = useState(1);
  const [value4, setValue4] = useState(1);
  const [value5, setValue5] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeNotaColumna = (e) => {
    var value = parseInt(e.target.value, 10);

    if (value > max) {
      value = max;
      // setErrorMessage("El valor máximo es 10")
    }
    if (value < min) {
      value = min;
      // setErrorMessage("El valor mínimo es 1")
    }
    setValue(value);

    if (value >= min && value <= max) {
      setNota({ ...nota, nota1: value });
      setColumnName({ ...columnName, columnName1: e.target.name });
    }
    console.log(nota);
    console.log(columnName);
  };
  const onChangeNotaColumna2 = (e) => {
    var value2 = parseInt(e.target.value, 10);

    if (value2 > max) {
      value2 = max;
      // setErrorMessage("El valor máximo es 10")
    }
    if (value2 < min) {
      value2 = min;
      // setErrorMessage("El valor mínimo es 1")
    }
    setValue2(value2);

    if (value2 >= min && value2 <= max) {
      setNota({ ...nota, nota2: value2 });
      setColumnName({ ...columnName, columnName2: e.target.name });
    }
    console.log(nota);
    console.log(columnName);
  };

  const onChangeNotaColumna3 = (e) => {
    var value3 = parseInt(e.target.value, 10);

    if (value3 > max) {
      value3 = max;
      // setErrorMessage("El valor máximo es 10")
    }
    if (value3 < min) {
      value3 = min;
      // setErrorMessage("El valor mínimo es 1")
    }
    setValue3(value3);

    if (value3 >= min && value3 <= max) {
      setNota({ ...nota, nota3: value3 });
      setColumnName({ ...columnName, columnName3: e.target.name });
    }
    console.log(nota);
    console.log(columnName);
  };

  const onChangeNotaColumna4 = (e) => {
    var value4 = parseInt(e.target.value, 10);

    if (value4 > max) {
      value4 = max;
      // setErrorMessage("El valor máximo es 10")
    }
    if (value4 < min) {
      value4 = min;
      // setErrorMessage("El valor mínimo es 1")
    }
    setValue4(value4);

    if (value4 >= min && value4 <= max) {
      setNota({ ...nota, nota4: value4 });
      setColumnName({ ...columnName, columnName4: e.target.name });
    }
    console.log(nota);
    console.log(columnName);
  };

  const onChangeNotaColumna5 = (e) => {
    var value5 = parseInt(e.target.value, 10);

    if (value5 > max) {
      value5 = max;
      // setErrorMessage("El valor máximo es 10")
    }
    if (value5 < min) {
      value5 = min;
      // setErrorMessage("El valor mínimo es 1")
    }

    setValue5(value5);

    if (value5 >= min && value5 <= max) {
      setNota({ ...nota, nota5: value5 });
      setColumnName({ ...columnName, columnName5: e.target.name });
    }

    console.log(nota);
    console.log(columnName);
  };

  const traerAlumnos = async (idCursoXdivision) => {
    let param;
    //  if (authUser?.rol?.tipo === "Docente") {
    //    idCursoXdivision =
    //      authUser.docentexmateria[0]?.materiaxcursoxdivision?.idcursoxdivision;
    //    // console.log("divisioooon", idCursoXdivision)
    //  }
    param = idCursoXdivision ? `?idCursoXdivision=${idCursoXdivision}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos${param}`
    );
    if (res.status === 200) {
      setAlumnos(res.data);
    }
  };

  const handleAlumno = (e, newValue) => {
    if (newValue) {
      setIdAlumno(newValue.id);
    }
  };

  const handleCurso = async (e) => {
    if (e.target.value) {
      setIdCurso(Number(e.target.value));
    } else {
      setIdCurso("");
    }
  };
  const materiasOrdenadas1 = authUser?.docentexmateria?.sort(
    (a, b) => (
      a.materiaxcursoxdivision?.cursoxdivision?.iddivision - b.materiaxcursoxdivision?.cursoxdivision?.iddivision
    )
  );
  const materiasOrdenadas2 = materiasOrdenadas1?.sort(
    (a, b) => (
      a.materiaxcursoxdivision?.idmateria - b.materiaxcursoxdivision?.idmateria
    )
  );

  return (
    <Layout>
      <Container maxWidth={"xl"}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Notas
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Box direction="row">

            {authUser?.rol?.tipo === "Docente" ? (
              <FormControl size="small" sx={{ marginBottom: "25px" }}>
                <InputLabel id="inputMateria">Materia</InputLabel>
                <Select
                  labelId="inputMateria"
                  onChange={handleMateria}
                  label="Materia"
                  defaultValue={idMateria}
                  sx={{
                    width: "330px",
                    marginRight: "20px",
                  }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {materiasOrdenadas2?.map((m, i) =>
                    m.materiaxcursoxdivision.idmateria === idMateria ? (
                      <MenuItem
                        key={i}
                        // defaultValue={""}
                        selected
                        value={m.idmateriaxcursoxdivision}
                      >
                        {m.materiaxcursoxdivision?.materia?.nombre} -{" "}
                        {
                          m.materiaxcursoxdivision?.cursoxdivision?.curso
                            ?.nombre
                        }{" "}
                        {
                          m.materiaxcursoxdivision?.cursoxdivision?.division
                            ?.division
                        }
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={i}
                        // defaultValue={""}
                        value={m.idmateriaxcursoxdivision}
                      >
                        {m.materiaxcursoxdivision?.materia?.nombre} -{" "}
                        {
                          m.materiaxcursoxdivision?.cursoxdivision?.curso
                            ?.nombre
                        }{" "}
                        {
                          m.materiaxcursoxdivision?.cursoxdivision?.division
                            ?.division
                        }
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            ) : (
              <FormControl style={{ marginRight: "20px", marginBottom: "25px" }}>
                <Autocomplete
                  size="small"
                  sx={{ width: "330px" }}
                  disablePortal
                  id="inputMateria"
                  // value={value}
                  name="idMateria"
                  onChange={handleMateria}
                  options={materias}
                  getOptionLabel={(materia) =>
                    `${materia?.materia?.nombre}   -   ${materia?.cursoxdivision?.curso?.nombre} ${materia?.cursoxdivision?.division?.division}`
                  }
                  isOptionEqualToValue={(option, value) => {
                    return option?.id === value?.id;
                  }}
                  noOptionsText={"No existe materia con ese nombre"}
                  renderOption={(props, materia) => (
                    <Box
                      component="li"
                      {...props}
                      key={materia?.id}
                      value={materia?.id}
                    >
                      {materia?.materia?.nombre}
                      &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                      {materia?.cursoxdivision?.curso?.nombre}&nbsp;
                      {materia?.cursoxdivision?.division?.division}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Materias" />
                  )}
                />
              </FormControl>
            )}


            {/* {
              authUser?.rol?.tipo === "Docente" && (
                <FormControl>
                  <InputLabel htmlFor="inputCurso">Division</InputLabel>
                  <Select
                    id="inputCurso"
                    name={"idDivision"}
                    value={idDivision}
                    onChange={handleDivision}
                    label="Division"
                    sx={{
                      width: "150px",
                      marginRight: "20px",
                      marginBottom: "20px",
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value={""}>Division</MenuItem>
                    {divisiones &&
                      divisiones?.map((d, i) => (
                        <MenuItem key={i} value={d.id}>
                          {d.division}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )
            } */}
            {/* <FormControl>
                  <InputLabel htmlFor="inputCurso">Curso</InputLabel>
                   <Select
                    id="inputCurso"
                    name={"idCurso"}
                    value={idCurso}
                    onChange={handleCurso}
                    label="Curso"
                    sx={{
                      width: "150px",
                      marginRight: "20px",
                      marginBottom: "20px",
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value={""}>Curso</MenuItem>
                    {cursos &&
                      cursos?.map((c, i) => (
                        <MenuItem key={i} value={c.curso?.id}>
                          {c.curso?.nombre} {c.division?.division}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
           */}
          </Box>

          <Box>
            <FormControl style={{ marginRight: "20px", marginBottom: 10 }}>
              <Autocomplete
                size="small"
                sx={{ width: "250px" }}
                disablePortal
                id="combo-box-demo"
                // value={value}
                name="idAlumno"
                onChange={handleAlumno}
                getOptionLabel={(alumno) =>
                  `${alumno?.usuario?.apellido} ${alumno?.usuario?.nombre}`
                }
                options={alumnos}
                isOptionEqualToValue={(option, value) =>
                  option?.usuario?.apellido === value?.usuario?.apellido
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
          <Button
            endIcon={<SearchOutlined />}
            sx={{ marginBottom: "20px" }}
            color="info"
            variant="outlined"
            onClick={() => traerNotas(index)}
          >
            Buscar
          </Button>
          <Button
            sx={{ marginBottom: "20px" }}
            color="info"
            variant="text"
            onClick={async () => {
              setIdAlumno((_) => "");
              setIdDivision("");
              setIdMateria(
                authUser.docentexmateria[0]?.materiaxcursoxdivision
                  ?.idmateria || ""
              );
              await traerNotas(index);
            }}
          >
            Quitar Filtros
          </Button>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Tabs
            value={index}
            onChange={handleTrimestre}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {trimestres
              ?.sort((a, b) => a.id - b.id)
              .map((t) => (
                <Tab key={t.id} label={t.trimestre} tabIndex={t.id} />
              ))}
          </Tabs>
        </Box>
        {cargandoInfo && (
          <Container sx={{ textAlign: "center", marginTop: 3 }}>
            <Loading size={80} />
          </Container>
        )}
        {!cargandoInfo && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Legajo</TableCell>
                  <TableCell align="center">Sexo</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Apellido</TableCell>
                  <TableCell align="center">Materia</TableCell>
                  <TableCell align="center">Nota 1</TableCell>
                  <TableCell align="center">Nota 2</TableCell>
                  <TableCell align="center">Nota 3</TableCell>
                  <TableCell align="center">Nota 4</TableCell>
                  <TableCell align="center">Nota 5</TableCell>
                  {/* <TableCell align="center">Trimestre</TableCell> */}
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notas &&
                  paginacion.dataActual()?.map((n, i) =>
                  (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {n.alumnoxcursoxdivision?.usuario?.legajo}
                      </TableCell>
                      <TableCell align="center">
                        {n.alumnoxcursoxdivision?.usuario?.sexo}
                      </TableCell>
                      <TableCell align="center">
                        {n.alumnoxcursoxdivision?.usuario?.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {n.alumnoxcursoxdivision?.usuario?.apellido}
                      </TableCell>
                      <TableCell align="center">
                        {n.materia?.nombre}
                      </TableCell>
                      <TableCell align="center">
                        {inEditMode.status && inEditMode.rowKey === i ? (
                          <FormControl>
                            <Select
                              type="number"
                              margin="normal"
                              variant="standard"
                              name="nota1"
                              value={nota.nota1}
                              label="Age"
                              onChange={onChangeNotaColumna}
                              MenuProps={{ disableScrollLock: true }}
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8}>8</MenuItem>
                              <MenuItem value={9}>9</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                            </Select>
                          </FormControl>
                        ) : n.nota1 === 0 ? (
                          ""
                        ) : (
                          n.nota1
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {
                          inEditMode.status && inEditMode.rowKey === i ? (
                            n.nota1 === 0 ? (
                              <FormControl disabled>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota2"
                                  value={nota.nota2}
                                  label="Age"
                                  onChange={onChangeNotaColumna2}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <FormControl>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota2"
                                  value={nota.nota2}
                                  label="Age"
                                  onChange={onChangeNotaColumna2}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            )

                          ) : n.nota2 === 0 ? (
                            ""
                          ) : (
                            n.nota2
                          )}
                      </TableCell>
                      <TableCell align="center">
                      {
                          inEditMode.status && inEditMode.rowKey === i ? (
                            n.nota2 === 0 ? (
                              <FormControl disabled>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota3"
                                  value={nota.nota3}
                                  label="Age"
                                  onChange={onChangeNotaColumna3}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <FormControl>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota3"
                                  value={nota.nota3}
                                  label="Age"
                                  onChange={onChangeNotaColumna3}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            )

                          ) : n.nota3 === 0 ? (
                            ""
                          ) : (
                            n.nota3
                          )}

                      </TableCell>
                      <TableCell align="center">
                      {
                          inEditMode.status && inEditMode.rowKey === i ? (
                            n.nota3 === 0 ? (
                              <FormControl disabled>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota4"
                                  value={nota.nota4}
                                  label="Age"
                                  onChange={onChangeNotaColumna4}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <FormControl>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota4"
                                  value={nota.nota4}
                                  label="Age"
                                  onChange={onChangeNotaColumna4}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            )

                          ) : n.nota4 === 0 ? (
                            ""
                          ) : (
                            n.nota4
                          )}

                      </TableCell>
                      <TableCell align="center">
                      {
                          inEditMode.status && inEditMode.rowKey === i ? (
                            n.nota4 === 0 ? (
                              <FormControl disabled>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota5"
                                  value={nota.nota5}
                                  label="Age"
                                  onChange={onChangeNotaColumna5}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <FormControl>
                                <Select
                                  type="number"
                                  margin="normal"
                                  variant="standard"
                                  name="nota5"
                                  value={nota.nota5}
                                  label="Age"
                                  onChange={onChangeNotaColumna5}
                                  MenuProps={{ disableScrollLock: true }}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={6}>6</MenuItem>
                                  <MenuItem value={7}>7</MenuItem>
                                  <MenuItem value={8}>8</MenuItem>
                                  <MenuItem value={9}>9</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                </Select>
                              </FormControl>
                            )

                          ) : n.nota5 === 0 ? (
                            ""
                          ) : (
                            n.nota5
                          )}

                      </TableCell>
                      {/* <TableCell align="center">
                          {n.trimestre?.trimestre}
                        </TableCell> */}

                      <TableCell align="center">
                        {
                          n?.nota1 == 0 &&
                            n?.nota2 == 0 &&
                            n?.nota3 == 0 &&
                            n?.nota4 == 0 &&
                            n?.nota5 == 0 ? (
                            inEditMode.status && inEditMode.rowKey === i ? (
                              <React.Fragment>
                                {guardandoNotas ? (
                                  <Container sx={{ textAlign: "center" }}>
                                    <Loading size={50} />
                                  </Container>
                                ) : (
                                  <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                      <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => onSave(n.id)}
                                      >
                                        Guardar
                                      </Button>
                                    </Grid>
                                    <Grid item xs={5}>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => onCancel()}
                                      >
                                        Cancelar
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )}
                              </React.Fragment>
                            ) : (
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => {
                                  setInEditMode({
                                    status: true,
                                    rowKey: i,
                                  });
                                  setNota({
                                    ...nota,
                                    nota1: n.nota1,
                                    nota2: n.nota2,
                                    nota3: n.nota3,
                                    nota4: n.nota4,
                                    nota5: n.nota5,
                                  });
                                }}
                              >
                                Cargar
                              </Button>
                            )
                          ) : (
                            inEditMode.status && inEditMode.rowKey === i ? (
                              <React.Fragment>
                                {guardandoNotas ? (
                                  <Container sx={{ textAlign: "center" }}>
                                    <Loading size={50} />
                                  </Container>
                                ) : (
                                  <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                      <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={() => onSave(n.id)}
                                      >
                                        Guardar
                                      </Button>
                                    </Grid>
                                    <Grid item xs={5}>
                                      <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => onCancel()}
                                      >
                                        Cancelar
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )}
                              </React.Fragment>
                            ) : (
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => {
                                  setInEditMode({
                                    status: true,
                                    rowKey: i,
                                  });
                                  setNota({
                                    ...nota,
                                    nota1: n.nota1,
                                    nota2: n.nota2,
                                    nota3: n.nota3,
                                    nota4: n.nota4,
                                    nota5: n.nota5,
                                  });
                                }}
                              >
                                Editar
                              </Button>
                            )
                          )
                        }
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!cargandoInfo && notas.length > 0 && (
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
    </Layout >
  );
}
