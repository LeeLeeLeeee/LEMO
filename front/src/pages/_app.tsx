import React from 'react';

import { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider } from 'react-redux';

import HeaderComponent from '@/components/common/Header';
import { useStore } from '@/stores/store';
import { useSettingsState } from '@/stores/setting/hook';
import { BaseChild } from '@/components/interface';
import GlobalStyles from '@/layout/GlobalStyles';
import '@/styles/MarkDownPreview.scss';

const AppWrapper = React.memo((props: BaseChild) => {
    const { mode } = useSettingsState();
    return (
        <div className={mode} style={{ width: '100%', height: '100%' }}>
            {props.children}
        </div>
    );
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const store = useStore(pageProps.initialReduxState);

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
    );
};

export default MyApp;
