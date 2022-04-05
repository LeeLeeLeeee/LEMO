import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';

import { ButtonAttributeProps, ColorType } from '@/components/interface';
import { BG_COLOR } from '@/const/tailwind';

interface Props extends ButtonAttributeProps {
    iconNode: React.ReactElement;
    color?: ColorType;
}

const IconButtonBase = styled.button<Pick<Props, 'color'>>(
    ({ color = 'primary' }) => [
        tw`p-2 shadow-md rounded-md`,
        BG_COLOR[color],
        tw`transition duration-200`,
    ]
);

function IconButton(props: Props): JSX.Element {
    const { iconNode, ...rest } = props;
    return (
        <IconButtonBase className="hover:bg-white" {...rest}>
            {iconNode}
        </IconButtonBase>
    );
}

export default React.memo(IconButton);
