import { Typography } from '@mui/material';
import Calendar from '../../../components/calendar';
import { Layout } from '../../../components/layout';


export default function FechasExamen() {
  return (
    <Layout>
      <Typography variant='h3' sx={{ textAlign: 'center' }}>Fechas de Examen</Typography>
      <Calendar />
    </Layout>
  )
}
