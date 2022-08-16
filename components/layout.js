import { Navbar } from "./navbar";
import Sidenav from "./sidenav";
import Script from "next/script";

export const Layout = ({ children }) => {
    return (
        <>

            <div className="wrapper">
                <Sidenav />
                <div id="content">
                    <Navbar />
                    {children}
                </div>
                {/* 
                <Script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" />
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                />
                <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" strategy="lazyOnload" />
                <Script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" /> */}
                {/* 
                <Script src="js/datatables-simple-demo.js" strategy="lazyOnload" />
                <Script src="js/scripts.js" strategy="lazyOnload" />
                <Script src="assets/demo/chart-area-demo.js" strategy="lazyOnload" />
                <Script src="assets/demo/chart-bar-demo.js" strategy="lazyOnload" />
                <Script src="assets/demo/chart-pie-demo.js" strategy="lazyOnload" />
                <Script src="assets/demo/datatables-demo.js" strategy="worker" /> */}
            </div>
        </>
    )
}