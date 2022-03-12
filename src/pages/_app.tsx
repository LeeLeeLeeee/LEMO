import { AppProps } from 'next/app';
import GlobalStyles from '@/layout/GlobalStyles';
import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyles />
        <Component {...pageProps} />
    </>
);

export default MyApp;
