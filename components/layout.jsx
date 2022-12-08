import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useAuth } from './context/authUserProvider';
import { useState } from 'react';
import { useEffect } from 'react';
import Sidebar from './sidebar';
import Head from 'next/head';
import axios from 'axios';

export function Layout({ children }) {
    const { loading, authUser } = useAuth()
    const [menusGestion, setMenusGestion] = useState([])
    const [menusReportes, setMenusReportes] = useState([])

    useEffect(() => {
        if (!loading && authUser) {
            traerUsuario()
        }
    }, [authUser, loading])
    const traerMenuGestion = async (idRol) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${idRol}/gestion`)
        if (res.data) {
            console.log(res.data);
            setMenusGestion(res.data)
        }
    }
    const traerMenuReportes = async (idRol) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${idRol}/reportes`)
        if (res.data) {
            console.log(res.data);
            setMenusReportes(res.data)
        }
    }
    const traerUsuario = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
        if (res.data) {
            await traerMenuGestion(res.data?.rol?.id)
            await traerMenuReportes(res.data?.rol?.id)
        }
    }
    return (
        <>
            <Head>
                <title>Instituto Privado &quot;El Salvador&quot;</title>
            </Head>
            <Sidebar
                menusGestion={menusGestion}
                menusReportes={menusReportes} />

            <Container sx={{ mt: 10, mb: 4 }}>
                {children}
            </Container>
        </>
    );
}