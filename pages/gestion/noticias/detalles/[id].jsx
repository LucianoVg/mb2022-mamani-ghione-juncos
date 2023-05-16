import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";
import {
  Container,
  Box,
  Card,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import Loading from "../../../../components/loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function DetallesNoticia() {
  const [noticia, setNoticia] = useState({
    id: 0,
    titulo: "",
    descripcion: "",
    url: "",
    idUsuario: 0,
  });
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    traerNoticia();
  }, [id]);

  const traerNoticia = async () => {
    if (id) {
      setCargando(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/detalles/${id}`
      );
      if (res.status === 200) {
        console.log(res.data);
        setNoticia(res.data);
        setCargando(false);
      }
    }
  };
  return (
    <Layout>
      <Container sx={{ marginTop: "100px", textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{ border: "none", float: "left" }}
          className="buttonRegresar"
          href="/"
          startIcon={<ArrowBackIosIcon />}
        >
          Regresar
        </Button>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Detalles de Noticia
        </Typography>
        {!cargando && noticia.id !== 0 && (
          <div className="container text-center">
            <Card
              sx={{
                width: "1100px",
                height: "450px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                backgroundColor: "white",
                borderRadius: "30px",

              }}
            >

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Box sx={{ marginTop: "80px", marginLeft: "40px" }}>
                    <Image
                      alt="noticia"
                      src={
                        noticia.url !== ""
                          ? noticia.url
                          : "/assets/img/placeholder.png"
                      }
                      width="800"
                      height="700"
                      style={{
                        // boxShadow:
                        //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        border: "0 10px 15px black",
                        borderRadius: "20px",
                      }}

                    />
                  </Box>
                </Grid>
                <Grid item xs={8} >
                  <Grid container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    sx={{ marginTop: "40px" }}
                  >
                    <Grid item xs={10}>
                      <Typography
                        component={"h3"}
                        // sx={{ textAlign: "justify" }}
                        variant="h4"
                        id="fontSize"
                        sx={{ fontWeight: "bold", textAlign: "center", width: "600px", }}
                      >
                        {noticia.titulo}
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        component={"p"}
                        variant="p"
                        id="fontSize2"
                        style={{
                          marginTop: "30px",
                          textAlign: "left",
                          width: "600px",
                          textJustify: "inter-word",
                          whiteSpace: 'pre-line',
                          alignItems: "baseline",
                          lineHeight: "25px"
                        }}
                      >
                        {noticia.descripcion}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </Card>
          </div>
        )}
        {cargando && (
          <Container sx={{ top: "60%", left: "70%" }}>
            <Loading />
          </Container>
        )}
      </Container>
    </Layout>
  );
}
