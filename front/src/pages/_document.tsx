import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '@/const/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
    render() {
        return (
            <Html lang={AppConfig.locale}>
                <Head>
                    <meta charSet="utf-8"></meta>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
