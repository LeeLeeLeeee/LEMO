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
import { rootContext } from '@/components/rootContext';
import MessageList from '@/components/common/message/MessageList';

const AppWrapper = React.memo((props: BaseChild) => {
    const { mode } = useSettingsState();
    return (
        <div
            id="tailwind-wrapper"
            className={mode}
            style={{ width: '100%', height: '100%' }}
        >
            {props.children}
        </div>
    );
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const store = useStore(pageProps.initialReduxState);
    const ContextProvider = rootContext.useProvider();
    return (
        <Provider store={store}>
            <AppWrapper>
                <ContextProvider>
                    <GlobalStyles />
                    <HeaderComponent />
                    <MessageList />
                    <Component {...pageProps} />
                </ContextProvider>
            </AppWrapper>
        </Provider>
    );
};

export default MyApp;
