import React, { ReactNode } from 'react';

import tw from 'twin.macro';

import FlexContainer from '@/components/common/ContainerFlex';
import { GAP_SIZE } from '@/const/tailwind';

const LayoutContainer = tw.div`
    flex
    pt-20
    pb-4
    lg:pl-96
    lg:pr-96
    md:pl-10
    md:pr-10
    xs:pl-2
    xs:pr-2
    h-full
    bg-gray-200
    font-sans-kr
    overflow-x-hidden
    overflow-y-auto
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
