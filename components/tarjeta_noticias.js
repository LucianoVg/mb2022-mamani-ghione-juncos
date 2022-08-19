import styles from "../styles/tarjetaNoticias.module.css";

const TarjetaNovedades = ({ url, titulo, descripcion }) => {

    return (
        <div className={`${styles.card}`} >

            <img className={`${styles.card_img_top}`}
                src={url}
                alt="Card image cap" />
            <a className={`${styles.btn}`}>
                <i className='bx bxs-edit' ></i>
            </a>

            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
                <a href="#" className="btn btn-primary">Mas Informacion</a>
            </div>
        </div>
    )
}

export default TarjetaNovedades