import {
  Alert,
  Box,
  Button,
  FormControl,
  Stack,
  Grid,
  Container,
  Autocomplete,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "dayjs/locale/es-mx";

export default function NuevoUsuario() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const theme = useTheme();
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    disableScrollLock: true,
  };
  function getStyles(materia, materias = []) {
    return {
      fontWeight:
        materias.findIndex((m) => m.id === materia.id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const [fecha, setFecha] = useState(null);
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    legajo: "",
    correo: "",
    localidad: "",
    telefono: "",
    idRol: 0,
    direccion: "",
    contrasenia: "",
    idTutor: 0,
    sexo: "M",
    idCurso: 0,
  });
  const [cursos, setCursos] = useState();
  const [idCursos, setIdCursos] = useState([]);
  const [materiasXcurso, setMateriasXcurso] = useState([]);
  const [idMaterias, setIdMaterias] = useState([]);
  const [tutor, setTutor] = useState({
    id: 0,
    nombre: "",
    apellido: "",
    legajo: "",
    correo: "",
    localidad: "",
    telefono: "",
    idRol: 6,
    direccion: "",
    contrasenia: "",
    sexo: "M",
  });
  const [curso, setCurso] = useState("");
  const [rol, setRol] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esAlumno, setEsAlumno] = useState(false);
  const [esPreceptor, setEsPreceptor] = useState(false);
  const [esDocente, setEsDocente] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const { loading, authUser } = useAuth();
  const [buscando, setBuscando] = useState(false);
  const [tutores, setTutores] = useState();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerTutores();
        traerRoles();
        traerCursos();
        traerMaterias();
      }
    }
  }, [authUser, loading]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Secretaria" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Vicedirector"
    );
  };
  const traerCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos`
    );
    if (res.data) {
      setCursos(res.data);
    }
  };
  const traerRoles = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/roles`
    );
    if (res.status === 200) {
      console.log(res.data);
      setRoles(res.data);
    }
  };
  const traerMaterias = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/materias`
    );
    if (res.status === 200) {
      setMateriasXcurso(res.data);
    }
  };
  const traerTutores = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/tutores`
    );
    if (res.data) {
      setTutores(res.data);
    }
  };
  const handleFecha = (value) => {
    setFecha(new Date(value));
  };

  const handleTutor = (e) => {
    setTutor({ ...tutor, [e.target.name]: e.target.value });
  };
  const handleForm = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleRol = (e) => {
    setRol(e.target.value);
    setUsuario((prev) => ({ ...prev, idRol: Number(e.target.value) }));
    setEsPreceptor(
      Number(e.target.value) === roles?.find((r) => r.tipo === "Preceptor")?.id
    );
    setEsAlumno(
      Number(e.target.value) === roles?.find((r) => r.tipo === "Estudiante")?.id
    );
    setEsDocente(
      Number(e.target.value) === roles?.find((r) => r.tipo === "Docente")?.id
    );
  };

  const handleCurso = (e) => {
    setCurso(Number(e.target.value));
    setUsuario((prev) => ({ ...prev, idCurso: Number(e.target.value) }));
  };
  const handleCursos = (event) => {
    const {
      target: { value },
    } = event;

    setIdCursos(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleMaterias = (event) => {
    const {
      target: { value },
    } = event;

    setIdMaterias(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const existeUsuario = async (legajo, correo) => {
    setBuscando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios?legajo=${legajo}&correo=${correo}`
    );
    setBuscando(false);

    if (res.data.length) {
      setMensaje("Ya existe un usuario con esa informacion (Mail o Legajo) 😡");
      return true;
    }
    return false;
  };
  const registrarUsuario = async (e) => {
    e.preventDefault();

    const existe = await existeUsuario(usuario.legajo, usuario.correo);
    if (!existe) {
      console.log(idMaterias);
      let data = {
        login: usuario.correo.split("@")[0],
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        legajo: usuario.legajo,
        telefono: usuario.telefono,
        correo: usuario.correo,
        direccion: usuario.direccion,
        localidad: usuario.localidad,
        fechaNacimiento: fecha
          ? fecha.toLocaleDateString("en-GB").split("T")[0]
          : null,
        idRol: usuario.idRol,
        idCurso: usuario.idCurso,
        idTutor: usuario.idTutor,
        sexo: usuario.sexo,
        contrasenia: usuario.contrasenia,
        esAlumno: esAlumno,
        esDocente: esDocente,
        esPreceptor: esPreceptor,
        idUsuario: authUser?.id,
        idMaterias: idMaterias,
        idCursos: idCursos,
      };
      console.log(data);
      try {
        setGuardando(true);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`,
          data
        );
        setGuardando(false);
        console.log(res.data);
        setMensaje("Usuario registrado! 😅🎉");
        setTimeout(() => {
          router.push("/gestion/usuarios/mantenimiento_usuario");
        }, 2000);
      } catch (error) {
        console.log(error);
        setMensaje("Algo salió mal 😱📛");
      }
    }
  };
  const registrarTutor = async (e) => {
    e.preventDefault();
    const existe = await existeUsuario(tutor.legajo, tutor.correo);
    if (!existe) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta`,
        {
          login: tutor.correo.split("@")[0],
          nombre: tutor.nombre,
          apellido: tutor.apellido,
          legajo: tutor.legajo,
          telefono: tutor.telefono,
          correo: tutor.correo,
          direccion: tutor.direccion,
          localidad: tutor.localidad,
          idRol: tutor.idRol,
          sexo: tutor.sexo,
          contrasenia: tutor.contrasenia,
        }
      );
      setUsuario((prev) => ({ ...prev, idTutor: Number(res.data?.id) }));
      console.log(res.data);
    }
  };

  const [idTutor, setIdTutor] = useState();

  const handleIdTutor = (e, newValue) => {
    setIdTutor(Number(newValue?.id));
    setUsuario((prev) => ({ ...prev, idTutor: newValue?.id }));
  };

  const [existeTutor, setExisteTutor] = useState({
    status: false,
  });

  console.log(idMaterias);

  return (
    <Layout>
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              sx={{ border: "none", marginLeft: "-20px" }}
              className="buttonRegresar"
              href="/gestion/usuarios/mantenimiento_usuario"
              startIcon={<ArrowBackIosIcon />}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
        {mensaje.length > 0 && (
          <Alert
            sx={{ mt: 1 }}
            color={mensaje === "Usuario registrado! 😅🎉" ? "success" : "error"}
          >
            {mensaje}
          </Alert>
        )}
        <Box
          component={"form"}
          onSubmit={registrarUsuario}
          sx={{ marginLeft: "40px" }}
        >
          <Box>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              Nuevo Usuario
            </Typography>
          </Box>
          <Box direction="row">
            <TextField
              size="small"
              margin="normal"
              name="nombre"
              onChange={handleForm}
              label="Nombre"
              value={usuario.nombre}
              required
              sx={{ marginRight: "20px", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              margin="normal"
              name="apellido"
              onChange={handleForm}
              label="Apellido"
              value={usuario.apellido}
              required
            />
          </Box>
          <Box direction="row">
            <TextField
              size="small"
              margin="normal"
              name="correo"
              onChange={handleForm}
              label="Mail"
              type={"email"}
              value={usuario.correo}
              required
              sx={{ marginRight: "20px", marginBottom: "20px", width: "280px" }}
            />
            <TextField
              size="small"
              margin="normal"
              name="legajo"
              type="number"
              onChange={handleForm}
              label="Legajo"
              value={usuario.legajo}
              required
              sx={{ marginRight: "20px", marginBottom: "20px" }}
            />
          </Box>

          <Box direction="row">
            <TextField
              size="small"
              margin="normal"
              name="telefono"
              onChange={handleForm}
              label="Telefono"
              value={usuario.telefono}
              type="number"
              required
              sx={{ marginRight: "20px", marginBottom: "20px" }}
            />
            <TextField
              size="small"
              margin="normal"
              name="localidad"
              onChange={handleForm}
              label="Localidad"
              value={usuario.localidad}
              required
              sx={{ marginRight: "20px", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              margin="normal"
              name="direccion"
              onChange={handleForm}
              label="Direccion"
              value={usuario.direccion}
              required
              sx={{ marginBottom: "20px" }}
            />
          </Box>
          <Box direction="row">
            <FormControl sx={{ marginRight: "20px", marginBottom: "20px" }}>
              <LocalizationProvider
                adapterLocale="es-mx"
                dateAdapter={AdapterDayjs}
              >
                <MobileDatePicker
                  label="Fecha de nacimiento *"
                  name="fecha"
                  value={fecha}
                  onChange={handleFecha}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  MenuProps={{ disableScrollLock: true }}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl size="small">
              <InputLabel id="select-label">Sexo</InputLabel>
              <Select
                labelId="select-label"
                name="sexo"
                label="Sexo"
                required
                onChange={handleForm}
                value={usuario.sexo}
                sx={{ marginRight: "20px", marginBottom: "20px" }}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
              </Select>
            </FormControl>

            {authUser?.rol?.tipo === "Administrador" && (
              <FormControl size="small">
                <InputLabel id="select-label">Rol</InputLabel>
                <Select
                  labelId="select-label"
                  name="rol"
                  label="Rol"
                  required
                  onChange={handleRol}
                  value={rol}
                  sx={{
                    width: "170px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {roles &&
                    roles.map((r, i) => (
                      r?.tipo != "Tutor" && (
                        <MenuItem key={i} value={r.id}>
                          {r.tipo}
                        </MenuItem>
                      )
                    ))}
                </Select>
              </FormControl>
            )}
            {authUser?.rol?.tipo === "Director" && (
              <FormControl size="small">
                <InputLabel id="select-label">Rol</InputLabel>
                <Select
                  labelId="select-label"
                  name="rol"
                  label="Rol"
                  required
                  onChange={handleRol}
                  value={rol}
                  sx={{
                    width: "170px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {roles &&
                    roles.map(
                      (r, i) =>
                        r?.tipo != "Administrador" && r?.tipo != "Tutor" && (
                          <MenuItem key={i} value={r.id}>
                            {r.tipo}
                          </MenuItem>
                        )
                    )}
                </Select>
              </FormControl>
            )}
            {authUser?.rol?.tipo === "Vicedirector" && (
              <FormControl size="small">
                <InputLabel id="select-label">Rol</InputLabel>
                <Select
                  labelId="select-label"
                  name="rol"
                  label="Rol"
                  required
                  onChange={handleRol}
                  value={rol}
                  sx={{
                    width: "170px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {roles &&
                    roles.map(
                      (r, i) =>
                        r?.tipo != "Administrador" &&
                        r?.tipo != "Director" &&
                        r?.tipo != "Tutor" && (
                          <MenuItem key={i} value={r.id}>
                            {r.tipo}
                          </MenuItem>
                        )
                    )}
                </Select>
              </FormControl>
            )}
            {authUser?.rol?.tipo === "Secretaria" && (
              <FormControl size="small">
                <InputLabel id="select-label">Rol</InputLabel>
                <Select
                  labelId="select-label"
                  name="rol"
                  label="Rol"
                  required
                  onChange={handleRol}
                  value={rol}
                  sx={{
                    width: "170px",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {roles &&
                    roles.map(
                      (r, i) =>
                        r?.tipo === "Estudiante" && (
                          <MenuItem key={i} value={r.id}>
                            {r.tipo}
                          </MenuItem>
                        )
                    )}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box>
            <TextField
              size="small"
              margin="normal"
              name="contrasenia"
              onChange={handleForm}
              label="Contraseña Temporal"
              value={usuario.contrasenia}
              type={"password"}
              required
            />
          </Box>

          {esAlumno && (
            <Box>
              <h3>Seleccionar curso</h3>

              <FormControl size="small">
                <InputLabel id="select-label">Curso</InputLabel>
                <Select
                  labelId="select-label"
                  name="curso"
                  label="Curso"
                  required
                  onChange={handleCurso}
                  value={curso}
                  sx={{ width: "100px", marginBottom: "10px" }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  {cursos &&
                    cursos.map((c, i) => (
                      <MenuItem key={i} value={c.id}>
                        {c.curso?.nombre} {c.division?.division}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {esPreceptor && (
            <Box>
              <h3>Seleccionar curso/s</h3>
              <FormControl sx={{ width: 300 }} size="small">
                <InputLabel id="demo-multiple-name-label">Cursos</InputLabel>
                <Select
                  required
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={idCursos}
                  onChange={handleCursos}
                  input={<OutlinedInput label="Cursos" />}
                  MenuProps={MenuProps}
                >
                  {cursos.map((c) => (
                    <MenuItem
                      key={c.id}
                      value={c.id}
                      style={getStyles(c, cursos)}
                    >
                      {c.curso?.nombre} {c.division?.division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {esDocente && (
            <Box>
              <h3>Seleccionar Materia/s</h3>
              <FormControl sx={{ width: 300 }} size="small">
                <InputLabel id="demo-multiple-name-label">Materias</InputLabel>
                <Select
                  required
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={idMaterias}
                  onChange={handleMaterias}
                  input={<OutlinedInput label="Materias" />}
                  MenuProps={MenuProps}
                >
                  {materiasXcurso.map((m) => (
                    <MenuItem
                      key={m.id}
                      value={m.id}
                      style={getStyles(m, materiasXcurso)}
                    >
                      {m.materia?.nombre} - {m.cursoxdivision?.curso?.nombre}{" "}
                      {m.cursoxdivision?.division?.division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          {
            existeTutor.status === false && (
              <Button
                disabled={guardando || buscando}
                sx={{ mt: 2 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                {!guardando && !buscando && <span>Registrar Usuario</span>}
                {guardando || (buscando && <Loading size={30} />)}
              </Button>
            )
          }

        </Box>
        {esAlumno &&
          (existeTutor.status === true ? (
            <Box sx={{ marginLeft: "40px" }}>
              <h2>Datos de Tutor</h2>
              <Button
                variant="contained"
                color="info"
                size="small"
                style={{ marginRight: "20px", marginBottom: "10px" }}
                onClick={() => {
                  setExisteTutor({ status: false });
                }}
              >
                No existe Tutor
              </Button>
              <Stack direction="column">
                <h3>Seleccione al tutor</h3>
                <FormControl style={{ marginRight: "20px" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    // value={value}
                    name="idAlumno"
                    size="small"
                    onChange={handleIdTutor}
                    getOptionLabel={(tutor) =>
                      `${tutor?.nombre} ${tutor?.apellido}`
                    }
                    options={tutores}
                    sx={{ width: "250px" }}
                    isOptionEqualToValue={(option, value) =>
                      option?.id === value?.id
                    }
                    noOptionsText={"No existe un estudiante con ese nombre"}
                    renderOption={(props, tutor) => (
                      <Box component="li" {...props} key={tutor?.id}>
                        {tutor?.nombre} {tutor?.apellido}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Tutores" />
                    )}
                  />
                </FormControl>
                <Button
                  disabled={guardando || buscando}
                  sx={{ mt: 2, width: "180px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={registrarUsuario}
                >
                  {!guardando && !buscando && <span>Registrar Usuario</span>}
                  {guardando || (buscando && <Loading size={30} />)}
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <Box sx={{ marginLeft: "40px" }}>
                <h2>Datos de Tutor</h2>
                <Box component={"form"} onSubmit={registrarTutor}>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    style={{ marginRight: "20px", marginBottom: "20px" }}
                    onClick={() => {
                      setExisteTutor({ status: true });
                    }}
                  >
                    Existe Tutor
                  </Button>

                  <Box direction="row">
                    <TextField
                      size="small"
                      margin="normal"
                      name="nombre"
                      onChange={handleTutor}
                      label="Nombre"
                      value={tutor.nombre}
                      required
                      sx={{ marginRight: "20px", marginBottom: "20px" }}
                    />

                    <TextField
                      size="small"
                      margin="normal"
                      name="apellido"
                      onChange={handleTutor}
                      label="Apellido"
                      value={tutor.apellido}
                      required
                    />
                  </Box>

                  <Box direction="row">
                    <TextField
                      size="small"
                      sx={{
                        width: "280px",
                        marginRight: "20px",
                        marginBottom: "20px",
                      }}
                      margin="normal"
                      name="correo"
                      onChange={handleTutor}
                      label="Mail"
                      type={"email"}
                      value={tutor.correo}
                      required
                    />

                    <TextField
                      size="small"
                      margin="normal"
                      name="legajo"
                      onChange={handleTutor}
                      label="Legajo"
                      value={tutor.legajo}
                      required
                    />
                  </Box>
                  <Box direction="row">
                    <TextField
                      size="small"
                      margin="normal"
                      name="localidad"
                      onChange={handleTutor}
                      label="Localidad"
                      value={tutor.localidad}
                      required
                      sx={{ marginRight: "20px", marginBottom: "20px" }}
                    />

                    <TextField
                      size="small"
                      margin="normal"
                      name="telefono"
                      onChange={handleTutor}
                      label="Telefono"
                      value={tutor.telefono}
                      type={"tel"}
                      required
                      sx={{ marginRight: "20px", marginBottom: "20px" }}
                    />

                    <TextField
                      size="small"
                      margin="normal"
                      name="direccion"
                      onChange={handleTutor}
                      label="Direccion"
                      value={tutor.direccion}
                      required
                      sx={{ marginRight: "20px", marginBottom: "20px" }}
                    />
                  </Box>
                  <Box direction="row">
                    <FormControl size="small">
                      <InputLabel id="select-label">Sexo</InputLabel>
                      <Select
                        labelId="select-label"
                        name="sexo"
                        label="Sexo"
                        required
                        onChange={handleTutor}
                        value={tutor.sexo}
                        sx={{ marginRight: "20px", marginBottom: "10px" }}
                      >
                        <MenuItem value="M">Masculino</MenuItem>
                        <MenuItem value="F">Femenino</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <TextField
                      size="small"
                      margin="normal"
                      name="contrasenia"
                      onChange={handleTutor}
                      label="Contraseña Temporal"
                      value={tutor.contrasenia}
                      type={"password"}
                      required
                      sx={{ marginRight: "20px", marginBottom: "20px" }}
                    />
                  </Box>
                  <Box>
                    <Button
                      disabled={guardando || buscando}
                      sx={{ mt: 2 }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {guardando || (buscando && <Loading size={30} />)}
                      {!guardando && !buscando && <span>Registrar Tutor</span>}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
      </Container>
    </Layout>
  );
}
