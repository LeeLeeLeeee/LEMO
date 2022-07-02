import React from 'react';

import { BaseChildren } from '@/components/interface';

interface Props extends BaseChildren {}

function TableHeader(props: Props) {
    const { children } = props;
    return (
        <thead>
            {React.Children.map(children, (child) => {
                return child;
            })}
        </thead>
    );
}

TableHeader.DisplayName = 'TableHeader';
export default TableHeader;
