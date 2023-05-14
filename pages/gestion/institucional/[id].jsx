import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { guardarImagen } from "../../api/servicios/portada";

export default function EditarFicha() {
  const [ficha, setFicha] = useState({
    id: 0,
    nombreinstitucion: "",
    ciudad: "",
    provincia: "",
    tipoinstitucion: "",
    descripcion: "",
    telefono1: "",
    telefono2: "",
    oficina1: "",
    oficina2: "",
    mail: "",
    idusuario: 0,
    portadasficha: [],
  });
  const [cargando, setCargando] = useState(false);
  const [imagenes, setImagenes] = useState(null);
  const router = useRouter();

  const handleForm = (e) => {
    setFicha({ ...ficha, [e.target.name]: e.target.value });
  };
  const guardarFicha = async (e) => {
    e.preventDefault();
    setCargando(true);
    await cargarImagenes();

    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional/${ficha.id}`,
      {
        nombreinstitucion: ficha.nombreinstitucion,
        ciudad: ficha.ciudad,
        provincia: ficha.provincia,
        tipoinstitucion: ficha.tipoinstitucion,
        descripcion: ficha.descripcion,
        telefono1: ficha.telefono1,
        telefono2: ficha.telefono2,
        oficina1: ficha.oficina1,
        oficina2: ficha.oficina2,
        mail: ficha.mail,
        idusuario: ficha.idusuario,
        portadasficha: ficha.portadasficha,
      }
    );
    setCargando(false);
    if (res.status === 200) {
      router.push("/gestion/institucional");
    }
  };
  const { authUser, loading } = useAuth();
  const { id } = router.query;
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    traerFicha();
  }, [id, authUser, loading]);
  const traerFicha = async () => {
    if (id) {
      setCargando(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional/${Number(
          id
        )}`
      );
      if (res.data) {
        console.log(res.data);
        setFicha(res.data);
      }
      setCargando(false);
    }
  };
  const handleImagenes = (e) => {
    console.log(e?.currentTarget?.files);
    setImagenes(e?.currentTarget?.files);
  };
  const cargarImagenes = async () => {
    if (imagenes && imagenes?.length > 0) {
      for (const key in imagenes) {
        if (typeof imagenes[key] === "object") {
          const file = imagenes[key];
          const url = await guardarImagen("portadas/" + file.name, file);
          ficha.portadasficha.push({ id: 0, url: url });
          console.log("FILES: ", ficha.portadasficha);
        }
      }
    }
  };

  return (
    <Layout>
      {ficha && ficha.id !== 0 && (
        <>
          <Typography variant="h4">Editar Ficha Institucional</Typography>
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
                  value={ficha.nombreinstitucion}
                  name="nombreinstitucion"
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
                  value={ficha.descripcion}
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
                  value={ficha.ciudad}
                  name="ciudad"
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
                  value={ficha.provincia}
                  name="provincia"
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
                <Select
                  size="small"
                  sx={{ marginTop: "-10px", width: "120px" }}
                  onChange={handleForm}
                  value={ficha.tipoinstitucion || "Privada"}
                  name="tipoinstitucion"
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
                  value={ficha.telefono1}
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
                  value={ficha.oficina1}
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
                  value={ficha.telefono2}
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
                  value={ficha.oficina2}
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
                  value={ficha.mail}
                  name="mail"
                  autoComplete="email"
                  type={"email"}
                  onChange={handleForm}
                  required
                />
              </FormControl>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button variant="contained" size="small" type="submit">
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
        </>
      )}
      {cargando && <Loading />}
    </Layout>
  );
}
