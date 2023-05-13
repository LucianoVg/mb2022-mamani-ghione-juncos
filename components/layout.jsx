import * as React from "react";
import Container from "@mui/material/Container";
import { useAuth } from "./context/authUserProvider";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import Head from "next/head";
import axios from "axios";

export function Layout({ children }) {
  const { loading, authUser } = useAuth();
  const [menusGestion, setMenusGestion] = useState([]);
  const [menusReportes, setMenusReportes] = useState([]);

  useEffect(() => {
    if (!loading && authUser) {
      traerMenuGestion(authUser?.rol?.id);
      traerMenuReportes(authUser?.rol?.id);
    }
  }, [authUser, loading]);
  const traerMenuGestion = async (idRol) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${idRol}/gestion`
    );
    if (res.data) {
      console.log(res.data);
      setMenusGestion(res.data);
    }
  };
  const traerMenuReportes = async (idRol) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${idRol}/reportes`
    );
    if (res.data) {
      console.log(res.data);
      setMenusReportes(res.data);
    }
  };
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo_instituto.png" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="title" content="Instituto Privado El Salvador" />
        <meta
          name="description"
          content="Sistema academico realizado por los integrantes Nicolas Mamani, Luciano Ghione y Nicolas Juncos del colegio Manuel Belgrano."
        />
        <meta
          name="author"
          content="Nicolas Mamani, Luciano Ghione, Nicolas Juncos"
        />

        <title>Instituto Privado &quot;El Salvador&quot;</title>
      </Head>
      <Sidebar menusGestion={menusGestion} menusReportes={menusReportes} />

      <Container sx={{ mt: 10, mb: 4 }}>{children}</Container>
    </>
  );
}
