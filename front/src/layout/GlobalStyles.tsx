import { css, Global, keyframes } from '@emotion/react';
import tw, { GlobalStyles as BaseStyles } from 'twin.macro';

export const press = keyframes`
    0%, to {
        transform: scale(1);
    }

    50% {
        transform: scale(0.92)
    }
`;

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
    },
});

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <Global styles={customStyles} />
    </>
);

export default GlobalStyles;
