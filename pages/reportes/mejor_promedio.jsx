import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authUserProvider";
import PieChartA from "../../components/graficos/PieChartA";
import PieChartB from "../../components/graficos/PieChartB";
import { Layout } from "../../components/layout";
import Loading from "../../components/loading";

export default function Dashboard() {
  const router = useRouter();
  const [mejoresPromediosA, setmejoresPromediosA] = useState([]);
  const [mejoresPromediosB, setmejoresPromediosB] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { loading, authUser } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traermejoresPromediosA();
        traermejoresPromediosB();
      }
    }
  }, [loading, authUser, authUser?.rol?.tipo]);

  const tienePermisos = () => {
    return (
      authUser?.rol?.tipo === "Administrador" ||
      authUser?.rol?.tipo === "Director"
    );
  };

  const traermejoresPromediosA = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/a`
    );
    console.log(res.data);
    if (res.status === 200) {
      setmejoresPromediosA(res.data);
    }
    setCargando(false);
  };
  const traermejoresPromediosB = async () => {
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/mejor_promedio/b`
    );
    console.log(res.data);
    if (res.status === 200) {
      setmejoresPromediosB(res.data);
    }
    setCargando(false);
  };
  const handleSelect = (e) => {
    traerConteoNotas(Number(e.target.value));
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Reporte Mejores Promedios
      </Typography>
      <Grid container spacing={2} flex>
        <Grid item xs={6}>
          {!cargando && mejoresPromediosA.length > 0 && (
            <Card
              sx={{
                backgroundColor: "#f9f9f9",
                minWidth: "400px",
                minHeight: "200px",
              }}
            >
              <CardContent>
                <PieChartA data={mejoresPromediosA} />
              </CardContent>
            </Card>
          )}
          {cargando && (
            <Container sx={{ textAlign: "center" }}>
              <Loading size={50} />
            </Container>
          )}
        </Grid>
        <Grid item xs={6}>
          {!cargando && mejoresPromediosB.length > 0 && (
            <Card
              sx={{
                backgroundColor: "#f9f9f9",
                minWidth: "400px",
                minHeight: "200px",
              }}
            >
              <CardContent>
                <PieChartB data={mejoresPromediosB} />
              </CardContent>
            </Card>
          )}
          {cargando && (
            <Container sx={{ textAlign: "center" }}>
              <Loading size={50} />
            </Container>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
