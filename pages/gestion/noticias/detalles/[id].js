import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../../../components/layout";

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: 0
    })
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.BASE_URL}/gestion/noticias_novedades/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNoticia(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }

    }, [id])


    return (
        <Layout title={'Detalles de la noticia'}>
            {
                noticia.id !== 0 && (
                    <div className="container text-center">
                        <Image src={noticia.url !== '' ? noticia.url : '/assets/img/placeholder.png'} width={400} height={400} />

                        <h3 className="text-center">{noticia.titulo}</h3>
                        <p>{noticia.descripcion}</p>
                    </div>
                )
            }
        </Layout>
    )
}