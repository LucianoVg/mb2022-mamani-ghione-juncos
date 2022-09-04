import Image from "next/image";
import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()

    return (
        <div className={`${styles.card}`} >
            <div className={`${styles.overflow}`}>
                <Image className={`${styles.card_img_top}`}
                    src={url}
                    width={300}
                    height={300}
                    layout="responsive"
                    alt="Card image cap" />

                {
                    authUser && (
                        <a className={`${styles.btn}`} href={`/gestion/noticias/${id}`}>
                            <i className='bx bx-edit'></i>
                        </a>
                    )
                }
            </div>

            <div className="card-body">
                <h4 className="card-title"><strong>{titulo.substring(0, 20) + '...'}</strong></h4>
                <p className="card-text">{descripcion.substring(0, 38) + '...'}</p>
                <a href={`/gestion/noticias/detalles/${id}`} className="btn btn-primary">Más info</a>
            </div>
        </div>
    )
}

export default TarjetaNovedades