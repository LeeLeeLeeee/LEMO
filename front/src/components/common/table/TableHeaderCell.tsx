import React from 'react';

import { BaseChild } from '@/components/interface';

interface Props extends Partial<BaseChild> {
    dataID?: string;
    label: string;
}

function TableHeaderCell(props: Props) {
    const { children, dataID = '', label } = props;

    if (children === undefined) {
        return <td>{label}</td>;
    }
    return <td>{React.cloneElement(children as any, { dataID })}</td>;
}

TableHeaderCell.DisplayName = 'TableHeaderCell';
export default TableHeaderCell;
