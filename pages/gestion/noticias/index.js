import axios from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../../../components/layout";
import TarjetaNovedades from "../../../components/tarjeta_noticias";

export default function NoticiasYNovedades() {
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/noticias_novedades`)
            .then(res => {
                console.log(res.data);
                setNoticias(res.data)
            })
    }, [])
    return (
        <Layout title={'Noticias y Novedades'}>
            <div className="row">
                {
                    noticias.length > 0 && noticias.map((n, i) => (
                        <div key={i} className="col-md-4">
                            <TarjetaNovedades titulo={n.titulo} descripcion={n.descripcion} url={n.url} />
                        </div>
                    ))
                }
            </div>
        </Layout>
    )
}