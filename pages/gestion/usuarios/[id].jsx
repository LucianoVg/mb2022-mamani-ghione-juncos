import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import 'dayjs/locale/es-mx';
import {
  Checkbox,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  Typography,
  Divider,
  Stack,
  MenuItem,
  Grid,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
  Alert,
  Box,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Loading from "../../../components/loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { toArray } from "lodash";

export default function Detalles() {
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


  const [dataUsuario, setDataUsuario] = useState({
    nombre: "",
    apellido: "",
    legajo: "",
    correo: "",
    localidad: "",
    direccion: "",
    password: "",
    telefono: "",
    fechanacimiento: "",
  });
  const [cursos, setCursos] = useState([]);
  const [idCurso, setIdCurso] = useState([]);

  const [materiasXcurso, setMateriasXcurso] = useState([]);

  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [usuario, setUsuario] = useState();


  let idCursales = usuario?.preceptorxcurso?.map(c => {
    return c?.curso?.id
  })
  const [idCursos, setIdCursos] = useState([]);

  // console.log('cursos', idCursales)
  // console.log('idcursos', idCurso)

  let idMateriales = usuario?.docentexmateria?.map(m => {
    return m?.materiaxcursoxdivision?.id
  })

  const [idMaterias, setIdMaterias] = useState([]);

  // console.log('materiales', idMateriales)
  // console.log('idmaterias',idMaterias)

  const [selectedEnf, setSelectedEnf] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [alumno, setAlumno] = useState();
  const [docente, setDocente] = useState();
  const [preceptor, setPreceptor] = useState();
  const [respuesta, setRespuesta] = useState({ status: 0, mensaje: "" });
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const { id } = router.query;
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerUsuario();
    traerCursos();
    traerMaterias();
    // traerAlumno()
    // traerDocente()
  }, [loading, authUser]);

  console.log(usuario);
  const traerCursos = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cursos/listar`
    );
    if (res.data) {
      setCursos(
        res.data?.map((d) => ({
          id: d.id,
          nombre: `${d.nombre}° Año`,
        }))
      );
      console.log(cursos);
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

  const traerUsuario = async () => {
    setCargando(true);
    if (id) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios?idUsuario=${id}`
      );
      console.log("USUARIO: ", res.data);
      setUsuario(res.data[0]);
      setCargando(false);
      return;
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    console.log(res.data);
    if (res.data) {
      setUsuario(res.data);
    }
    setCargando(false);
  };

  const handleUsuario = (e) => {
    setDataUsuario({ ...dataUsuario, [e.target.name]: e.target.value });
  };

  const handleFecha = (value) => {
    setFecha(new Date(value));
    setDataUsuario({
      ...dataUsuario,
      fechanacimiento: new Date(value)
        .toLocaleDateString("es-AR")
        .split("T")[0],
    });
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
  const updateProfile = async () => {
    setGuardando(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios/update/${usuario?.id}`,
      dataUsuario
    );
    setGuardando(false);

    setRespuesta({
      ...respuesta,
      status: res.status,
      mensaje: res.data?.mensaje,
    });
    setTimeout(() => {
      setRespuesta({
        ...respuesta,
        status: 0,
        mensaje: "",
      });
      setEditMode(false);
      traerUsuario();
    }, 2000);
  };

  const handleCurso = (e) => {
    setIdCurso(Number(e.target.value));
  };

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [legajo, setLegajo] = useState();
  const [mail, setMail] = useState();
  const [contrasenia, setContrasenia] = useState();
  const [localidad, setLocalidad] = useState();
  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const [fechanacimiento, setFechanacimiento] = useState();

  console.log("datausuario:", dataUsuario);

  const handleFechaNacimiento = (value) => {
    setFechanacimiento(value);
  };

  //   const materiasUnicas = usuario?.docentexmateria?.materiaxcursoxdivision?.materia?.reduce((m, item) => {
  //     const existingItem = m.find(({id}) => id === item.id);
  //     if(existingItem)
  //         existingItem.id = existingItem.qty + item.qty;
  //     else
  //         prev.push(item);
  //    return prev;
  //  }, [])
  return (
    <Layout>
      {respuesta.status !== 0 && (
        <Alert
          variant="outlined"
          color={respuesta.status === 200 ? "success" : "error"}
        >
          {respuesta.mensaje}
        </Alert>
      )}
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
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
      <Stack
        direction="row"
        spacing={2}
        style={{ marginLeft: "30px", marginBottom: "20px" }}
      >
        <Typography variant="h4">
          <strong>Detalles de {usuario?.rol?.tipo}</strong>
        </Typography>

        {!editMode && (
          <Button
            style={{ marginLeft: "40px" }}
            variant="contained"
            onClick={() => {
              setIdCursos(idCursales)
              setIdMaterias(idMateriales);
              setEditMode(!editMode);
              setNombre(usuario?.nombre);
              setApellido(usuario?.apellido);
              setLegajo(usuario?.legajo);
              setMail(usuario?.correo);
              setContrasenia(usuario?.password);
              setTelefono(usuario?.telefono);
              setLocalidad(usuario?.localidad);
              setDireccion(usuario?.direccion);
              setTelefono(usuario?.telefono);
              setFechanacimiento(new Date(usuario?.fechanacimiento));
            }}
          >
            Editar
          </Button>
        )}

        {editMode && (
          <Stack direction="row" spacing={2} style={{ marginLeft: "40px" }}>
            <Button
              disabled={guardando}
              variant="contained"
              color="success"
              onClick={updateProfile}
            >
              {guardando && <Loading size={10} />}
              {!guardando && <span>Actualizar Perfil</span>}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setEditMode(!editMode)}
            >
              <span>Cancelar</span>
            </Button>
          </Stack>
        )}
      </Stack>

      {!cargando && (
        <Container sx={{ marginLeft: "20px" }}>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            <strong>Datos Personales</strong>
          </Typography>

          {!editMode && (
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Nombre</strong> <br />
                  {usuario?.nombre}
                </Typography>

                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Apellido</strong> <br />
                  {usuario?.apellido}
                </Typography>
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Legajo</strong> <br />
                  {usuario?.legajo}
                </Typography>
                {usuario?.rol?.tipo === "Estudiante" && (
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Curso</strong> <br />
                    {
                      usuario?.alumnoxcursoxdivision1[0]?.cursoxdivision?.curso
                        ?.nombre
                    }
                    {
                      usuario?.alumnoxcursoxdivision1[0]?.cursoxdivision
                        ?.division?.division
                    }
                  </Typography>
                )}
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Correo</strong> <br />
                  {usuario?.correo}
                </Typography>
                <Typography variant="h6" sx={{ width: "70px" }}>
                  <strong>Contraseña</strong> <br />
                  {usuario?.password}
                </Typography>
                <Typography variant="h6" sx={{ width: "350px" }}>
                  <strong>Localidad</strong> <br />
                  {usuario?.localidad}
                </Typography>
                <Typography variant="h6" sx={{ width: "400px" }}>
                  <strong>Dirección</strong> <br />
                  {usuario?.direccion}
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Telefono</strong> <br />
                  {usuario?.telefono}
                </Typography>
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Edad</strong> <br />
                  {usuario?.fechanacimiento
                    ? new Date().getFullYear() -
                    new Date(
                      usuario?.fechanacimiento.split("/")[2]
                    ).getFullYear()
                    : "N/A"}
                </Typography>
                <Typography variant="h6" sx={{ width: "250px" }}>
                  <strong>Fecha de Nacimiento</strong> <br />
                  {usuario?.fechanacimiento || "N/A"}
                </Typography>
              </Stack>
            </Box>
          )}

          {editMode && (
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Nombre</strong> <br />
                  </Typography>
                  <TextField
                    name="nombre"
                    defaultValue={nombre}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "200px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Apellido</strong> <br />
                  </Typography>
                  <TextField
                    name="apellido"
                    defaultValue={apellido}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "200px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Legajo</strong> <br />
                  </Typography>
                  <TextField
                    name="legajo"
                    defaultValue={legajo}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "170px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                {usuario?.rol?.tipo === "Estudiante" && editMode && (
                  <FormControl>
                    <Typography variant="h6" sx={{ width: "200px" }}>
                      <strong>Curso</strong> <br />
                    </Typography>
                    <FormControl>
                      <Select
                        sx={{ width: "90px", marginRight: "20px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="small"
                        label="Curso"
                        name="idCurso"
                        defaultValue={idCurso}
                        onChange={handleCurso}
                        MenuProps={{ disableScrollLock: true }}
                      >
                        <MenuItem value={0}>Seleccione un curso</MenuItem>
                        {cursos &&
                          cursos.map((c, i) => (
                            <MenuItem
                              selected={i === 0}
                              value={c.id}
                              key={c.id}
                            >
                              {c?.nombre}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </FormControl>
                )}
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Correo</strong> <br />
                  </Typography>
                  <TextField
                    name="correo"
                    defaultValue={mail}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    sx={{ width: "250px" }}
                  />
                </FormControl>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Contraseña</strong> <br />
                  </Typography>
                  <TextField
                    name="password"
                    defaultValue={contrasenia}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "200px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Localidad</strong> <br />
                  </Typography>
                  <TextField
                    name="localidad"
                    defaultValue={localidad}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "200px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Dirección</strong> <br />
                  </Typography>
                  <TextField
                    name="direccion"
                    defaultValue={direccion}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    sx={{ width: "200px" }}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px" }}
              >
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Teléfono</strong> <br />
                  </Typography>
                  <TextField
                    name="telefono"
                    defaultValue={telefono}
                    onChange={handleUsuario}
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Edad</strong> <br />
                  {usuario?.fechanacimiento
                    ? new Date().getFullYear() -
                    new Date(
                      usuario?.fechanacimiento.split("/")[2]
                    ).getFullYear()
                    : "N/A"}
                </Typography>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Fecha de Nacimiento</strong> <br />
                  </Typography>
                  <LocalizationProvider
                    adapterLocale="es-mx"
                    dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      InputProps={{ sx: { height: "40px" } }}
                      // label="Fecha"
                      name="fecha"
                      value={fechanacimiento}
                      onChange={handleFecha}
                      renderInput={(params) => <TextField {...params} />}
                      MenuProps={{ disableScrollLock: true }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Stack>
            </Box>
          )}

          <Divider sx={{ marginTop: "20px" }}></Divider>
          {usuario?.rol?.tipo === "Docente" && !editMode && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                <strong>Datos Académicos</strong>
              </Typography>

              <Stack direction='row' spacing={10}>
                <Box>
                  <Typography variant="h6" >
                    <strong>Materia/s Impartidas</strong>
                  </Typography>
                  <Typography
                    variant="h6"
                  // sx={{
                  //   width: "auto",
                  //   display: "flex",
                  //   alignItems: "start",
                  //   justifyContent: "flex-start",
                  //   flexWrap: "wrap",
                  // }}
                  >
                    <List>
                      {usuario?.docentexmateria?.map((dxm) => (
                        <ListItem key={dxm.id} sx={{ marginTop: '-10px' }}>
                          <ListItemIcon>
                            <FiberManualRecordIcon sx={{ color: 'black', fontSize: '10px', marginLeft: '25px' }} />
                          </ListItemIcon>
                          <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>
                            <strong> {dxm.materiaxcursoxdivision?.materia?.nombre}</strong> -  <strong >{`${dxm.materiaxcursoxdivision?.cursoxdivision?.curso?.nombre}° Año "${dxm.materiaxcursoxdivision?.cursoxdivision?.division?.division}"`}</strong>
                          </ListItemText>
                        </ListItem>
                      ))}

                    </List>
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography variant="h6" >
                    <strong>Curso/s</strong>
                  </Typography>
                  <Typography
                    variant="h6"
                  // sx={{
                  //   width: "auto",
                  //   display: "flex",
                  //   alignItems: "start",
                  //   justifyContent: "flex-start",
                  //   flexWrap: "wrap",
                  // }}
                  >
                    <List>
                      {usuario?.docentexmateria?.map((dxm) => (
                        <ListItem key={dxm.id} sx={{ marginTop: '-10px', fontSize: '70px' }}>
                          <ListItemIcon>
                            <FiberManualRecordIcon sx={{ color: 'black', fontSize: '10px', marginLeft: '25px' }} />
                          </ListItemIcon>
                          <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>
                            <strong >{`${dxm.materiaxcursoxdivision?.cursoxdivision?.curso?.nombre}° Año "${dxm.materiaxcursoxdivision?.cursoxdivision?.division?.division}"`}</strong>
                          </ListItemText>
                        </ListItem>
                      ))}

                    </List>
                  </Typography>
                </Box> */}
              </Stack>
            </Box>
          )}
          {usuario?.rol?.tipo === "Docente" && editMode && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                <strong>Datos Académicos</strong>
              </Typography>
              <FormControl>
                <Typography variant="h6" sx={{ width: "250px" }}>
                  <strong>Materia/s Impartidas</strong> <br />
                </Typography>
                <FormControl>
                  <Select
                    required
                    size="small"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    // renderValue={(usuario) => {
                    //   return usuario.docentexmateria?.map((s, i) => (
                    //     <MenuItem key={s.materia?.i} value={s.materia?.nombre}>
                    //       <ListItemText
                    //         primary={s.materia?.nombre}
                    //       />
                    //     </MenuItem>
                    //   ));
                    // }}
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
                        {m.materia?.nombre} - {m.cursoxdivision?.curso?.nombre} {m.cursoxdivision?.division?.division}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
            </Box>
          )}
          {usuario?.rol?.tipo === "Preceptor" && !editMode && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                <strong>Datos Académicos</strong>
              </Typography>
              <Typography variant="h6" sx={{ width: "250px" }}>
                <strong>Curso/s a cargo</strong> <br />
                <List>
                  {usuario?.preceptorxcurso?.map((pxc) => (
                    <ListItem key={pxc.id} sx={{ marginTop: '-10px', fontSize: '70px' }}>
                      <ListItemIcon>
                        <FiberManualRecordIcon sx={{ color: 'black', fontSize: '10px', marginLeft: '25px' }} />
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>
                        <strong >{`${pxc.curso?.nombre}° Año "A" Y "B"`}</strong>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Box>
          )}
          {usuario?.rol?.tipo === "Preceptor" && editMode && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                <strong>Datos Académicos</strong>
              </Typography>
              <FormControl>
                <Typography variant="h6" sx={{ width: "250px" }}>
                  <strong>Curso/s</strong> <br />
                </Typography>
                <FormControl>
                  <Select
                    size="small"
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
                        {c.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
            </Box>
          )}
          {usuario?.rol?.tipo === "Estudiante" && (
            <>
              <Typography
                variant="h5"
                sx={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <strong>Datos del Tutor</strong>
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Nombre</strong> <br />
                  {usuario?.alumnoxcursoxdivision1[0]?.tutor?.nombre || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Apellido</strong> <br />
                  {usuario?.alumnoxcursoxdivision1[0]?.tutor?.apellido || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Legajo</strong> <br />
                  {usuario?.alumnoxcursoxdivision1[0]?.tutor?.legajo || "N/A"}
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Mail</strong> <br />
                  {usuario?.alumnoxcursoxdivision1[0]?.tutor?.correo || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Telefono</strong> <br />
                  {usuario?.alumnoxcursoxdivision1[0]?.tutor?.telefono || "N/A"}
                </Typography>
              </Stack>
            </>
          )}
        </Container>
      )}
      {cargando && (
        <Container sx={{ maxWidth: "fit-content", textAlign: "center" }}>
          <Loading size={80} />
        </Container>
      )}
    </Layout>
  );
}
