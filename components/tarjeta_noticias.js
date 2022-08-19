import styles from "../styles/tarjetaNoticias.module.css";

const TarjetaNovedades = ({ url, titulo, descripcion }) => {

    return (
        <div className={`${styles.card}`} >
            <div className={`${styles.overflow}`}>

                <img className={`${styles.card_img_top}`}
                    src={url}
                    alt="Card image cap" />
                <a className={`${styles.btn}`}>
                    <i className='bx bxs-edit' ></i>
                </a>
            </div>

            <div className="card-body">
                <h4 className="card-title"><strong>{titulo}</strong></h4>
                <p className="card-text">{descripcion}</p>
                <a href="#" className="btn btn-primary">Más info</a>
            </div>
        </div>
    )
}

export default TarjetaNovedades