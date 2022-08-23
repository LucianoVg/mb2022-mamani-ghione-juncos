
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import Pagination from '../components/pagination'
import TarjetaNovedades from '../components/tarjeta_noticias'
import paginate from '../utils/paginate'

const Home = () => {
  const [noticias, setNoticias] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const paginateNoticias = paginate(noticias, currentPage, pageSize)

  const handlerPageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}/gestion/noticias_novedades`)
      .then(res => {
        console.log(res.data);
        setNoticias(res.data)
      })
  }, [])

  return (
    <Layout title={'Instituto "El Salvador"'}>
      <div className="row">
        {
          paginateNoticias.length > 0 && paginateNoticias.map((n, i) => (
            <div key={i} className="col-md-4">
              <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
            </div>
          ))
        }
      </div>
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
