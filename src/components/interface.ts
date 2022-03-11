import { ReactNode } from 'react';

export type ContainerDirection = 'column' | 'row';
export type FlexAlign =
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around';

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
