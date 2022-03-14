import React from 'react';
import { ReactNode } from 'react';
import tw from 'twin.macro';
import ContainerFlex from '@/components/common/ContainerFlex';
import { PM_SIZE } from '@/const/tailwind';

const LayoutContainer = tw.div`
    flex
    pl-48
    pr-48
    h-full
    pt-14
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
                <ContainerFlex $padding={PM_SIZE.small} $paddingDirecion={{t: true}}>
                    aa
                    {children}
                </ContainerFlex>
            </LayoutContainer>
        </>
    );
}

export default MainLayout;
