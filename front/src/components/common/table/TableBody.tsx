import React from 'react';

import { BaseChildren } from '@/components/interface';

interface Props extends BaseChildren {
    rows?: { [key in string]: any };
}

function TableBody(props: Props): JSX.Element {
    const { children, rows = [] } = props;
    return (
        <tbody>
            {rows.map((row: any, index: number) => (
                <tr key={index}>
                    {React.Children.map(children, (child: any) => {
                        return React.cloneElement(child, { row });
                    })}
                </tr>
            ))}
        </tbody>
    );
}

TableBody.DisplayName = 'TableBody';
export default TableBody;
