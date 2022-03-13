import { css, Global } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
    html: {
        ...tw`
            w-full
            h-full
        `,
    },
    body: {
        ...tw`
            w-full
            h-full
        `,
    },
    '#__next': {
        ...tw`
            w-full
            h-full
        `,
    }
});

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <Global styles={customStyles} />
    </>
);

export default GlobalStyles;
