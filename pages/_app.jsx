import { AuthUserProvider } from "../components/context/authUserProvider";
import * as React from "react";
// import '../styles/scroll.css';
import "devextreme/dist/css/dx.light.css";
import "../styles/globals.css";
import "../styles/calendar.css";
import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";

export default function MyApp({ Component, pageProps }) {
  loadMessages(deMessages);
  locale("es-AR");
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}
