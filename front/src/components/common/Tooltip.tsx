import React from 'react';

import RcTooltip from 'rc-tooltip';
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import styled from '@emotion/styled';

export type TooltipPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';

export interface TooltipProps
    extends Partial<Omit<RcTooltipProps, 'arrowContent' | 'overlay'>> {
    title: string;
    placement?: TooltipPlacement;
    gap?: number;
    color?: 'white' | 'black';
}

const commonTooltipStyle = { border: '0px' };
const TooltipArrow = styled.span<{ color: 'white' | 'black' }>`
    width: 0px;
    height: 0px;
    position: absolute;

    &.right {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid ${(props) => props.color};
        top: -6px;
    }
    &.left {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid ${(props) => props.color};
        top: -6px;
        left: -6px;
    }
    &.top {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid ${(props) => props.color};
        top: -6px;
        left: -6px;
    }
    &.bottom {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid ${(props) => props.color};
        left: -6px;
    }
`;

function Tooltip(props: TooltipProps, ref: any): JSX.Element {
    const {
        title = '',
        color = 'black',
        placement = 'right',
        gap = 5,
        ...rest
    } = props;
    const arrowPositionMatched = placement
        .toLocaleLowerCase()
        .match(/^(bottom|top|left|right)/);

    const arrowPosition = arrowPositionMatched
        ? arrowPositionMatched[0]
        : 'left';

    const colorTooltipStyle =
        color === 'white'
            ? { backgroundColor: 'white' }
            : { backgroundColor: 'black', color: 'white' };
    const tooltipStyle = { ...commonTooltipStyle, ...colorTooltipStyle };

    let offset: any[];

    switch (arrowPosition) {
        case 'left': {
            offset = [-gap, 0];
            break;
        }
        case 'right': {
            offset = [gap, 0];
            break;
        }
        case 'top': {
            offset = [0, -gap];
            break;
        }
        case 'bottom': {
            offset = [0, gap];
            break;
        }
        default: {
            offset = [gap, gap];
            break;
        }
    }

    return (
        <RcTooltip
            overlayInnerStyle={tooltipStyle}
            arrowContent={
                <TooltipArrow className={arrowPosition} color={color} />
            }
            align={{ offset }}
            trigger={['hover']}
            placement={placement}
            overlay={title}
            {...rest}
            ref={ref}
        />
    );
}

Tooltip.displayName = 'Tooltip';
export default React.forwardRef(Tooltip);
