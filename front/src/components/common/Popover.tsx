import React from 'react';

import RcTooltip from 'rc-tooltip';
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import styled from '@emotion/styled';
import tw from 'twin.macro';

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
    extends Partial<Omit<RcTooltipProps, 'arrowContent'>> {
    placement?: TooltipPlacement;
    gap?: number;
    trigger?: 'hover' | 'click';
}

const commonTooltipStyle = { border: '0px' };

const PopoverWrapper = tw.div`
    
`;

const TooltipArrow = styled.span`
    width: 0px;
    height: 0px;
    position: absolute;

    &.right {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid white;
        top: -6px;
    }
    &.left {
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid white;
        top: -6px;
        left: -6px;
    }
    &.top {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid white;
        top: -6px;
        left: -6px;
    }
    &.bottom {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid white;
        left: -6px;
    }
`;

function Popover(props: TooltipProps, ref: any): JSX.Element {
    const {
        placement = 'right',
        overlay,
        gap = 5,
        trigger = 'click',
        ...rest
    } = props;
    const arrowPositionMatched = placement
        .toLocaleLowerCase()
        .match(/^(bottom|top|left|right)/);

    const arrowPosition = arrowPositionMatched
        ? arrowPositionMatched[0]
        : 'left';

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
            animation="zoom"
            overlayInnerStyle={commonTooltipStyle}
            arrowContent={<TooltipArrow className={arrowPosition} />}
            align={{ offset }}
            trigger={[trigger]}
            placement={placement}
            overlay={<PopoverWrapper>{overlay}</PopoverWrapper>}
            {...rest}
            ref={ref}
        />
    );
}

Popover.displayName = 'Popover';
export default React.forwardRef(Popover);
