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
import { Navbar } from './navbar';

export function Layout({ children }) {
    const [open, setOpen] = useState(true)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <>
            <Head>
                <title>Instituto Privado &quot;El Salvador&quot;</title>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar open={open} toggleDrawer={toggleDrawer} />
                <Sidebar open={open} toggleDrawer={toggleDrawer} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <React.Fragment>
                            {children}
                        </React.Fragment>
                    </Container>
                </Box>
            </Box>
        </>
    );
}