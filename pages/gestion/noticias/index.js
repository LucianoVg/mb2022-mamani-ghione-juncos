import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import Pagination from "../../../components/pagination";
import TarjetaNovedades from "../../../components/tarjeta_noticias";
import { authStateChanged } from "../../../servicios/cuenta";
import paginate from "../../../utils/paginate";

export default function NoticiasYNovedades() {
    const [noticias, setNoticias] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    const [usuario, setUsuario] = useState({ email: '' })

    const handlerPageChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                setUsuario({
                    email: user.email
                })
            }
        })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/noticias_novedades`)
            .then(res => {
                console.log(res.data);
                setNoticias(res.data)
            })
    }, [])

    const paginateNoticias = paginate(noticias, currentPage, pageSize)

    return (
        <Layout title={'Noticias y Novedades'}>

            <div>
                <h1 className="text-center"> <strong>Noticias y Novedades</strong></h1>
                {
                    usuario.email !== '' && (
                        <a href="http://localhost:3000/gestion/noticias/agregar_noticias" className="btn btn-primary">Agregar</a>
                    )
                }
            </div>
            <div className="row">
                {
                    paginateNoticias.length > 0 && paginateNoticias.map((n, i) => (
                        <div key={i} className="col-md-4">
                            <TarjetaNovedades id={n.id} titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
                        </div>
                    ))
                }
            </div>
            <Pagination
                items={noticias.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlerPageChange} />
        </Layout>
    )
}