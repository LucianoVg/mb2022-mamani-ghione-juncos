
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import Pagination from '../components/pagination'
import TarjetaNovedades from '../components/tarjeta_noticias'
import { authStateChanged, traerImagen } from '../servicios/cuenta'
import paginate from '../utils/paginate'

const Home = () => {
  const [usuario, setUsuario] = useState({ email: '' })
  const [noticias, setNoticias] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5
  const paginateNoticias = paginate(noticias, currentPage, pageSize)

  const [fichaInstitucional, setFichaInstitucional] = useState({
    id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: [{ id: 0, nombre: '', url: '' }]
  })

  const handlerPageChange = (page) => {
    setCurrentPage(page)
  }

  const cargarFicha = async () => {
    axios.get('http://localhost:3000/api/gestion/institucional')
      .then(res => {
        console.log(res.data);
        setFichaInstitucional(res.data)
      })
  }
  useEffect(() => {
    cargarFicha()
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/gestion/noticias_novedades`)
      .then(res => {
        console.log(res.data);
        setNoticias(res.data)
      })
  }, [])

  useEffect(() => {
    authStateChanged(user => {
      console.log("Usuario logeado", user);
      if (user.email) {
        setUsuario({
          email: user.email
        })
      }
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
