import { TAILWIND_MARGIN, TAILWIND_PADDING } from '@/const/tailwind';
import styled from '@emotion/styled';
import React from 'react';

import tw, { TwStyle } from 'twin.macro'

import { BaseChild, ContainerDirection, PMDirection, ItemsType, JustifyType } from '../interface'

interface Props extends BaseChild {
    $direction: ContainerDirection;
    $justify: JustifyType;
    $items: ItemsType;
    $gap: number;
    $isShadow: boolean;
    $isRadius: boolean;
    $isInline: boolean;
    $isStretch: boolean;
    $padding: number; /* not px size */
    $paddingDirecion: PMDirection;
}

const JUSTIFY: { [T in JustifyType]: TwStyle } = {
    start: tw`justify-start`,
    around: tw`justify-around`,
    between: tw`justify-between`,
    center: tw`justify-center`,
    end: tw`justify-end`,
} as const;

const ITEMS: { [T in ItemsType]: TwStyle } = {
    start: tw`items-start`,
    baseline: tw`items-baseline`,
    stretch: tw`items-stretch`,
    center: tw`items-center`,
    end: tw`items-end`,
} as const;

const FlexBox = styled.div((tp: Props) => [
    JUSTIFY[tp.$justify],
    ITEMS[tp.$items],
    tp.$direction === 'row' ? tw`flex-row` : tw`flex-col`,
    tp.$isInline ? tw`inline-flex` : tw`flex`,
    tp.$isStretch ? tw`flex-auto` : '',
    tp.$paddingDirecion.b ? TAILWIND_PADDING.bottom[tp.$padding] : 'pb-0',
    tp.$paddingDirecion.t ? TAILWIND_PADDING.top[tp.$padding] : 'pt-0',
    tp.$paddingDirecion.r ? TAILWIND_PADDING.right[tp.$padding] : 'pr-0',
    tp.$paddingDirecion.l ? TAILWIND_PADDING.left[tp.$padding] : 'pl-0'
]);

function FlexContainer(props: Partial<Props>) {
    const {
        $direction = 'row',
        $justify = 'start',
        $items = 'start',
        $gap = 0,
        $isShadow = false,
        $isRadius = false,
        $isInline = false,
        $padding = 0,
        $paddingDirecion,
        $isStretch = false,
        children,
    } = props;

    
    return (
        <FlexBox
            $direction={$direction}
            $justify={$justify}
            $items={$items}
            $gap={$gap}
            $isShadow={$isShadow}
            $isRadius={$isRadius}
            $isInline={$isInline}
            $padding={$padding}
            $isStretch={$isStretch}
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
