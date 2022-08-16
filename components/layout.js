import { Navbar } from "./navbar";
import Sidenav from "./sidenav";
import Head from "next/head";
import Script from "next/script";

export const Layout = ({ children, title }) => {
    return (
        <>
<<<<<<< Updated upstream
        
            <Script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossOrigin="anonymous"></Script>

            <Script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
                integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
                crossOrigin="anonymous"></Script>

            <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
                integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                crossOrigin="anonymous"></Script>

            <Script src="/js/scripts.js"></Script>
            
            <Script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"
                    integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ"
                    crossOrigin="anonymous"></Script>

                <Script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"
                    integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY"
                    crossOrigin="anonymous"></Script>
=======
>>>>>>> Stashed changes
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

            <div className="height-100 bg-light">
                {children}
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>

            <script src="/js/scripts.js"></script>
        </>
    )
}