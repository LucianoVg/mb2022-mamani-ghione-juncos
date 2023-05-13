import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { guardarImagen } from "../../api/servicios/portada";

export default function DetallesNoticia() {
  const [noticia, setNoticia] = useState({
    id: 0,
    titulo: "",
    descripcion: "",
    url: "",
    idUsuario: 0,
  });
  // const [noticiaActualizar, setNoticiaActualizar] = useState({
  //     id: 0,
  //     titulo: '',
  //     descripcion: '',
  //     url: '',
  //     idUsuario: 0
  // })
  const router = useRouter();
  const hoy = new Date();
  const [imagen, setImagen] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const [guardando, setGuardando] = useState(false);
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director" ||
      authUser?.rol?.tipo === "Preceptor"
    );
  };
  // const traerUsuario = async () => {
  //   const res = await axios.get(
  //     `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
  //   );
  //   if (res.data) {
  //     setUsuario({
  //       id: res.data.id,
  //       rol: res.data?.rol?.tipo,
  //     });
  //   }
  // };
  const handleImagen = (e) => {
    setImagen(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  };
  const onSubmitData = async (e) => {
    e.preventDefault();
    setGuardando(true);
    if (imagen) {
      const url = await guardarImagen(
        `imagenes_noticias/${imagen?.name}`,
        imagen
      );
      if (url) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`,
          {
            titulo: noticiaActualizar.titulo,
            url: url,
            descripcion: noticiaActualizar.descripcion,
            actualizadaEn: hoy.toLocaleDateString("es-AR").split("T")[0],
          }
        );
        setGuardando(false);
        if (res.status === 200) {
          router.push("/");
        }
      }
    } else {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`,
        {
          titulo: noticia.titulo,
          url: noticia.url,
          descripcion: noticia.descripcion,
          actualizadaEn: hoy.toLocaleDateString("es-AR").split("T")[0],
        }
      );
      setGuardando(false);
      if (res.status === 200) {
        router.push("/");
      }
    }
  };

  const borrarNoticia = async () => {
    if (confirm("Está seguro que desea eliminar la noticia?")) {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${noticia.id}`
      );
      if (res.status === 200) {
        router.push("/");
      }
    }
  };
  const handleForm = (e) => {
    setNoticia({ ...noticia, [e.target.name]: e.target.value });
  };

  const { loading, authUser } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    // traerUsuario();
    if (authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerNoticia(id);
      }
    }
  }, [id, authUser, loading, authUser?.id, authUser?.rol?.tipo]);

  const traerNoticia = async (id) => {
    if (id) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`
      );
      if (res.status === 200) {
        console.log(res.data);
        setNoticia(res.data);
        // setNoticiaActualizar(res.data)
      }
    }
  };

  return (
    <Layout>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        Editar Noticia
      </Typography>

      <Container>
        <Box textAlign={"center"}>
          <Image
            src={imgUrl || noticia.url || "/assets/img/placeholder.png"}
            width={200}
            height={200}
            className="m-auto"
          />
        </Box>
        <Box textAlign={"center"} component={"form"} onSubmit={onSubmitData}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Button
                sx={{ marginTop: 2 }}
                variant="outlined"
                component="label"
              >
                <input
                  hidden
                  onChange={handleImagen}
                  type="file"
                  accept="image/*"
                  name="imagen"
                />
                Subir Imagen
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                name="titulo"
                fullWidth
                focused
                required
                multiline
                label="Titulo"
                placeholder={noticia?.titulo}
                // value={noticiaActualizar.titulo}
                defaultValue={noticia?.titulo}
                onChange={handleForm}
              />
              <TextField
                margin="normal"
                fullWidth
                focused
                name="descripcion"
                multiline
                rows={5}
                required
                label="Descripcion"
                // value={noticiaActualizar.descripcion}
                // placeholder={noticiaActualizar?.descripcion}
                onChange={handleForm}
                defaultValue={noticia.descripcion}
              />
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Actualizar
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
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={borrarNoticia}
                >
                  Eliminar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {guardando && (
          <Container sx={{ textAlign: "center" }}>
            <Loading size={80} />
          </Container>
        )}
      </Container>
    </Layout>
  );
}
