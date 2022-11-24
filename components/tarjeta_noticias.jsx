import Image from "next/image";
import styles from "../styles/tarjetaNoticias.module.css";
import { useAuth } from "./context/authUserProvider";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const TarjetaNovedades = ({ id, url, titulo, descripcion }) => {
    const { authUser } = useAuth()
    const router = useRouter()

    return (
        <div className={styles.card}>
            <div style={{ position: 'relative', backgroundColor: 'blue' }}>

                <div className={` ${styles.overflow}`} >
                    <Image
                        className={`${styles.card_img_top}`}
                        component="img"
                        width={300}
                        height={310}
                        layout="responsive"
                        src={url}
                        alt="imagen"
                    />
                    {
                        authUser && (
                            <a className={styles.editButton} href={`/gestion/noticias/${id}`} style={{ position: 'absolute', left: 250, bottom: 235, }} >
                                <FontAwesomeIcon
                                    icon={faEdit} />
                            </a>
                        )
                    }
                </div>
            </div>
            <div className={styles.cardContent}>
                <h5>{titulo}</h5>
                <p>{descripcion}</p>
            </div>
            <div className={styles.CardActions}>
                <button className={styles.btn} onClick={() => router.push(`/gestion/noticias/detalles/${id}`)}>Mas info.</button>
            </div>
        </div>
    )
}

export default TarjetaNovedades