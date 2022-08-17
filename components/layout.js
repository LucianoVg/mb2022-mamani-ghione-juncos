import { Navbar } from "./navbar";
import Sidenav from "./sidenav";
import Head from "next/head";
import Carrusel from "./carrusel";
import { useEffect, useState } from "react";
import { traerImagen } from "../servicios/cuenta";
import { tarjeta } from "./tarjeta_noticias";

export const Layout = ({ children, title }) => {
    const [imagenes, setImagenes] = useState([])

    const loadImages = async () => {
        const imagen1 = await traerImagen('imagen1.jpg')
        const imagen2 = await traerImagen('imagen2.jpeg')
        const imagen3 = await traerImagen('imagen3.jpg')
        setImagenes([imagen1, imagen2, imagen3])
    }
    useEffect(() => {
        loadImages()
    }, [])
    return (
        <>
            <Head>
            <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="deScription" content="Tesis del colegio Manuel Belgrano realizada por los integrantes Nicolas Mamani, Luciano Ghione y Nicolas Juncos." />
                <meta name="author" content="Nicolas Mamani, Luciano Ghione, Nicolas Juncos" />
                <title>{title}</title>

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                    crossOrigin="anonymous" />

                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
                {/* <link rel="stylesheet" href="css/style5.css" /> */}
             

            </Head>
            <Navbar />
            <Sidenav />

            <div className="h-100">
                {
                    imagenes.length > 0 && (
                        <Carrusel imagenes={imagenes} />
                    )
                }

                <tarjeta/>
                {children}
            </div>
        </>
    )
}


