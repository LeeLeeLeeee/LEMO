import React from 'react';
import { ReactNode } from 'react';
import tw from 'twin.macro';
import FlexContainer from '@/components/common/ContainerFlex';

const LayoutContainer = tw.div`
    flex
    pl-48
    pr-48
    h-full
    pt-16
    bg-gray-200
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
                <FlexContainer $isStretch >
                    {children}
                </FlexContainer>
            </LayoutContainer>
        </>
    );
}

export default MainLayout;
