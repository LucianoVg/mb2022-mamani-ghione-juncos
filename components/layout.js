import { Navbar } from "./navbar";
import Sidenav from "./sidenav";
import Head from "next/head";
import script from "next/script";

export const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Tesis del colegio Manuel Belgrano realizada por los integrantes Nicolas Mamani, Luciano Ghione y Nicolas Juncos." />
                <meta name="author" content="Nicolas Mamani, Luciano Ghione, Nicolas Juncos" />
                <title>{title}</title>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossOrigin="anonymous" />

                {/* <link rel="stylesheet" href="css/style5.css" /> */}

                <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
                    integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
                    crossOrigin="anonymous"></script>

                <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
                    integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
                    crossOrigin="anonymous"></script>
            </Head>
            <div className="wrapper">
                <Sidenav />
                <div id="content">
                    <Navbar />
                    {children}
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossOrigin="anonymous"></script>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
                integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
                crossOrigin="anonymous"></script>

            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
                integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                crossOrigin="anonymous"></script>

            <script src="js/scripts.js"></script>
        </>
    )
}