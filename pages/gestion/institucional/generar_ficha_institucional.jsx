import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { guardarImagen } from "../../api/servicios/portada";
import {
  Typography,
  TextField,
  Button,
  Select,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";

const FichaInstitucional = () => {
  const [fichaInstitucional, setFichaInstitucional] = useState({
    id: 0,
    nombreInstitucion: "",
    ubicacion: "",
    tipoInstitucion: "",
    descripcion: "",
    telefono1: "",
    telefono2: "",
    oficina1: "",
    oficina2: "",
    mail: "",
    idUsuario: 0,
    portadaficha: [],
  });
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const router = useRouter();
  const { loading, authUser } = useAuth();
  const [imagenes, setImagenes] = useState(null);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerUsuario();
    if (authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      }
    }
  }, [authUser, loading, authUser.id, authUser.rol]);

  const traerUsuario = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    if (res.data) {
      console.log(res.data);
      setUsuario({
        id: res.data.id,
        rol: res.data?.rol?.tipo,
      });
    }
  };
  const tienePermisos = () => {
    return authUser.rol === "Administrador" || authUser.rol === "Director";
  };

  const handleImagenes = (e) => {
    setImagenes(e.currentTarget.files);
    setTimeout(() => {
      console.log(imagenes);
    }, 3000);
  };
  const handleForm = (e) => {
    setFichaInstitucional({
      ...fichaInstitucional,
      [e.target.name]: e.target.value,
    });
  };
  const guardarFicha = async (e) => {
    e.preventDefault();
    await cargarImagenes();

    fichaInstitucional.idUsuario = authUser.id;

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional`,
      {
        nombreInstitucion: fichaInstitucional.nombreInstitucion,
        ubicacion: fichaInstitucional.ubicacion,
        tipoInstitucion: fichaInstitucional.tipoInstitucion,
        descripcion: fichaInstitucional.descripcion,
        telefono1: fichaInstitucional.telefono1,
        telefono2: fichaInstitucional.telefono2,
        oficina1: fichaInstitucional.oficina1,
        oficina2: fichaInstitucional.oficina2,
        mail: fichaInstitucional.mail,
        idUsuario: fichaInstitucional.idUsuario,
      }
    );
    if (res.status === 200) {
      console.log(res.data);
      fichaInstitucional.portadaficha.map(async (p) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/portadas`,
          {
            nombre: p.name,
            url: p.url,
            fichaInstitucionalId: res.data.id,
          }
        );
      });
    }
  };
  const cargarImagenes = async () => {
    if (imagenes && imagenes?.length > 0) {
      for (const key in imagenes) {
        if (typeof imagenes[key] === "object") {
          const file = imagenes[key];
          const url = await guardarImagen("portadas/" + file.name, file);
          fichaInstitucional.portadaficha.push({ id: 0, url: url });
          console.log("FILES: ", fichaInstitucional.portadaficha);
        }
      }
    }
  };

  return (
    <Layout title={"Generar Ficha Institucional"}>
      <Typography component={"h3"} variant={"h3"} sx={{ marginBottom: "40px" }}>
        Generar Ficha Institucional
      </Typography>
      <Box component={"form"} onSubmit={guardarFicha}>
        <Box>
          <Typography variant="h5" sx={{ marginBottom: "40px" }}>
            <strong>Datos Generales</strong>
          </Typography>
        </Box>
        <Button
          variant="contained"
          component="label"
          sx={{ marginBottom: "30px", marginLeft: "60px" }}
        >
          <input
            hidden
            type="file"
            name="imagenes"
            id="inputImg"
            className="form-control"
            accept="image/*"
            multiple={true}
            onChange={handleImagenes}
          />
          Subir Imágenes
        </Button>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Nombre de la Institución:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px", width: "400px" }}
              size="small"
              label="Nombre de la institucion"
              value={fichaInstitucional.nombreInstitucion}
              name="nombreInstitucion"
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "40px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Descripción:
          </Typography>
          <FormControl>
            <TextField
              sx={{ width: "500px" }}
              label="Descripcion"
              value={fichaInstitucional.descripcion}
              name="descripcion"
              multiline
              rows={2}
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "25px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Ciudad:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Ubicacion"
              value={fichaInstitucional.ubicacion}
              name="ubicacion"
              onChange={handleForm}
              required
            />
          </FormControl>
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Provincia:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Provincia"
              value={fichaInstitucional.provincia}
              name="ubicacion"
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Dirección:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Direccion"
              value={fichaInstitucional.direccion}
              name="nombreInstitucion"
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Tipo de Institución:
          </Typography>
          <FormControl>
            {/* <InputLabel >Tipo de Institucion</InputLabel> */}
            <Select
              size="small"
              sx={{ marginTop: "-10px", width: "120px" }}
              label="Tipo de Institucion"
              onChange={handleForm}
              value={fichaInstitucional.tipoInstitucion}
              name="tipoInstitucion"
            >
              <MenuItem value={"Privada"}>Privada</MenuItem>
              <MenuItem value={"Publica"}>Publica</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Box>
          <Typography variant="h5" sx={{ marginBottom: "40px" }}>
            <strong>Datos de Contacto</strong>
          </Typography>
        </Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Teléfono 1:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Telefono 1"
              value={fichaInstitucional.telefono1}
              name="telefono1"
              type={"tel"}
              onChange={handleForm}
              required
            />
          </FormControl>
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Oficina 1:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Oficina 1"
              value={fichaInstitucional.oficina1}
              name="oficina1"
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Teléfono 2:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Telefono 2"
              value={fichaInstitucional.telefono2}
              name="telefono2"
              type={"tel"}
              onChange={handleForm}
              required
            />
          </FormControl>
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Oficina 2:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Oficina 2"
              value={fichaInstitucional.oficina2}
              name="oficina2"
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginLeft: "60px", marginBottom: "15px" }}
        >
          <Typography variant="h7" sx={{ marginBottom: "40px" }}>
            Correo:
          </Typography>
          <FormControl>
            <TextField
              sx={{ marginTop: "-10px" }}
              size="small"
              label="Correo electronico"
              value={fichaInstitucional.mail}
              name="ubicacion"
              autoComplete="email"
              type={"email"}
              onChange={handleForm}
              required
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" type="submit">
            Guardar Ficha
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "gray",
              ":hover": {
                backgroundColor: "gray",
              },
            }}
            href={"/"}
          >
            {" "}
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
};

export default FichaInstitucional;
