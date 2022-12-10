import { useEffect, useState } from 'react'
import { Layout } from "../../components/layout";
import BarChart from '../../components/graficos/BarChart'
import PieChart from '../../components/graficos/PieChart'
import LineChart from '../../components/graficos/LineChart'
import { Container } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../components/context/authUserProvider';
import { useRouter } from 'next/router';
import Loading from '../../components/loading';

export default function NotasXmateria() {
  const [usuario, setUsuario] = useState({ rol: '' })
  const router = useRouter()
  const [conteoNotas, setConteoNotas] = useState([])
  const [cargando, setCargando] = useState(false)
  const { loading, authUser } = useAuth()

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/gestion/cuenta/login')
    }
    traerUsuario()
    if (usuario.rol) {
      if (!tienePermisos()) {
        router.push('/error')
      } else {
        traerConteoNotas()
      }
    }
  }, [loading, authUser, usuario.rol])

  const tienePermisos = () => {
    return usuario.rol === 'Administrador'
      || usuario.rol === 'Director'
  }
  const traerUsuario = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    if (res.data) {
      console.log(res.data);
      setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    }
  }
  const traerConteoNotas = async () => {
    setCargando(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/${1}`)
    if (res.status === 200) {
      setConteoNotas(res.data)
    }
    setCargando(false)
  }
  return (
    <Layout>
      <Container sx={{ maxWidth: '80%', m: 'auto' }}>
        {
          !cargando && conteoNotas.length > 0 && (
            <BarChart
              data={conteoNotas}
            />
          )
        }
        {
          cargando && (
            <Container sx={{ textAlign: 'center' }}>
              <Loading size={80} />
            </Container>
          )
        }
      </Container>
    </Layout>
  );
}