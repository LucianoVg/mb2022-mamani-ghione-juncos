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
  const [mensaje, setMensaje] = useState("")
  const [fechasExamen, setFechasExamen] = useState()
  const { loading, authUser } = useAuth()
  const router = useRouter()
  const [usuario, setUsuario] = useState({ id: '' })
  const [examen, setExamen] = useState({ id: '', title: '', startDate: null, endDate: null, idUsuario: '' })

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
      res.data?.map(d => events.push({ title: d.titulo, startDate: d.fechaInicio, endDate: d.fechaFin, id: d.id, idUsuario: d.idUsuario }))
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
  const modificarExamen = async (id, titulo = '', fechaInicio = '', fechaFin = '', idUsuario) => {
    setGuardandoEvento(true)
    const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes/${id}`, {
      titulo: titulo,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      idUsuario: idUsuario
    })
    if (res.data) {
      console.log(res.data);
      setGuardandoEvento(false)
      setExamen({ id: '', title: '', startDate: null, endDate: null, idUsuario: '' })
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
    * title = Titulo del evento
    * startDate = Fecha de inicio
    * endDate = Fecha de fin
    */

  const handleDataChange = async (data) => {
    if (data.hasOwnProperty('added')) {
      guardarExamen(data['added'].title,
        data['added'].startDate,
        data['added'].endDate,
        usuario.id)
    }
    if (data.hasOwnProperty('changed')) {
      const changed = data['changed']
      fechasExamen.map(f => {
        if (changed.hasOwnProperty(f.id)) {
          setExamen({ ...f })
          if (changed[f.id].title) {
            examen.title = changed[f.id].title
          }
          if (changed[f.id].startDate) {
            examen.startDate = changed[f.id].startDate
          }
          if (changed[f.id].endDate) {
            examen.endDate = changed[f.id].endDate
          }
          return
        }
      })
      await modificarExamen(examen.id, examen.title, examen.startDate, examen.endDate, examen.idUsuario)
    }
    if (data.hasOwnProperty('deleted')) {
      const id = data['deleted']
      eliminarExamen(id)
    }
  }
  return (
    <Layout>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      {
        !guardandoEvento && (
          <Calendar data={fechasExamen} onDataChange={handleDataChange} />
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
