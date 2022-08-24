import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Pagination from "../../../components/pagination";
import TarjetaNovedades from "../../../components/tarjeta_noticias";
import paginate from "../../../utils/paginate";

export default function NoticiasYNovedades() {
    const [noticias, setNoticias] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    const { authUser } = useAuth()

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

    const paginateNoticias = paginate(noticias, currentPage, pageSize)

    return (
        <Layout title={'Noticias y Novedades'}>
            <div>
                <h1 className="text-center">Noticias y Novedades</h1>
                {
                    authUser && (
                        <a href="/gestion/noticias/agregar_noticias" className="btn btn-primary">Agregar</a>
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