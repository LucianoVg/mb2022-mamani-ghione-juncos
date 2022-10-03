import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from '../../../components/calendar';
import { Layout } from '../../../components/layout';


export default function FechasExamen() {
  const [guardandoEvento, setGuardandoEvento] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [fechasExamen, setFechasExamen] = useState()

  useEffect(() => {
    traerExamenes()
  })

  const traerExamenes = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/examenes`)
    setFechasExamen(res.data)
  }

  /**
    * Propiedades basicas del item:
    * 
    * title = Titulo del evento
    * startDate = Fecha de inicio
    * endDate = Fecha de fin
    */

  const handleDataChange = (data) => {
    if (data.hasOwnProperty('added')) {
      console.log('Data added', data);
    } else {
      console.log('Data changed', data);
    }
  }
  return (
    <Layout>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      <Calendar data={fechasExamen} onDataChange={handleDataChange} />
    </Layout>
  )
}
