import { AppProps } from 'next/app';
import GlobalStyles from '@/layout/GlobalStyles';
import '../styles/global.css';
import HeaderComponent from '@/components/common/Header';
import { useState, useEffect } from 'react';
import * as eva from "eva-icons";

type ThemeMode = 'dark' | 'light';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [mode, setMode] = useState<ThemeMode>('light');
    useEffect(() => {
        eva.replace();
    }, []);
    return (
        <div className={mode} style={{ width: '100%', height: '100%'}}>
            <GlobalStyles />
            <HeaderComponent />
            <Component {...pageProps} />
        </div>
    )
};

export default MyApp;
