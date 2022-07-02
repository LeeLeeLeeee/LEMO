import { BaseChild } from '@/components/interface';

interface Props extends Partial<BaseChild> {
    dataID?: string;
    row?: any;
}

function TableBodyCell(props: Props): JSX.Element {
    const { children, dataID = '', row = {} } = props;
    if (children === undefined) {
        return <td>{row[dataID]}</td>;
    }
    return <td>{children}</td>;
}

TableBodyCell.DisplayName = 'TableBody';
export default TableBodyCell;
