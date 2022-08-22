import Image from "next/image"
export default function Carrusel({ imagenes = [] }) {
    return (
        <div id="carouselExampleControls" style={{ width: 900, margin: 'auto' }} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    imagenes.map((img, i) => (
                        <div key={img.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                            <Image src={img.url !== '' ? img.url : '/assets/img/placeholder.png'} className="d-block w-100" alt={img.nombre} width={1200} height={500} />
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    )
}