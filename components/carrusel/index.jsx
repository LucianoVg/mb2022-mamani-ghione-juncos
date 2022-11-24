export default function Carrusel({ imagenes = [] }) {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {
                    imagenes.map((img, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                            <img src={img.url} className="d-block w-100" alt={i.nombre} />
                        </div>
                    ))
                }
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Anterior</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Siguiente</span>
            </a>
        </div>
    )
}