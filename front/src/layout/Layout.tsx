import React from 'react';
import { ReactNode } from 'react';
import tw from 'twin.macro';
import FlexContainer from '@/components/common/ContainerFlex';
import { GAP_SIZE } from '@/const/tailwind';

const LayoutContainer = tw.div`
    flex
    pl-48
    pr-48
    h-full
    pt-16
    pb-4
    bg-gray-100
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
