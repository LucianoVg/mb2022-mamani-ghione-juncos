import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Calendar from "../../../components/calendar";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";

export default function FechasExamen() {
  const [guardandoEvento, setGuardandoEvento] = useState(false);
  const [fechasExamen, setFechasExamen] = useState([]);
  const { loading, authUser } = useAuth();
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/gestion/cuenta/login");
    }
    if (authUser && authUser?.rol) {
      if (!tienePermisos()) {
        router.push("/error");
      } else {
        traerExamenes();
      }
    }
  }, [loading, authUser]);

  const tienePermisos = () => {
    return (
      authUser.rol?.tipo === "Administrador" ||
      authUser.rol?.tipo === "Vicedirector" ||
      authUser.rol?.tipo === "Docente" ||
      authUser.rol?.tipo === "Estudiante" ||
      authUser.rol?.tipo === "Tutor"
    );
  };
  const traerExamenes = async () => {
    let param =
      authUser?.rol?.tipo === "Estudiante"
        ? `?idCurso=${authUser?.alumnoxcursoxdivision1[0]?.idcursoxdivision}`
        : authUser?.rol?.tipo === "Docente"
        ? `?idDocente=${authUser?.docentexmateria[0]?.idusuario}`
        : authUser?.rol?.tipo === "Tutor"
        ? `?idCursos=${authUser?.alumnoxcursoxdivision2?.map(
            (axc) => axc.cursoxdivision?.curso?.id
          )}`
        : "";
    console.log("Examenes param:", param);
    setCargando(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes${param}`
    );
    if (res.data) {
      console.log(res.data);
      let events = [];
      res.data?.map((d) =>
        events.push({
          idCurso: d.idcurso,
          text: d.titulo,
          startDate: d.fechainicio,
          endDate: d.fechafin,
          id: d.id,
          idusuario: d.idUsuario,
        })
      );
      setFechasExamen(events);
    }
    setCargando(false);
  };
  const guardarExamen = async (idCurso, asunto, fechaInicio, fechaFin) => {
    setGuardandoEvento(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`,
      {
        titulo: asunto,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        idUsuario: authUser?.id,
        idCurso: idCurso,
      }
    );
    if (res.data) {
      console.log(res.data);
    }
    setGuardandoEvento(false);
    traerExamenes();
  };
  const modificarExamen = async (id, text, startDate, endDate, idCurso) => {
    setGuardandoEvento(true);
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`,
      {
        titulo: text,
        fechaInicio: startDate,
        fechaFin: endDate,
        idCurso: idCurso,
        idUsuario: authUser?.id,
      }
    );
    setGuardandoEvento(false);
    if (res.status === 200) {
      console.log(res.data);
      traerExamenes();
    }
  };
  const eliminarExamen = async (id) => {
    setGuardandoEvento(true);
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`
    );
    setGuardandoEvento(false);
    if (res.status === 200) {
      console.log(res.data);
      traerExamenes();
    }
  };
  /**
   * Propiedades basicas del Evento:
   * id = Id del evento
   * text = Titulo del evento
   * startDate = Fecha de inicio
   * endDate = Fecha de fin
   */

  const onAdd = ({ idCurso, asunto, fechaInicio, fechaFin }) => {
    console.log(idCurso, asunto, fechaInicio, fechaFin, authUser?.id);
    guardarExamen(idCurso, asunto, fechaInicio, fechaFin);
  };
  const onUpdate = ({ id, asunto, fechaInicio, fechaFin, idCurso }) => {
    console.log(id, asunto, fechaInicio, fechaFin, idCurso, authUser.id);
    modificarExamen(id, asunto, fechaInicio, fechaFin, idCurso);
  };
  const onDelete = ({ id }) => {
    // console.log(id);
    eliminarExamen(id);
  };
  return (
    <Layout>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Fechas de Examen
      </Typography>
      {!guardandoEvento && !cargando && (
        <Calendar
          authUser={authUser}
          data={fechasExamen}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
      {guardandoEvento ||
        (cargando && (
          <Container maxWidth={"md"} sx={{ m: "auto", textAlign: "center" }}>
            <Loading size={80} />
          </Container>
        ))}
    </Layout>
  );
}
