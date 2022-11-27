import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../components/context/authUserProvider'
import { Layout } from '../components/layout'
import TarjetaNovedades from '../components/tarjeta_noticias'
import { useRouter } from 'next/router'
import Pagination from '../components/Pagination/Pagination'
import Loading from '../components/loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [noticias, setNoticias] = useState()
  const [pagina, setPagina] = useState(0)
  const pageSize = 3
  const { authUser } = useAuth()
  const router = useRouter()
  const [cargandoInfo, setCargandoInfo] = useState(false)

  const paginatedNoticias = () => noticias?.slice(pagina, pagina + pageSize)
  const nextPage = () => {
    if (noticias?.length > pagina + pageSize) setPagina(pagina => pagina + pageSize)
  }
  const previousPage = () => {
    if (pagina > 0) setPagina(pagina => pagina - pageSize)
  }

  const traerNoticias = () => {
    setCargandoInfo(true)
    axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades`)
      .then(res => {
        if (res.data) {
          console.log(res.data);
          setNoticias(res.data)
          setCargandoInfo(false)
        }
      }).catch(err => {
        console.error(err);
        setCargandoInfo(false)
      })
  }

  useEffect(() => {
    traerNoticias()
  }, [])

  return (
    <Layout>
      <div className='container' style={{ marginTop: "20px", marginBottom: "20px" }}>
        {
          authUser && (
            <a
              href="/gestion/noticias/agregar_noticias"
              className="btn btn-outline-primary">
              <FontAwesomeIcon
                icon={faAdd} />
              Agregar Noticia
            </a>
          )
        }
        {
          cargandoInfo && (
            <div className="col-md-4 m-auto">
              <Loading />
            </div>
          )
        }
        <div className="row">
          {
            noticias && paginatedNoticias().map((n, i) => (
              <div key={i} className="col-md-4">
                <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
              </div>
            ))
          }
        </div>
        {
          noticias && noticias.length > 0 && (
            <div className="container">
              <Pagination
                onNextPage={nextPage}
                onPrevPage={previousPage}
              />
            </div>
          )
        }
      </div>
    </Layout>
  )
}

export default Home
