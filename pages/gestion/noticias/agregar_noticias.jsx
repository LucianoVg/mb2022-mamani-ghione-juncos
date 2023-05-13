import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Layout } from "../../../components/layout";
import { guardarImagen } from "../../api/servicios/portada";
import { useRouter } from "next/router";
import { useAuth } from "../../../components/context/authUserProvider";
import { Typography, Box, TextField, Button } from "@mui/material";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Container } from "@mui/system";
import Loading from "../../../components/loading";

const AgregarNoticias = () => {
  const [noticia, setNoticia] = useState({
    titulo: "",
    descripcion: "",
    url: "",
  });
  var hoy = new Date();
  const [imagen, setImagen] = useState(null);
  const [usuario, setUsuario] = useState({ id: 0, rol: "" });
  const router = useRouter();
  const [imagenPrev, setImagenPrev] = useState("/assets/img/placeholder.png");
  const [guardando, setGuardando] = useState(false);

  const handleForm = (e) => {
    setNoticia({
      ...noticia,
      [e.target.name]: e.target.value,
    });
  };
  const handleImagen = (e) => {
    setImagen(e.currentTarget.files[0]);
    setImagenPrev(URL.createObjectURL(e.currentTarget.files[0]));
    console.log(imagenPrev);
  };
  const { loading, authUser } = useAuth();

  const traerUsuario = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    if (res.data) {
      setUsuario({
        id: res.data.id,
        rol: res.data?.rol?.tipo,
      });
    }
  };
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
  }, [loading, authUser, authUser.id, authUser.rol]);

  const tienePermisos = () => {
    return (
      authUser.rol === "Administrador" ||
      authUser.rol === "Director" ||
      authUser.rol === "Preceptor"
    );
  };
  const onSubmitData = async (e) => {
    e.preventDefault();
    // noticia.fecha = fecha

    console.log(imagen);
    console.log(noticia);
    setGuardando(true);
    const url = await guardarImagen(
      `imagenes_noticias/${imagen?.name}`,
      imagen
    );
    if (url) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`,
        {
          titulo: noticia.titulo,
          creadaEn: hoy.toLocaleDateString().split("T")[0],
          url: url,
          descripcion: noticia.descripcion,
          idUsuario: authUser.id,
        }
      );
      setGuardando(false);
      if (res.status === 200) {
        router.push("/");
      }
    }
  };

  return (
    <Layout>
      <Container maxWidth={"xl"}>
      <Typography variant="h4" 
            sx={{marginBottom:"20px"}}
            >
                Nueva Noticia</Typography>
        <Box component={"form"} onSubmit={onSubmitData} sx={{ mt: 1 }}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 300, height: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="350"
                    image={imagenPrev}
                    alt="portada"
                    loading="lazy"
                  />
                </CardActionArea>
              </Card>
              <Button sx={{ mt: 1 }} variant="outlined" component="label">
                Subir Portada
                <input
                  hidden
                  id="inputFile"
                  value={noticia.url}
                  onChange={handleImagen}
                  type="file"
                  accept="image/*"
                  name="url"
                />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="titulo"
                label="Titulo de la noticia"
                name="titulo"
                autoFocus
                onChange={handleForm}
                value={noticia.titulo}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="titulo"
                label="Descripcion de la noticia"
                name="descripcion"
                autoFocus
                multiline
                rows={3}
                onChange={handleForm}
                value={noticia.descripcion}
              />
              <Button
                disabled={imagen === null}
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginRight: "20px" }}
              >
                Guardar Noticia
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "gray",
                  ":hover": {
                    backgroundColor: "gray",
                  },
                }}
                href={"/"}
              >
                Cancelar
              </Button>
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
};

export default AgregarNoticias;
