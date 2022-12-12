import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Calendar from '../../../components/calendar';
import { useAuth } from '../../../components/context/authUserProvider';
import { Layout } from '../../../components/layout';
import Loading from '../../../components/loading';


export default function FechasExamen() {
  const [guardandoEvento, setGuardandoEvento] = useState(false)
  const [fechasExamen, setFechasExamen] = useState([])
  const { loading, authUser } = useAuth()
  const router = useRouter()
  const [usuario, setUsuario] = useState({ id: 0, rol: '' })
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/gestion/cuenta/login')
    }
    traerUsuario()
    if (usuario.rol) {
      if (!tienePermisos()) {
        router.push('/error')
      } else {
        traerExamenes()
      }
    }
  }, [loading, authUser, usuario.id, usuario.rol])

  const tienePermisos = () => {
    return usuario.rol === 'Administrador'
      || usuario.rol === 'Vicedirector'
      || usuario.rol === 'Docente'
      || usuario.rol === 'Estudiante'
      || usuario.rol === 'Tutor'
  }
  const traerUsuario = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    if (res.data) {
      setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    }
  }
  const traerExamenes = async () => {
    setCargando(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`)
    if (res.data) {
      console.log(res.data);
      let events = []
      res.data?.map(d => events.push({ idCurso: d.idcurso, text: d.titulo, startDate: d.fechainicio, endDate: d.fechafin, id: d.id, idusuario: d.idUsuario }))
      setFechasExamen(events)
    }
    setCargando(false)
  }
  const guardarExamen = async (idCurso, asunto, fechaInicio, fechaFin, idUsuario) => {
    setGuardandoEvento(true)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`, {
      titulo: asunto,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      idUsuario: idUsuario,
      idCurso: idCurso
    })
    if (res.data) {
      console.log(res.data);
    }
    setGuardandoEvento(false)
    traerExamenes()
  }
  const modificarExamen = async (id, text, startDate, endDate, idCurso) => {
    setGuardandoEvento(true)
    const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`, {
      titulo: text,
      fechaInicio: startDate,
      fechaFin: endDate,
      idCurso: idCurso,
      idUsuario: usuario.id
    })
    setGuardandoEvento(false)
    if (res.status === 200) {
      console.log(res.data);
      traerExamenes()
    }
  }
  const eliminarExamen = async (id) => {
    setGuardandoEvento(true)
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`)
    setGuardandoEvento(false)
    if (res.status === 200) {
      console.log(res.data);
      traerExamenes()
    }
  }
  /**
    * Propiedades basicas del Evento:
    * id = Id del evento
    * text = Titulo del evento
    * startDate = Fecha de inicio
    * endDate = Fecha de fin
    */

  const onAdd = (idCurso, asunto, fechaInicio, fechaFin) => {
    // console.log(idCurso, asunto, fechaInicio, fechaFin, usuario.id);
    guardarExamen(idCurso, asunto, fechaInicio, fechaFin, usuario.id)
  }
  const onUpdate = ({ id, asunto, fechaInicio, fechaFin, idCurso }) => {
    // console.log(id, asunto, fechaInicio, fechaFin, idCurso, usuario.id);
    modificarExamen(id, asunto, fechaInicio, fechaFin, idCurso)
  }
  const onDelete = ({ id }) => {
    // console.log(id);
    eliminarExamen(id)
  }
  return (
    <Layout>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      {
        !guardandoEvento && !cargando && (
          <Calendar data={fechasExamen}
            onAdd={onAdd}
            onUpdate={onUpdate}
            onDelete={onDelete} />
        )
      }
      {
        guardandoEvento || cargando && (
          <Container maxWidth={'md'} sx={{ m: 'auto', textAlign: 'center' }}>
            <Loading size={80} />
          </Container>
        )
      }
    </Layout>
  )
}
