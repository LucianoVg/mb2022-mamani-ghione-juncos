import { useEffect, useState } from "react";
import { Alert, LinearProgress, Tab, Tabs } from "@mui/material";

import { Layout } from "../../../components/layout";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  ListSubheader,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableCell,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import { useAuth } from "../../../components/context/authUserProvider";
import { useRouter } from "next/router";
import { guardarImagen } from "../../api/servicios/portada";
import { FileOpenSharp } from "@mui/icons-material";
import { TabPanel } from "../../../components/tabPanel";

const MaterialEstudio = () => {
  const [idCurso, setIdCurso] = useState("");
  const [materias, setMaterias] = useState();
  const [cursos, setCursos] = useState();
  const handleCurso = async (e) => {
    setIdCurso(Number(e.target.value));
    await traerMaterias(Number(e.target.value));
    await descargarMaterial(tabIndex + 1, Number(e.target.value));
  };

  const { loading, authUser } = useAuth();
  const [idMateria, setIdMateria] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [trimestres, setTrimestres] = useState();
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const [alumno, setAlumno] = useState();
  const [mensaje, setMensaje] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [subir, setSubir] = useState(false);
  const [archivos, setArchivos] = useState(null);
  const [materiales, setMateriales] = useState([]);

  const handleMateria = (e) => {
    setIdMateria(e.target.value);
    descargarMaterial(tabIndex + 1, 0, e.target.value);
  };
  const traerMaterias = async (idCurso) => {
    let param = idCurso ? `?idCurso=${idCurso}` : "";
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias${param}`
    );
    if (res.data) {
      let tempMaterias = [];
      res.data.forEach((mxc) => {
        if (!tempMaterias.find((mat) => mat?.id === mxc.materia?.id)) {
          tempMaterias.push({
            id: mxc.materia?.id,
            idcurso: mxc.cursoxdivision?.idcurso,
            nombre: mxc.materia?.nombre,
          });
        }
      });
      console.log("Materias: ", tempMaterias);
      setMaterias(tempMaterias);
    }
  };
  const traerCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
    );
    if (res.data) {
      setCursos(res.data);
    }
  };
  const traerTrimestres = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/trimestres`
    );
    if (res.data) {
      setTrimestres(res.data);
    }
  };
  // const traerUsuario = async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
  //   );
  //   if (res.data) {
  //     setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo });
  //   }
  // };
  const traerAlumno = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${usuario.id}`
    );
    if (res.status === 200) {
      setAlumno(res.data);
    }
  };
  const subirMaterial = async (idTrimestre) => {
    if (idCurso && idMateria) {
      for (const key in archivos) {
        const file = archivos[key];
        if (typeof file === "object") {
          setSubiendo(true);
          const url = await guardarImagen(
            `materialEstudio/Trimestre ${idTrimestre}/${file.name}`,
            file
          );
          console.log("FILE UPLOADED: ", url);
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio`,
            {
              titulo: file.name,
              url: url,
              idCurso: idCurso,
              idMateria: idMateria,
              idTrimestre: idTrimestre,
              idUsuario: authUser.id,
            }
          );
          if (res.status === 200) {
            setMensaje("Material subido correctamente");
            setTimeout(() => {
              setMensaje("");
            }, 2000);
            await descargarMaterial(idTrimestre, idCurso, idMateria);
          } else {
            setMensaje("No se pudo subir el material");
          }
        }
      }
    } else {
      setMensaje("Elija un curso y una materia");
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  const descargarMaterial = async (idTrimestre, idCurso, idMateria) => {
    try {
      let params = `?idTrimestre=${idTrimestre}`;
      if (idCurso) {
        params += `&idCurso=${idCurso}`;
      }
      if (idMateria) {
        params += `&idMateria=${idMateria}`;
      }
      console.log(params);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio/search${params}`
      );
      console.log(res.data);
      if (res.status === 200) {
        setMateriales(res.data);
      }
      setSubiendo(false);
      setSubir(false);
    } catch (error) {
      console.log(error);
      setMensaje(error);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  const quitarFiltros = async () => {
    setIdCurso("");
    setIdMateria("");
    setTabIndex(0);
    await descargarMaterial(1);
  };
  const handleArchivos = (e) => {
    if (e.target.files.length) {
      setArchivos(e.target.files);
      setSubir(true);
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    // traerUsuario();
    if (authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerCursos();
        traerMaterias();
        traerTrimestres();
        traerAlumno();
        descargarMaterial(1);
      }
    }
  }, [loading, authUser, authUser.id, authUser.rol]);
  const tienePermisos = () => {
    return (
      authUser.rol === "Administrador" ||
      authUser.rol === "Docente" ||
      authUser.rol === "Estudiante"
    );
  };
  const puedeSubirArchivos = () => {
    return authUser.rol === "Administrador" || authUser.rol === "Docente";
  };
  const borrarMaterial = async (e, id, idTrimestre) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/material_estudio/delete/${id}`
      );
      setMensaje(res.data);
      descargarMaterial(idTrimestre);
    } catch (error) {
      console.log(error);
      setMensaje(error.message);
    } finally {
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Material de Estudio
      </Typography>
      <div>
        {authUser.rol !== "Estudiante" && (
          <>
            <Box sx={{ marginBottom: "20px" }}>
              <FormControl sx={{ width: "100px" }}>
                <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                <Select
                  direction="row"
                  // PONER LA LISTA EN HORIZONTAL
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "center",
                      horizontal: "right",
                    },
                    transformOrigin: {
                      vertical: "center",
                      horizontal: "left",
                    },
                    disableScrollLock: true,
                  }}
                  IconComponent={ArrowRightIcon}
                  name="idCurso"
                  value={idCurso}
                  label="Curso"
                  required
                  onChange={handleCurso}
                >
                  {cursos &&
                    cursos?.map((c, i) => (
                      <MenuItem
                        key={i}
                        value={c.idcurso}
                        sx={{ display: "inline-block" }}
                      >
                        {c.curso?.nombre} {c.division?.division}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "flex-start",
              }}
            >
              <FormControl>
                <InputLabel htmlFor="inputMateria">Materia</InputLabel>
                <Select
                  id="inputMateria"
                  onChange={handleMateria}
                  name="idMateria"
                  value={idMateria}
                  label="Materia"
                  required
                  sx={{ width: "260px" }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <ListSubheader>Primero</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 1 && (
                          <MenuItem selected={i === 1} key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                  <ListSubheader>Segundo</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 2 && (
                          <MenuItem key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                  <ListSubheader>Tercero</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 3 && (
                          <MenuItem key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                  <ListSubheader>Cuarto</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 4 && (
                          <MenuItem key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                  <ListSubheader>Quinto</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 5 && (
                          <MenuItem key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                  <ListSubheader>Sexto</ListSubheader>
                  {materias &&
                    materias?.map(
                      (m, i) =>
                        m?.idcurso === 6 && (
                          <MenuItem key={i} value={m.id}>
                            {m.nombre}
                          </MenuItem>
                        )
                    )}
                </Select>
              </FormControl>
              <Button
                sx={{ mx: 2, my: 1 }}
                variant="outlined"
                onClick={quitarFiltros}
              >
                Quitar Filtros
              </Button>
            </Box>
          </>
        )}
        {subiendo && <LinearProgress sx={{ my: 2 }} />}
        {mensaje && (
          <Alert sx={{ my: 2 }} variant="outlined" color="info">
            {mensaje}
          </Alert>
        )}
        <Box sx={{ marginTop: "30px" }}>
          {trimestres && (
            <>
              <Tabs
                value={tabIndex}
                onChange={(e, newValue) => {
                  setTabIndex((_) => newValue);
                  descargarMaterial(newValue + 1);
                }}
              >
                {trimestres
                  .sort((t1, t2) => t1.id - t2.id)
                  ?.map((t) => (
                    <Tab key={t.id} label={t.trimestre} />
                  ))}
              </Tabs>
              {trimestres?.map((t, i) => (
                <TabPanel key={t.id} value={tabIndex} index={i}>
                  <TableContainer key={t.id}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            colSpan={12}
                            sx={{
                              color: "black",
                              backgroundColor: "lightblue",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {subir ? (
                                <Button
                                  onClick={() => subirMaterial(t.id)}
                                  variant="contained"
                                  size="small"
                                  endIcon={<FileUploadIcon />}
                                >
                                  Subir apunte
                                </Button>
                              ) : (
                                puedeSubirArchivos() && (
                                  <Button
                                    variant="contained"
                                    component={"label"}
                                    size="small"
                                    endIcon={<FileOpenSharp />}
                                  >
                                    Elegir apuntes
                                    <input
                                      name="archivos"
                                      onChange={handleArchivos}
                                      hidden
                                      accept="file/**"
                                      multiple
                                      type="file"
                                    />
                                  </Button>
                                )
                              )}
                              <Typography variant="h6">
                                {t.trimestre}
                              </Typography>
                              <h1></h1>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materiales.length > 0 &&
                          materiales.map((m) => (
                            <TableRow key={m.id}>
                              <TableCell
                                variant="head"
                                sx={{
                                  color: "black",
                                }}
                                colSpan={7}
                              >
                                {m.titulo}
                              </TableCell>
                              <TableCell sx={{ textAlign: "right" }}>
                                {m.fecha}
                              </TableCell>
                              <TableCell sx={{ textAlign: "right" }}>
                                <a
                                  href={m.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <IconButton
                                    aria-label="fingerprint"
                                    color="primary"
                                    sx={{ marginRight: "20px" }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                </a>
                                {puedeSubirArchivos() && (
                                  <IconButton
                                    aria-label="fingerprint"
                                    color="primary"
                                    onClick={(e) =>
                                      borrarMaterial(e, m.id, t.id)
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              ))}
            </>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default MaterialEstudio;
