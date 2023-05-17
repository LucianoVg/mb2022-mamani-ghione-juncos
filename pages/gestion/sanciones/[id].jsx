import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl,
  Box,
  Grid,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

export default function DetalleSancion() {
  const [sancionxalumno, setSancionXAlumno] = useState();
  const [alumnos, setAlumnos] = useState();
  const [cursos, setCursos] = useState();
  const [tipoSanciones, setTipoSanciones] = useState();
  const router = useRouter();
  const [esSancionGrupal, setEsSancionGrupal] = useState(false);
  const { loading, authUser } = useAuth();
  const [idalumno, setIdalumno] = useState(0);
  const [loadSancion, setLoadSancion] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [guardando, setGuardando] = useState(false);

  const { id } = router.query;
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerCursos();
        traerAlumnos();
        traerTiposSancion();
        traerSancion(id);
      }
    }
  }, [loading, authUser, id]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector" ||
      authUser?.rol?.tipo === "Preceptor" ||
      authUser?.rol?.tipo === "Docente"
    );
  };

  const traerSancion = async (id) => {
    if (id) {
      setLoadSancion(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/buscar/${id}`
      );
      console.log("Sancion:", res.data);
      if (res.status === 200) {
        setSancionXAlumno(res.data);
      }
      setLoadSancion(false);
    }
  };
  const traerAlumnos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos`
    );
    if (res.data) {
      setAlumnos(res.data);
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
  const traerTiposSancion = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/tipos`
    );
    if (res.data) {
      setTipoSanciones(res.data);
    }
  };
  const handleMotivo = (e) => {
    setMotivo(e.target.value);
    // setEditMode((idalumno || idcurso) && idtiposancion && motivo)
  };

  let selected = "";

  alumnos &&
    alumnos.map(
      (a, i) =>
        a.id === sancionxalumno?.alumnoxcursoxdivision?.id &&
        (selected = `${a.usuario?.apellido} ${a.usuario?.nombre}`)
    );

  const [inEditMode, setInEditMode] = useState({
    status: false,
  });

  const actualizarSancion = async (e) => {
    e.preventDefault();
    console.log(motivo, sancionxalumno);
    setGuardando(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/sanciones/actualizar/${sancionxalumno?.sancion?.id}`,
      {
        idUsuario: authUser.id,
        motivo: motivo.length ? motivo : sancionxalumno?.sancion?.motivo,
      }
    );
    setGuardando(false);
    if (res.status === 200) {
      router.push("/gestion/sanciones");
    }
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
    });
    setMotivo(sancionxalumno?.sancion?.motivo);
  };

  return (
    <Layout>
      <Container maxWidth={"xl"}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Detalle Sanción de{" "}
          {sancionxalumno?.alumnoxcursoxdivision?.usuario?.apellido}{" "}
          {sancionxalumno?.alumnoxcursoxdivision?.usuario?.nombre}
        </Typography>
        {!loadSancion && (
          <Box style={{ marginTop: "30px" }}>
            <Box direction="row">
              {!esSancionGrupal && (
                <FormControl >
                  <InputLabel htmlFor="inputAlumno">Estudiante</InputLabel>
                  <Select
                    value={idalumno}
                    size="small"
                    // onChange={handleIdAlumno}
                    name="idalumno"
                    id="inputAlumno"
                    label="Estudiante"
                    displayEmpty
                    disabled
                    renderValue={(value) => (value ? value : <a>{selected}</a>)}
                    sx={{
                      width: "200px",
                      marginRight: "20px",
                      marginBottom: "20px",
                    }}
                  ></Select>
                </FormControl>
              )}

              <FormControl   size="small">
                <InputLabel htmlFor="inputTipoSancion">
                  Tipo de Sanción
                </InputLabel>
                <Select
                  value={sancionxalumno?.sancion?.idtiposancion}
                  name="idtiposancion"
                  id="inputTipoSancion"
                  label="Tipo de Sancion"
                  disabled
                  renderValue={(value) => (
                    <span>{sancionxalumno?.sancion?.tiposancion?.tipo}</span>
                  )}
                  sx={{ width: "180px", marginBottom: "20px" }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {tipoSanciones &&
                    tipoSanciones.map((t, i) => (
                      <MenuItem
                        selected={
                          t.id === sancionxalumno?.sancion?.idtiposancion
                        }
                        key={i}
                        value={t.id}
                      >
                        {t.tipo}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

            {inEditMode.status === true ? (
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  multiline
                  rows={6}
                  required
                  placeholder={sancionxalumno?.sancion?.motivo}
                  name="motivo"
                  value={motivo}
                  label="Motivo"
                  onChange={handleMotivo}
                  sx={{ maxWidth: "350px", minWidth: "300px" }}
                />
              </Box>
            ) : (
              <Box sx={{ marginBottom: "20px" }}>
                <TextField
                  multiline
                  rows={6}
                  required
                  name="motivo"
                  value={sancionxalumno?.sancion?.motivo}
                  label="Motivo"
                  disabled
                  sx={{ maxWidth: "350px", minWidth: "300px" }}
                />
              </Box>
            )}

            {inEditMode.status === true ? (
              <Box direction="row">
                <Stack direction="row" spacing={2}>
                  <Button
                    disabled={guardando}
                    variant="contained"
                    color="success"
                    onClick={actualizarSancion}
                  >
                    {guardando && <Loading size={30} />}
                    {!guardando && <span>Actualizar Sanción</span>}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "gray",
                      ":hover": {
                        backgroundColor: "gray",
                      },
                    }}
                    href={"/gestion/sanciones"}
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box direction="row">
                <Button
                  variant="contained"
                  color="info"
                  // size="small"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    setInEditMode({ status: true });
                    setMotivo(sancionxalumno?.sancion?.motivo);
                  }}
                >
                  Editar Sanción
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "170px",
                    backgroundColor: "white",
                    color: "black",
                    ":hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  href="/gestion/sanciones"
                >
                  Volver
                </Button>
              </Box>
            )}
          </Box>
        )}
        {loadSancion && (
          <Container sx={{ textAlign: "center" }}>
            <Loading size={80} />
          </Container>
        )}
      </Container>
    </Layout>
  );
}
