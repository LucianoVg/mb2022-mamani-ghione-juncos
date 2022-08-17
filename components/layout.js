import { Navbar } from "./navbar";
import Sidenav from "./sidenav";
import Head from "next/head";

export const Layout = ({ children, title }) => {

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="deScription" content="Tesis del colegio Manuel Belgrano realizada por los integrantes Nicolas Mamani, Luciano Ghione y Nicolas Juncos." />
                <meta name="author" content="Nicolas Mamani, Luciano Ghione, Nicolas Juncos" />
                <title>{title}</title>

                {/* <link rel="stylesheet" href="css/style5.css" /> */}

            </Head>
            <Navbar />
            <Sidenav />

            <div className="h-100">

                {children}
            </div>
        </>
    )
}