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
  const [fechasExamen, setFechasExamen] = useState()
  const { loading, authUser } = useAuth()
  const router = useRouter()
  const [usuario, setUsuario] = useState({ id: '' })

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/gestion/cuenta/login')
    }
    traerUsuario()
    traerExamenes()
  }, [loading, authUser, usuario.id])

  const traerUsuario = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    if (res.data) {
      setUsuario({ id: res.data?.id })
    }
  }
  const traerExamenes = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`)
    if (res.data) {
      let events = []
      res.data?.map(d => events.push({ text: d.titulo, startDate: d.fechainicio, endDate: d.fechafin, id: d.id, idusuario: d.idUsuario }))
      setFechasExamen(events)
    }
  }
  const guardarExamen = async (titulo, fechaInicio, fechaFin, idUsuario) => {
    setGuardandoEvento(true)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`, {
      titulo: titulo,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      idUsuario: idUsuario,
    })
    if (res.data) {
      console.log(res.data);
      setGuardandoEvento(false)
    }
    traerExamenes()
  }
  const modificarExamen = async (id, text, startDate, endDate) => {
    setGuardandoEvento(true)
    const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`, {
      titulo: text,
      fechaInicio: startDate,
      fechaFin: endDate,
      idUsuario: usuario.id
    })
    if (res.data) {
      console.log(res.data);
      setGuardandoEvento(false)
    }
    traerExamenes()
  }
  const eliminarExamen = async (id) => {
    setGuardandoEvento(true)
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`)
    if (res.data) {
      console.log(res.data);
      setGuardandoEvento(false)
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

  const onAdd = ({ text, startDate, endDate }) => {
    console.log(text, startDate, endDate);
    guardarExamen(text, startDate, endDate, usuario.id)
  }
  const onUpdate = ({ id, text, startDate, endDate }) => {
    console.log(id, text, startDate, endDate);
    modificarExamen(id, text, startDate, endDate)
  }
  const onDelete = ({ id }) => {
    console.log(id);
    eliminarExamen(id)
  }
  return (
    <Layout>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      {
        !guardandoEvento && (
          <Calendar data={fechasExamen}
            onAdd={onAdd}
            onUpdate={onUpdate}
            onDelete={onDelete} />
        )
      }
      {
        guardandoEvento && (
          <Container maxWidth={'md'} sx={{ m: 'auto', textAlign: 'center' }}>
            <Loading size={80} />
          </Container>
        )
      }
    </Layout>
  )
}
