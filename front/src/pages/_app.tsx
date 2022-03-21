import { AppProps } from 'next/app';
import GlobalStyles from '@/layout/GlobalStyles';
import '../styles/global.css';
import HeaderComponent from '@/components/common/Header';
import { useState, useEffect } from 'react';
import * as eva from "eva-icons";
import { ThemeMode } from '@/stores/interface';
import { Provider } from 'react-redux'
import { useStore } from '@/stores/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const store = useStore(pageProps.initialReduxState)
    const [mode, setMode] = useState<ThemeMode>('light');
    useEffect(() => {
        eva.replace({
            type: 'zoom',
            hover: true,
            infinite: true,
        });
    }, []);
    return (
        <Provider store={store}>
            <div className={mode} style={{ width: '100%', height: '100%'}}>
                <GlobalStyles />
                <HeaderComponent />
                <Component {...pageProps} />
            </div>
        </Provider>
    )
};

export default MyApp;
