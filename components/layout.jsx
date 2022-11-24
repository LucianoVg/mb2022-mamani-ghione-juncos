import * as React from 'react';
import { useState } from 'react';
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
            <Navbar open={open} toggleDrawer={toggleDrawer} />
            <Sidebar isOpen={open} toggleMenu={toggleDrawer} />
            <div className="container">
                <React.Fragment>
                    {children}
                </React.Fragment>
            </div>
        </>
    );
}