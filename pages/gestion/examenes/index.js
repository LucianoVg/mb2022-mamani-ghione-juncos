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
    if (res.data) {
      setFechasExamen(res.data)
    }
  }

  /**
    * Propiedades basicas del item:
    * 
    * label = Titulo del evento
    * description = Descripcion del evento
    * dateStart = Fecha de inicio
    * dateEnd = Fecha de fin
    * backgroundColor = Color del evento
    */
  const handleItemChange = (e, action) => {
    console.log(e, action);
  }
  const handleDelete = (id) => {
    console.log(id);
  }
  return (
    <Layout>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      <Calendar data={fechasExamen || []} onItemChange={null} onDeleteItem={null} />
    </Layout>
  )
}
