import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';

import { ButtonAttributeProps, ColorType } from '@/components/interface';

interface Props extends ButtonAttributeProps {
    iconNode: React.ReactElement;
    color?: ColorType;
}

const IconButtonBase = styled.button`
    ${tw`p-2`}
    border-radius: 24px;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: rgba(129, 129, 129, 0.1);
    }
    & > svg {
        ${tw`light:stroke-[black] dark:stroke-[white]`}
    }
`;

function IconButton(props: Props): JSX.Element {
    const { iconNode, ...rest } = props;
    return (
        <IconButtonBase type="button" {...rest}>
            {iconNode}
        </IconButtonBase>
    );
}

export default React.memo(IconButton);
