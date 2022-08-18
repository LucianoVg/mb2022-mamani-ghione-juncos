import axios from 'axios';
import styles from "../styles/tarjetaNoticias.module.css";
import { useEffect, useState } from "react";

const TarjetaNovedades = () => {
    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/noticias_novedades`)
            .then(res => {
                console.log(res.data);
                setNoticias(res.data)
            })
    }, [])

    return (
        <div>
            {

                noticias && noticias.map((n, i) => (
                    <div className={`${styles.card}`} key={i}>
                        <img className="card-img-top "
                            src={n.noticias.url}
                            alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{n.noticias.titulo}</h5>
                            <p className="card-text">{n.noticias.descripcion}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>

                    </div>
                ))
            }

        </div>

    )
}

export default TarjetaNovedades