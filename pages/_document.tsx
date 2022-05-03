import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Tesis del colegio Manuel Belgrano realizada por los integrantes Nicolas Mamani, Luciano Ghione y Nicolas Juncos." />
                <meta name="author" content="Nicolas Mamani, Luciano Ghione, Nicolas Juncos" />
                <title>Instituto &quot;El Salvador&quot;</title>

                <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
              
            </Head>
            <body className="sb-nav-fixed">
                <div id="layoutSidenav">
                    <Main />
                </div>

                <NextScript />
            </body>
        </Html>
    )
}