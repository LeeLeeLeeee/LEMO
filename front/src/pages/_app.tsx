import { AppProps } from 'next/app';
import GlobalStyles from '@/layout/GlobalStyles';
import '../styles/global.css';
import HeaderComponent from '@/components/common/Header';
import React, { useEffect } from 'react';
import * as eva from "eva-icons";
import { Provider } from 'react-redux'
import { useStore } from '@/stores/store';
import { useSettingsState } from '@/stores/setting/hook';
import { BaseChild } from '@/components/interface';

const AppWrapper = React.memo((props: BaseChild) => {
    const { mode } = useSettingsState();
    return (
        <div className={mode} style={{ width: '100%', height: '100%'}}>
            {props.children}
        </div>
    );
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const store = useStore(pageProps.initialReduxState)
    useEffect(() => {
        eva.replace({
            type: 'zoom',
            hover: true,
            infinite: true,
        });
    }, []);
    return (
        <Provider store={store}>
            <AppWrapper>
                <>
                    <GlobalStyles />
                    <HeaderComponent />
                    <Component {...pageProps} />
                </>
            </AppWrapper>
        </Provider>
    )
};

export default MyApp;
