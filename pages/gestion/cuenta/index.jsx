import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Typography,
  Divider,
  Stack,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Loading from "../../../components/loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Detalles() {
  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [alumno, setAlumno] = useState();
  const [docente, setDocente] = useState();
  const [tutor, setTutor] = useState();
  const [preceptor, setPreceptor] = useState();

  const [respuesta, setRespuesta] = useState({ status: 0, mensaje: "" });
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    (async () => {
      // if (authUser) {
      //   // PENDIENTE DE CAMBIOS, YA QUE EL USUARIO LOGUEADO TRAE TODA ESTA INFO POR DEFECTO
      //   await traerAlumno();
      //   await traerPreceptor();
      //   await traerTutor();
      //   await traerDocente();
      // }
    })();
  }, [loading, authUser]);

  const traerDocente = async () => {
    if (authUser?.rol?.tipo === "Docente") {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/docentes/authUser/${authUser?.id}`
      );

      if (res.status === 200 && res.data) {
        setDocente(res.data);
        console.log(res.data);
      }
    }
  };

  //   const traerPreceptor = async () => {
  //     if (authUser?.rol?.tipo === "Preceptor") {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/preceptores/${authUser?.id}`
  //       );
  //       if (res.status === 200 && res.data) {
  //         setPreceptor(res.data);
  //         console.log(res.data);
  //       }
  //     }
  //   };
  //   const traerTutor = async () => {
  //     if (authUser?.rol?.tipo === "Tutor") {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/tutores/${authUser?.id}`
  //       );
  //       if (res.status === 200 && res.data) {
  //         setTutor(res.data);
  //         console.log(res.data);
  //       }
  //     }
  //   };
  //   const traerAlumno = async () => {
  //     if (authUser?.rol?.tipo === "Estudiante") {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/alumnos/${authUser?.id}`
  //       );
  //       if (res.status === 200 && res.data) {
  //         setAlumno(res.data);
  //         console.log(res.data);
  //       }
  //     }
  //   };

  const updateProfile = async () => {
    console.log(authUser);
    let dataUsuario = {};
    if (newPassword) {
      if (authUser?.password !== confirmPassword) {
        setMensaje("Contraseña invalida");
        setTimeout(() => {
          setMensaje("");
        }, 3000);
        return;
      }
      dataUsuario = {
        ...dataUsuario,
        password: newPassword,
      };
    }
    console.log(dataUsuario);
    setGuardando(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/usuarios/update/${authUser?.id}`,
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
    }, 2000);
  };

  const materiasOrdenadas = authUser?.docentexmateria?.sort(
    (a, b) => (
      a.materiaxcursoxdivision?.idcursoxdivision -
        b.materiaxcursoxdivision?.idcursoxdivision,
      a.materiaxcursoxdivision?.idmateria - b.materiaxcursoxdivision?.idmateria
    )
  );
  console.log("ORDENADASSS", materiasOrdenadas);
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            sx={{ border: "none", marginLeft: "-20px" }}
            className="buttonRegresar"
            href="/"
            startIcon={<ArrowBackIosIcon />}
          >
            Regresar
          </Button>
        </Grid>
      </Grid>
      {!cargando && (
        <Container sx={{ marginLeft: "20px" }}>
          <Box>
            {authUser?.rol?.tipo === "Secretaria" ? (
              <Typography
                variant="h5"
                sx={{ marginRight: "30px", marginBottom: "10px" }}
              >
                <strong>Datos Personales de {authUser?.rol?.tipo}</strong>
              </Typography>
            ) : (
              <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                <strong>Datos Personales del {authUser?.rol?.tipo}</strong>
              </Typography>
            )}
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 23 }}
            sx={{ marginBottom: "30px", marginLeft: "20px" }}
          >
            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Nombre</strong> <br />
              {authUser?.nombre}
            </Typography>

            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Apellido</strong> <br />
              {authUser?.apellido}
            </Typography>
            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Legajo</strong> <br />
              {authUser?.legajo}
            </Typography>
            {authUser?.rol?.tipo === "Estudiante" && (
              <Typography variant="h6" sx={{ width: "200px" }}>
                <strong>Curso</strong> <br />
                {alumno?.cursoxdivision[0]?.curso?.nombre}° Año &quot;
                {alumno?.cursoxdivision[0]?.division?.division}&quot;
              </Typography>
            )}
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 23 }}
            sx={{ marginBottom: "30px", marginLeft: "20px" }}
          >
            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Localidad</strong> <br />
              {authUser?.localidad}
            </Typography>
            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Direccion</strong> <br />
              {authUser?.direccion}
            </Typography>
            <Typography variant="h6" sx={{ width: "150px" }}>
              <strong>Telefono</strong> <br />
              {authUser?.telefono}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2, md: 23 }}
            sx={{ marginBottom: "30px", marginLeft: "20px" }}
          >
            <Typography variant="h6" sx={{ width: "200px" }}>
              <strong>Edad</strong> <br />
              {authUser?.fechanacimiento
                ? new Date().getFullYear() -
                  new Date(
                    authUser?.fechanacimiento.split("/")[2]
                  ).getFullYear()
                : "N/A"}
            </Typography>
            <Typography variant="h6" sx={{ width: "250px" }}>
              <strong>Fecha de Nacimiento</strong> <br />
              {authUser?.fechanacimiento || "N/A"}
            </Typography>
          </Stack>
          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}></Divider>
          {!editMode && (
            <Button
              sx={{ marginBottom: "15px" }}
              variant="contained"
              onClick={() => setEditMode(!editMode)}
            >
              Editar Info
            </Button>
          )}
          {editMode && (
            <Box>
              {respuesta.status !== 0 && (
                <Alert
                  sx={{ my: 2 }}
                  variant="outlined"
                  color={respuesta.status === 200 ? "success" : "error"}
                >
                  {respuesta.mensaje}
                </Alert>
              )}
              <Stack direction="row" spacing={2} sx={{ marginBottom: "15px" }}>
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
            </Box>
          )}
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            <strong>Datos de Usuario</strong>
          </Typography>

          {editMode ? (
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginBottom: "30px", marginLeft: "20px" }}
              >
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Mail</strong> <br />
                  {authUser?.correo}
                </Typography>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Contraseña Actual</strong> <br />
                  </Typography>
                  <TextField
                    error={mensaje.length > 0}
                    name="confirmPassword"
                    size="small"
                    value={confirmPassword}
                    style={{ marginBottom: "15px", width: "220px" }}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  {mensaje.length > 0 && <Alert color="error">{mensaje}</Alert>}
                </FormControl>
                <FormControl>
                  <Typography variant="h6" sx={{ width: "200px" }}>
                    <strong>Contraseña Nueva</strong> <br />
                  </Typography>
                  <TextField
                    size="small"
                    value={newPassword}
                    type="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ marginBottom: "15px", width: "220px" }}
                  />
                </FormControl>
              </Stack>
            </Box>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2, md: 23 }}
              sx={{ marginBottom: "30px", marginLeft: "20px" }}
            >
              <Typography variant="h6" sx={{ width: "200px" }}>
                <strong>Mail</strong> <br />
                {authUser?.correo}
              </Typography>
              <FormControl>
                <Typography variant="h6" sx={{ width: "200px" }}>
                  <strong>Contraseña</strong> <br />
                </Typography>
                <TextField
                  size="small"
                  value="12341342342141321312"
                  type="password"
                  disabled
                />
              </FormControl>
            </Stack>
          )}

          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}></Divider>

          {authUser?.rol?.tipo === "Preceptor" && (
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                <strong>Datos Académicos</strong>
              </Typography>
              <Typography variant="h6" sx={{ width: "250px" }}>
                <strong>Curso/s</strong> <br />
                <List>
                  {preceptor?.preceptorxcurso?.map((pxc) => (
                    <ListItem
                      key={pxc.id}
                      sx={{ marginTop: "-10px", fontSize: "70px" }}
                    >
                      <ListItemIcon>
                        <FiberManualRecordIcon
                          sx={{
                            color: "black",
                            fontSize: "10px",
                            marginLeft: "25px",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontSize: "20px" }}
                      >
                        <strong>{`${pxc.curso?.nombre}° Año "A" Y "B"`}</strong>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </Box>
          )}

          {authUser?.rol?.tipo === "Docente" && (
            <Box>
              <Typography variant="h6">
                <strong>Materia/s Impartidas</strong>
              </Typography>
              <Typography variant="h6">
                <strong>
                  {docente?.materiaxcursoxdivision?.materia?.nombre} -{" "}
                  <strong>{`${docente?.materiaxcursoxdivision?.cursoxdivision?.curso?.nombre}° Año "${docente?.materiaxcursoxdivision?.cursoxdivision?.division?.division}"`}</strong>
                </strong>
              </Typography>
            </Box>
          )}

          {authUser?.rol?.tipo === "Estudiante" && (
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
                sx={{ marginLeft: "20px" }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Nombre</strong> <br />
                  {authUser?.tutor?.nombre || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Apellido</strong> <br />
                  {authUser?.tutor?.apellido || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Legajo</strong> <br />
                  {authUser?.tutor?.legajo || "N/A"}
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginLeft: "20px" }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Mail</strong> <br />
                  {authUser?.tutor?.correo || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Telefono</strong> <br />
                  {authUser?.tutor?.telefono || "N/A"}
                </Typography>
              </Stack>
            </>
          )}
          {authUser?.rol?.tipo === "Tutor" && (
            <>
              <Typography
                variant="h5"
                sx={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <strong>Datos del Estudiante</strong>
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginLeft: "20px" }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Nombre</strong> <br />
                  {tutor?.alumnoxcursoxdivision2?.authUser?.nombre || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Apellido</strong> <br />
                  {tutor?.alumnoxcursoxdivision2?.authUser?.apellido || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Legajo</strong> <br />
                  {tutor?.alumnoxcursoxdivision2?.authUser?.legajo || "N/A"}
                </Typography>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 2, md: 23 }}
                sx={{ marginLeft: "20px" }}
              >
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Mail</strong> <br />
                  {tutor?.alumnoxcursoxdivision2?.authUser?.correo || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ width: "200px", marginBottom: "20px" }}
                >
                  <strong>Telefono</strong> <br />
                  {tutor?.alumnoxcursoxdivision2?.authUser?.telefono || "N/A"}
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
