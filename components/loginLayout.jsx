import * as React from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import style from '../styles/loginLayout.module.css';

export default function LoginLayout({ children }) {
    return (
        <>
            <Head>
                <title>Iniciar Sesion</title>
            </Head>
            <div className={style.login_container}>
                <div className={style.login_form_1}>
                    {/* <img className={style.loginImage} src={'/assets/img/portada.jpg'} alt="portada" /> */}
                </div>
                <div className={style.login_form_2}>
                    <div className="container text-center">
                        <FontAwesomeIcon
                            alignmentBaseline='central'
                            size='3x'
                            icon={faUserCircle} />
                    </div>
                    <h3 className='text-center'>
                        Ingrese con su cuenta
                    </h3>
                    {children}
                </div>
            </div>
        </>
    );
}