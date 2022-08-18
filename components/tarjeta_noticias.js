import styles from "../styles/tarjetaNoticias.module.css";

const TarjetaNovedades = ({ url, titulo, descripcion }) => {

    return (
        <div className={`${styles.html} ${styles.body} ${styles.all}`}>
            <div className={`${styles.grid} `}>
                <div className={styles.grid__item}>
                    <div className={styles.card}>
                        <img className={`${styles.card__img}`} src={url} alt="Snowy Mountains" />
                        <div className={styles.card__content}>
                            <h1 className={styles.card__header}>{titulo}</h1>
                            <p className={styles.card__text}>{descripcion}
                            </p>
                            <button className={styles.card__btn}>Explore
                                <span>&rarr;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TarjetaNovedades