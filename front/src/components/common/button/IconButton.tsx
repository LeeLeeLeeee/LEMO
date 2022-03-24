import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';

import { ButtonAttributeProps, ColorType } from '@/components/interface';

interface Props extends ButtonAttributeProps {
    iconNode: React.ReactElement;
    color?: ColorType;
}

const IconButtonBase = styled.button<Pick<Props, 'color'>>(({ color }) => [
    tw`p-2 shadow-sm rounded-md border border-gray-300`,
]);

function IconButton(props: Props): JSX.Element {
    const { iconNode, ...rest } = props;
    return <IconButtonBase {...rest}>{iconNode}</IconButtonBase>;
}

export default React.memo(IconButton);
