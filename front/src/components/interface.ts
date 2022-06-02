import { ReactNode } from 'react';

export type ContainerDirection = 'column' | 'row';

export type AlignType = 'start' | 'center' | 'end';

export type JustifyType = 'start' | 'center' | 'end' | 'between' | 'around';

export type ItemsType = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export type SizeType = 'small' | 'medium' | 'large';

export interface PMDirection {
    t?: boolean;
    b?: boolean;
    l?: boolean;
    r?: boolean;
}

export interface BaseChild {
    children?: ReactNode;
}

export interface BaseChildren {
    children?: ReactNode[];
}

export type DivAttributeProps = React.HTMLAttributes<HTMLDivElement>;
export type ButtonAttributeProps = React.HTMLAttributes<HTMLButtonElement>;
export type SpanAttributeProps = React.HTMLAttributes<HTMLSpanElement>;
export type InputAttributeProps = React.HTMLAttributes<HTMLInputElement>;

export type ColorType =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'info'
    | 'dark'
    | 'light';

export type VariantType = 'contained' | 'outlined';
