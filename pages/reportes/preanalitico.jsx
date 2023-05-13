import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../components/context/authUserProvider";
import { Layout } from "../../components/layout";
import {
  Box,
  Button,
  Autocomplete,
  Container,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Search } from "@mui/icons-material";
import Loading from "../../components/loading";

export default function Preanalitico() {
  const [alumnos, setAlumnos] = useState([]);
  const router = useRouter();
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const { loading, authUser } = useAuth();
  const [idAlumno, setIdAlumno] = useState(0);
  const [preanalitico, setPreanalitico] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    // traerUsuario();
    if (authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        listarAlumnos();
        traerPreanalitico();
      }
    }
  }, [authUser.id, authUser.rol, loading, authUser]);

  const traerPreanalitico = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/preanalitico/${idAlumno}`
    );
    if (res.status === 200) {
      setPreanalitico(res.data);
    }
    setCargando(false);
  };

  // const traerUsuario = async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
  //   );
  //   if (res.data) {
  //     console.log(res.data);
  //     setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo });
  //   }
  // };
  const tienePermisos = () => {
    return (
      authUser.rol.tipo === "Administrador" ||
      authUser.rol.tipo === "Director" ||
      authUser.rol.tipo === "Secretaria" ||
      authUser.rol.tipo === "Tutor" ||
      authUser.rol.tipo === "Estudiante"
    );
  };
  const listarAlumnos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`
    );
    setAlumnos(res.data);
  };

  const handleAlumno = (e, newValue) => {
    if (newValue) {
      setIdAlumno(newValue.id);
    } else {
      traerPreanalitico();
    }
  };

  return (
    <Layout>
           <Typography variant="h4" 
            sx={{marginBottom:"20px"}}
            >
                Reporte Historial Académico</Typography>
      {authUser.rol != "Estudiante" && (
        <Box sx={{ marginBottom: "20px" }}>
          <h3>Buscar Alumno</h3>

          <FormControl sx={{ marginRight: "20px" }}>
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

            <Button
              onClick={traerPreanalitico}
              sx={{ marginTop: "20px" }}
              variant="outlined"
              startIcon={<Search />}
              color="info"
            >
              Buscar
            </Button>
          </FormControl>
        </Box>
      )}

      <div>
        {!cargando && preanalitico.length > 0 && (
          <TableContainer component={Paper}>
            <Table
              size="small"
              aria-label="customized table"
              sx={{ minWidth: "600px" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Primer Año
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Segundo Año
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Tercer Año
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Cuarto Año
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Quinto Año
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={3}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderLeftColor: "black",
                      borderLeft: 1,
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Sexto Año
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    align="center"
                    colSpan={1}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                  <TableCell
                    align="center"
                    colSpan={2}
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRightColor: "black",
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Materia
                  </TableCell>

                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderLeftColor: "black",
                      borderLeft: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    Nota
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
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
                    {preanalitico[0]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[0]?.notafinal}
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
                    {preanalitico[10]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[10]?.notafinal}
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
                    {preanalitico[20]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[20]?.notafinal}
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
                    {preanalitico[31]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[31]?.notafinal).toFixed(2)}
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
                    {preanalitico[43]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[43]?.notafinal).toFixed(2)}
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
                    {preanalitico[57]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[57]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[1]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[1]?.notafinal}
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
                    {preanalitico[11]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[11]?.notafinal}
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
                    {preanalitico[21]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[21]?.notafinal}
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
                    {preanalitico[32]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[32]?.notafinal).toFixed(2)}
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
                    {preanalitico[44]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[44]?.notafinal).toFixed(2)}
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
                    {preanalitico[58]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[58]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[2]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[2]?.notafinal}
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
                    {preanalitico[12]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[12]?.notafinal}
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
                    {preanalitico[22]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[22]?.notafinal}
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
                    {preanalitico[33]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[33]?.notafinal).toFixed(2)}
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
                    {preanalitico[45]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[45]?.notafinal).toFixed(2)}
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
                    {preanalitico[59]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[59]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[3]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[3]?.notafinal}
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
                    {preanalitico[13]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[13]?.notafinal}
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
                    {preanalitico[23]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[23]?.notafinal}
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
                    {preanalitico[34]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[34]?.notafinal).toFixed(2)}
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
                    {preanalitico[46]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[46]?.notafinal).toFixed(2)}
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
                    {preanalitico[60]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[60]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[4]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[4]?.notafinal}
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
                    {preanalitico[14]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[14]?.notafinal}
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
                    {preanalitico[24]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[24]?.notafinal}
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
                    {preanalitico[35]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[35]?.notafinal).toFixed(2)}
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
                    {preanalitico[47]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[47]?.notafinal).toFixed(2)}
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
                    {preanalitico[61]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[61]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[5]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[5]?.notafinal}
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
                    {preanalitico[15]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[15]?.notafinal}
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
                    {preanalitico[25]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[25]?.notafinal}
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
                    {preanalitico[36]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[36]?.notafinal).toFixed(2)}
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
                    {preanalitico[48]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[48]?.notafinal).toFixed(2)}
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
                    {preanalitico[62]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[62]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[6]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[6]?.notafinal}
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
                    {preanalitico[16]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[16]?.notafinal}
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
                    {preanalitico[26]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[26]?.notafinal}
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
                    {preanalitico[37]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[37]?.notafinal).toFixed(2)}
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
                    {preanalitico[49]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[49]?.notafinal).toFixed(2)}
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
                    {preanalitico[63]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[63]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[7]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[7]?.notafinal}
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
                    {preanalitico[17]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[17]?.notafinal}
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
                    {preanalitico[27]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[27]?.notafinal}
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
                    {preanalitico[38]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[38]?.notafinal).toFixed(2)}
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
                    {preanalitico[50]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[50]?.notafinal).toFixed(2)}
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
                    {preanalitico[64]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[64]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[8]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[8]?.notafinal}
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
                    {preanalitico[18]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[18]?.notafinal}
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
                    {preanalitico[28]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[28]?.notafinal}
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
                    {preanalitico[39]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[39]?.notafinal).toFixed(2)}
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
                    {preanalitico[51]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[51]?.notafinal).toFixed(2)}
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
                    {preanalitico[65]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[65]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                    {preanalitico[9]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[9]?.notafinal}
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
                    {preanalitico[19]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[19]?.notafinal}
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
                    {preanalitico[29]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[29]?.notafinal}
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
                    {preanalitico[40]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[40]?.notafinal).toFixed(2)}
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
                    {preanalitico[52]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[52]?.notafinal).toFixed(2)}
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
                    {preanalitico[66]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[66]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.notafinal}
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
                    {preanalitico[30]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {preanalitico[30]?.notafinal}
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
                    {preanalitico[41]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[41]?.notafinal).toFixed(2)}
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
                    {preanalitico[53]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[53]?.notafinal).toFixed(2)}
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
                    {preanalitico[67]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[67]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.notafinal}
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
                    {preanalitico[42]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[42]?.notafinal).toFixed(2)}
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
                    {preanalitico[54]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[54]?.notafinal).toFixed(2)}
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
                    {preanalitico[68]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[68]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[42]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {Number(preanalitico[42]?.notafinal).toFixed(2)}
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
                    {preanalitico[55]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[55]?.notafinal).toFixed(2)}
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
                    {preanalitico[69]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[69]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>

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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[9]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[19]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[30]?.notafinal}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[42]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {Number(preanalitico[42]?.notafinal).toFixed(2)}
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
                    {preanalitico[56]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                    }}
                  >
                    {Number(preanalitico[56]?.notafinal).toFixed(2)}
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
                      opacity: "0%",
                    }}
                  >
                    {preanalitico[69]?.materia}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    align="center"
                    sx={{
                      borderLeftColor: "black",
                      borderLeftt: 1,
                      borderRight: 1,
                      borderTop: 1,
                      borderTopColor: "black",
                      borderBottom: 1,
                      borderBottomColor: "black",
                      opacity: "0%",
                    }}
                  >
                    {Number(preanalitico[69]?.notafinal).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!cargando && preanalitico.length === 0 && (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            No hay informacion disponible
          </Typography>
        )}
        {cargando && (
          <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
            <Loading size={80} />
          </Container>
        )}
      </div>
    </Layout>
  );
}
