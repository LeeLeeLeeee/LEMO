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

const ContainerFlex = styled.div(({
    $direction = 'row',
    $justify = 'start',
    $items = 'start',
    $gap = 0,
    $isShadow = false,
    $isRadius = false,
    $isInline = false,
    $padding = 0,
    $paddingDirecion = {
        t: true,
        b: true,
        l: true,
        r: true,
    },
    $isStretch = false,
}: Partial<Props>) => [
    JUSTIFY[$justify],
    ITEMS[$items],
    $direction === 'row' ? tw`flex-row` : tw`flex-col`,
    $isInline ? tw`inline-flex` : tw`flex`,
    $isStretch ? tw`flex-auto` : '',
    $paddingDirecion.b ? TAILWIND_PADDING.bottom[$padding] : 'pb-0',
    $paddingDirecion.t ? TAILWIND_PADDING.top[$padding] : 'pt-0',
    $paddingDirecion.r ? TAILWIND_PADDING.right[$padding] : 'pr-0',
    $paddingDirecion.l ? TAILWIND_PADDING.left[$padding] : 'pl-0'
]);

export default React.memo(ContainerFlex);