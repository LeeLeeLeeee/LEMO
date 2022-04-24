import React, { ReactNode } from 'react';

import tw from 'twin.macro';

import FlexContainer from '@/components/common/ContainerFlex';
import { GAP_SIZE } from '@/const/tailwind';

const LayoutContainer = tw.div`
    flex
    pl-96
    pr-96
    h-full
    pt-24
    pb-4
    bg-gray-200
    font-sans-kr
`;

interface Props {
    meta?: ReactNode;
    children: ReactNode;
}

function MainLayout(props: Props) {
    const { children, meta } = props;
    return (
        <>
            {meta}
            <LayoutContainer>
                <FlexContainer $isStretch $gap={GAP_SIZE.medium}>
                    {children}
                </FlexContainer>
            </LayoutContainer>
        </>
    );
}

export default MainLayout;
