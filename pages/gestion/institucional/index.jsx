import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { Typography, Button, Container, Grid, Divider } from "@mui/material";
import { AddBoxRounded } from "@mui/icons-material";
import styles from "../../../styles/fontSize.module.css";
import { Box } from "devextreme-react";

export default function Institucional() {
  const [fichaInstitucional, setFichaInstitucional] = useState();
  const [cargando, setCargando] = useState(false);
  const { authUser } = useAuth();
  const [usuario, setUsuario] = useState({
    rol: "",
  });

  useEffect(() => {
    traerUsuario();
  }, [usuario.rol]);

  const traerUsuario = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`
    );
    if (res.data) {
      setUsuario({ rol: res.data?.rol?.tipo });
    }
  };
  const traerFicha = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/institucional`
    );
    setFichaInstitucional(res.data[0]);
    setCargando(false);
  };

  useEffect(() => {
    traerFicha();
  }, []);

  return (
    <Layout>
      {!cargando && !fichaInstitucional && (
        <div style={{ marginBottom: "20px" }}>
          <Typography sx={{ mb: 3 }} component={"h3"} variant="h4">
            No hay ninguna ficha
          </Typography>
        </div>
      )}

      {(usuario?.rol === "Administrador" || usuario?.rol === "Director") &&
        !fichaInstitucional &&
        !cargando && (
          <div style={{ marginBottom: "20px" }}>
            <Link href={"/gestion/institucional/generar_ficha_institucional"}>
              <Button variant="outlined">
                <AddBoxRounded />
                Nueva Ficha Institucional
              </Button>
            </Link>
          </div>
        )}
      {authUser &&
        fichaInstitucional &&
        (usuario?.rol != "Administrador" || usuario?.rol === "Director") && (
          <div style={{ marginBottom: "20px" }}>
            <Link href={`/gestion/institucional/${fichaInstitucional?.id}`}>
              <Button variant="contained" color="primary">
                Actualizar Ficha Institucional
              </Button>
            </Link>
          </div>
        )}

      {!cargando && fichaInstitucional && (
        <div>
          <Carrusel imagenes={fichaInstitucional?.portadaficha} />
          <Grid container spacing={2} sx={{ minWidth: "300px" }}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ marginTop: "30px" }}
                className={`${styles.Typography}`}
              >
                {fichaInstitucional?.nombreinstitucion}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className={`${styles.Typography2}`}>
                {fichaInstitucional?.descripcion}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ minWidth: "300px" }}>
            <Grid item xs={12}>
              <Divider sx={{ mb: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={`${styles.Typography}`}>
                Datos de Contacto
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                <strong>Provincia:</strong> {fichaInstitucional?.provincia}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                <strong>Ciudad:</strong> {fichaInstitucional?.ciudad}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                <strong>Correo:</strong> {fichaInstitucional?.mail}
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                <strong>{fichaInstitucional?.oficina1}</strong>
              </Typography>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                {fichaInstitucional?.telefono1}
              </Typography>
            </Grid>
            <Grid item xs={9} sx={{ minWidth: "300px" }}>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                <strong>{fichaInstitucional?.oficina2}</strong>
              </Typography>
              <Typography variant="body2" className={`${styles.Typography2}`}>
                {fichaInstitucional?.telefono2}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mb: 1 }} />
            </Grid>
          </Grid>
        </div>
      )}
      {cargando && (
        <Container sx={{ textAlign: "center" }}>
          <Loading size={80} />
        </Container>
      )}
    </Layout>
  );
}
