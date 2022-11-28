import * as React from 'react';
import { useState } from 'react';
import Sidebar from './sidebar';
import Head from 'next/head';
import { Navbar } from './navbar';

export function Layout({ children }) {

    return (
        <>
            <Head>
                <title>Instituto Privado &quot;El Salvador&quot;</title>
            </Head>
            <Navbar />
            <Sidebar />
            {children}
        </>
    );
}