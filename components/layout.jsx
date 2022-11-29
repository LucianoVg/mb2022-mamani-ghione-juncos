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

    useEffect(() => {
        if (!loading && authUser) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
                .then(res => {
                    if (res.data) {
                        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/gestion`)
                            .then(r => {
                                if (r.data) {
                                    console.log(r.data);
                                    setMenusGestion(r.data)
                                }
                            })

                        // axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/submenu/${res.data?.rol?.id}/reportes`)
                        //     .then(r => {
                        //         if (r.data) {
                        //             console.log(r.data);
                        //             setMenusReportes(r.data)
                        //         }
                        //     })
                    }
                })
        }
    }, [authUser, loading])

    return (
        <>
            <Head>
                <title>Instituto Privado &quot;El Salvador&quot;</title>
            </Head>
            <Sidebar menusGestion={menusGestion} />
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                <React.Fragment>
                    {children}
                </React.Fragment>
            </Container>
        </>
    );
}