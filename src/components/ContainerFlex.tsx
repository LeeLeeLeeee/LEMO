import styled from '@emotion/styled';

import tw from 'twin.macro'

import { BaseChild, ContainerDirection, FlexAlign, PMDirection } from './interface'

interface Props extends BaseChild {
    $direction: ContainerDirection;
    $hAlign: FlexAlign;
    $vAlign: FlexAlign;
    $gap: number;
    $isShadow: boolean;
    $isRadius: boolean;
    $isInline: boolean;
    $isStretch: boolean;
    $padding: number; /* not px size */
    $paddingDirecion: PMDirection;
}

const FlexBox = styled.div((tp: Props) => [
    tw`
        flex-${tp.$direction}
        justify-${tp.$hAlign}
        items-${tp.$vAlign}
        ${tp.$isInline ? 'inline-flex' : 'flex'}
    `,
    tp.$isStretch ? (
        tp.$direction === 'row' ? tw`justify-self-stretch` : tw`items-stretch`
    ) : null,
    tp.$padding > 0 ? (
        tw`
            ${tp.$paddingDirecion.b ? `pb-${tp.$padding}` : ''}
            ${tp.$paddingDirecion.t ? `pt-${tp.$padding}` : ''}
            ${tp.$paddingDirecion.r ? `pr-${tp.$padding}` : ''}
            ${tp.$paddingDirecion.l ? `pl-${tp.$padding}` : ''}
        `
    ) : null,
]);

function FlexContainer(props: Partial<Props>) {
    const {
        $direction = 'row',
        $hAlign = 'start',
        $vAlign = 'start',
        $gap = 0,
        $isShadow = false,
        $isRadius = false,
        $isInline = false,
        $isStretch = false,
        $padding = 0,
        $paddingDirecion,
        children,
    } = props;

    const [horizon, vertical] = $direction === 'row' ? [$hAlign, $vAlign] : [$vAlign, $hAlign];

    return (
        <FlexBox
            $direction={$direction}
            $hAlign={horizon}
            $vAlign={vertical}
            $gap={$gap}
            $isShadow={$isShadow}
            $isRadius={$isRadius}
            $isInline={$isInline}
            $isStretch={$isStretch}
            $padding={$padding}
            $paddingDirecion={
                $paddingDirecion || {
                    t: true,
                    b: true,
                    l: true,
                    r: true,
                }
            }
        >
            {children}
        </FlexBox>
    )
}

export default FlexContainer;
