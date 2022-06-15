import React from 'react';

import { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider, useSelector } from 'react-redux';

import HeaderComponent from '@/components/common/Header';
import { useStore } from '@/stores/store';
import { BaseChild } from '@/components/interface';
import GlobalStyles from '@/layout/GlobalStyles';
import '@/styles/MarkDownPreview.scss';
import { rootContext } from '@/components/rootContext';
import MessageList from '@/components/common/message/MessageList';
import { CombinedState } from '@/stores/interface';

const AppWrapper = React.memo((props: BaseChild) => {
    const mode = useSelector((state: CombinedState) => state.setting.mode);
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

const ModalMask = React.memo(() => {
    const { state, setModalCloseAll } = rootContext.useModal();
    if (state.modalID.size === 0) return <></>;

    return (
        <div
            id="modal-mask"
            onClick={setModalCloseAll}
            style={{
                zIndex: 11,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#00000033',
            }}
        />
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
                    <ModalMask />
                    <div id="modal-container" />
                    <Component {...pageProps} />
                </ContextProvider>
            </AppWrapper>
        </Provider>
    );
};

export default MyApp;
