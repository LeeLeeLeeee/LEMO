import { ReactNode } from 'react';

export type ContainerDirection = 'column' | 'row';

export type AlignType = 'start' | 'center' | 'end';

export type JustifyType =
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around';

export type ItemsType =
    | 'start'
    | 'center'
    | 'end'
    | 'baseline'
    | 'stretch';

export interface PMDirection {
    t?: boolean;
    b?: boolean;
    l?: boolean;
    r?: boolean;
}

export interface BaseChild {
    children?: ReactNode
}

export interface BaseChildren {
    children?: ReactNode[]
}
