import { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../../../../components/layout";
import { useRouter } from "next/router";
import { useAuth } from "../../../../components/context/authUserProvider";
import {
  Box,
  Stack,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Loading from "../../../../components/loading";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const MasInfo = () => {
  const { loading, authUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [asistencia, setAsistencia] = useState();
  const [cargando, setCargando] = useState(false);

  const listarAsistencia = async () => {
    if (id) {
      setCargando(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencia_docente/detalles/${id}`
      );
      if (res.data) {
        console.log(res.data);
        setAsistencia(res.data);
      }
      setCargando(false);
    }
  };
  const tienePermisos = () => {
    return (
      authUser.rol?.tipo === "Administrador" ||
      authUser.rol?.tipo === "Director" ||
      authUser.rol?.tipo === "Vicedirector" ||
      authUser.rol?.tipo === "Preceptor"
    );
  };

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      }
    }
    listarAsistencia();
  }, [id, loading, authUser]);

  return (
    <Layout>
      {!cargando && (
         <div>
         <Grid container spacing={2}>
           <Grid item xs={12}>
             <Button
               sx={{ border: "none", marginLeft: "-20px" }}
               className="buttonRegresar"
               href="/gestion/asistencias"
               startIcon={<ArrowBackIosIcon />}
             >
               Regresar
             </Button>
           </Grid>
           <Grid item xs={12}>
             <Typography variant="h4" sx={{ marginBottom: "50px" }}>
               Detalle de Asistencia Docente
             </Typography>
           </Grid>
         </Grid>

         <Stack direction="row" sx={{ marginBottom: "40px" }}>

           <Box component="div" sx={{ marginRight: "140px" }}>
             <Typography variant="h5" sx={{ fontWeight: 500 }}>
               Docente:{" "}
             </Typography>
             <Typography variant="body1" sx={{ fontSize: 18 }}>
             {asistencia?.docente?.apellido} {asistencia?.docente?.nombre}
             </Typography>
           </Box>
       
       
           {asistencia?.motivo != null ? (
             <Box component={"div"} >
               <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
                 Editado por:{" "}
               </Typography>
               <Typography variant="body1" sx={{ fontSize: 18 }}>
                 {asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}
               </Typography>
             </Box>
           ) : (
             <Box component="div" sx={{ marginBottom: 2 }}>
               <Typography variant="h5" sx={{ fontWeight: 500 }}>
                 Creado por:
               </Typography>
               <Typography variant="body1" sx={{ fontSize: 18 }}>
                 {asistencia?.usuario?.nombre} {asistencia?.usuario?.apellido}
               </Typography>
             </Box>
           )}
         </Stack>

         <Divider sx={{ width: "100%", marginBottom: 2 }} />

         <Stack direction="row" sx={{ marginBottom: "40px" }}>
           <Box sx={{ marginRight: "140px" }}>
             <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
               Asistencia Actual
             </Typography>
             {asistencia?.presente ? (
               <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                 Presente
               </Typography>
             ) : asistencia?.ausente ? (
               <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                 Ausente
               </Typography>
             ) : asistencia?.ausentejustificado ? (
               <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                 Ausente Justificado
               </Typography>
             ) : asistencia?.llegadatarde ? (
               <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                 Llegada Tarde
               </Typography>
             ) : asistencia?.mediafalta ? (
               <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                 Media Falta
               </Typography>
             ) : (
               <h4>-</h4>
             )}
           </Box>
           <Box sx={{ marginRight: "140px" }}>
             <Typography variant={"h5"} sx={{ fontWeight: 500 }}>
               Creado el:{" "}
             </Typography>
             <Typography variant={"body1"} sx={{ fontSize: 18 }}>
               {asistencia?.creadoen}
             </Typography>
           </Box>
           <Box>
             {asistencia?.actualizadoen ? (
               <Box component="div" sx={{ marginBottom: 2 }}>
                 <Typography variant="h5" sx={{ fontWeight: 500 }}>
                   Actualizado el:
                 </Typography>
                 <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                   {asistencia?.actualizadoen}
                 </Typography>
               </Box>
             ) : (
               <Box component="div" sx={{ marginBottom: 2 }}>
                 <Typography variant="h5" sx={{ fontWeight: 500 }}>
                   Actualizado en:
                 </Typography>
                 <Typography variant={"body1"} sx={{ fontSize: 18 }}>
                   --/--/----
                 </Typography>
               </Box>
             )}
           </Box>
         </Stack>
         <Divider sx={{ width: "100%", marginBottom: 2 }} />

         <Box>
           <Typography variant="h5" sx={{ fontWeight: 500 }}>
             Motivo
           </Typography>
           <Typography variant="body1" sx={{ fontSize: 18 }}>
             {asistencia?.motivo || "N/A"}
           </Typography>
         </Box>
       </div>
      
      )}
      {cargando && (
        <Container sx={{ textAlign: "center" }}>
          <Loading size={80} />
        </Container>
      )}
    </Layout>
  );
};

export default MasInfo;
