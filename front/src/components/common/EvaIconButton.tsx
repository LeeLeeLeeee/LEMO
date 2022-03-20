import React from 'react';
import styled from '@emotion/styled';
import tw from 'twin.macro';

interface Props {
    iconType: string;
    color?: string;
    size?: number;
}

const IConButton = styled.button<Partial<Props>>`
    ${tw`p-1 bg-secondary shadow-sm rounded-md flex justify-center items-center`}
    width: ${({size = 0}) => `${size + 10}px`};
    height: ${({size = 0}) => `${size + 10}px`};
    
`;

function EvaIconButton(props: Props): JSX.Element {
    const { iconType, color = '#000000', size = 20, ...rest } = props;
    return (
        <IConButton size={size} {...rest}>
            <i data-eva={iconType} data-eva-fill={color} data-eva-height={size} data-eva-width={size} />
        </IConButton>
    );
}

export default React.memo(EvaIconButton);
