
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../components/context/authUserProvider'
import { Layout } from '../components/layout'
import Pagination from '../components/pagination'
import TarjetaNovedades from '../components/tarjeta_noticias'
import paginate from '../utils/paginate'
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from 'next/router'
import { Grid } from "@mui/material";

const Home = () => {
  const [noticias, setNoticias] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const paginateNoticias = paginate(noticias || [], currentPage, pageSize)
  const { authUser } = useAuth()
  const router = useRouter()

  const handlerPageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_CLIENT_URL);
    axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`)
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setNoticias(res.data)
        }
      }).catch(err => {
        console.error(err);
      })
  }, [])

  return (
    <Layout>
      {
        authUser && (
          <Button variant="outlined" startIcon={<AddIcon />} onClick={() => router.push('/gestion/noticias/agregar_noticias')}>
            Agregar
          </Button>
        )
      }
      <Grid container spacing={2}>
        {
          paginateNoticias.length > 0 && paginateNoticias.map((n, i) => (
            <Grid key={i} item xs={4}>
              <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
            </Grid>
          ))
        }
      </Grid>

      {
        paginateNoticias.length > 0 && (
          <Pagination
            items={noticias.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlerPageChange} />
        )
      }
    </Layout>
  )
}

export default Home
