import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../components/context/authUserProvider'
import { Layout } from '../components/layout'
import TarjetaNovedades from '../components/tarjeta_noticias'
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/router'
import { Grid, Pagination,Typography, Box } from "@mui/material";
import { usePagination } from '../components/hooks/paginationHook'
import { Container } from '@mui/system'
import Loading from "../components/loading";

const Home = () => {
  const [noticias, setNoticias] = useState()
  const [pagina, setPagina] = useState(1)
  const pageSize = 5
  const cantidadPaginas = Math.ceil(noticias?.length / pageSize)
  const paginacion = usePagination(noticias || [], pageSize)
  const { authUser } = useAuth()
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [usuario, setUsuario] = useState()

  const handlerCambioPagina = (e, pagina) => {
    setPagina(pagina)
    paginacion.saltar(pagina)
  }

  const traerNoticias = async () => {
    setCargando(true)
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`)
    if (res.data) {
      console.log(res.data);
      setNoticias(res.data)
    }
    setCargando(false)
  }

  const traerUsuario = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    if (res.data) {
      setUsuario(res.data)
    }
  }

  useEffect(() => {
    traerNoticias()
    traerUsuario()

  }, [authUser])

  return (
    <Layout>
      <Container maxWidth={'xl'} sx={{ marginTop: "90px" }} >
      <Typography variant="h4" 
            sx={{marginBottom:"20px"}}
            >
                Noticias y Novedades</Typography>

        {
          cargando && (
            <Container sx={{ textAlign: 'center' }}>
              <Loading size={80} />
            </Container>
          )
        }
        {
          authUser && (usuario?.rol?.tipo === 'Director' || usuario?.rol?.tipo === 'Administrador' || usuario?.rol?.tipo === 'Preceptor') && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => router.push('/gestion/noticias/agregar_noticias')}>
              Agregar
            </Button>
          )
        }
        <Box sx={{ flexGrow: 1, marginLeft: "-25px" }} >
          <Grid container >
            {
              paginacion.dataActual().map((n, i) => (
                <Grid item key={i} xs="auto">
                  <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
                </Grid>
              ))
            }
          </Grid>
        </Box>

        {
          !cargando && noticias && noticias.length > 0 && (
            <Container maxWidth={'lg'} sx={{ width: 'fit-content', textAlign: 'center' }}>
              <Pagination
                count={cantidadPaginas}
                size='large'
                page={pagina}
                variant="outlined"
                shape='circular'
                onChange={handlerCambioPagina} />
            </Container>
          )
        }
      </Container>
    </Layout>
  )
}

export default Home
