import React from 'react';

import styled from '@emotion/styled';

import { BaseChildren } from '@/components/interface';

interface Props extends BaseChildren {
    rows: { [key in string]: any };
}

const EmotionTable = styled.table`
    width: 100%;
    & > thead > td {
        border-bottom: 1px solid #d3d3d3;
        padding: 2px 5px;
    }

    & > tbody > tr {
        border-bottom: 1px solid #d3d3d3;
        & > td {
            padding: 2px 5px;
            &:not(:last-of-type) {
                border-right: 1px solid #d3d3d3;
            }
        }
    }
`;

function Table(props: Props): JSX.Element {
    const { children, rows } = props;
    return (
        <EmotionTable>
            {React.Children.map(children, (child: React.ReactChild) => {
                if ((child as any).type.DisplayName === 'TableHeader') {
                    return child;
                }

                if ((child as any).type.DisplayName === 'TableBody') {
                    return React.cloneElement(child as any, { rows });
                }
                return <></>;
            })}
        </EmotionTable>
    );
}

Table.DisplayName = 'Table';
export default Table;
