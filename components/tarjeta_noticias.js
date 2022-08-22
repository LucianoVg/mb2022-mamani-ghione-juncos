import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authStateChanged } from "../servicios/cuenta";
import styles from "../styles/tarjetaNoticias.module.css";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const router = useRouter()
    const [logeado, setLogeado] = useState(false)
    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                setLogeado(true)
            } else {
                setLogeado(false)
            }
        })
    }, [])


    const eliminarNoticia = (idNoticia) => {
        if (confirm('Esta seguro de eliminar la noticia?')) {
            axios.delete(`http://localhost:3000/api/gestion/noticias_novedades/${idNoticia}`)
                .then(res => {
                    console.log(res.data);
                    router.reload()
                })
        }
    }
    return (
        <div className={`${styles.card}`} >
            <div className={`${styles.overflow}`}>

                <img className={`${styles.card_img_top}`}
                    src={url}
                    alt="Card image cap" />

                {
                    logeado && (
                        <a className={`${styles.btn}`} href={`/gestion/noticias/${id}`}>
                            <i className='bx bx-edit'></i>
                        </a>
                    )
                }
            </div>

            <div className="card-body">
                <h4 className="card-title"><strong>{titulo}</strong></h4>
                <p className="card-text">{descripcion.substring(0, 38) + '...'}</p>
                <a href={`/gestion/noticias/detalles/${id}`} className="btn btn-primary">Más info</a>
            </div>
        </div>
    )
}

export default TarjetaNovedades