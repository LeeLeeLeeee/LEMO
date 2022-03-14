import { AppProps } from 'next/app';
import GlobalStyles from '@/layout/GlobalStyles';
import '../styles/global.css';
import HeaderComponent from '@/components/common/Header';



const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyles />
        <HeaderComponent />
        <Component {...pageProps} />
    </>
);

export default MyApp;
