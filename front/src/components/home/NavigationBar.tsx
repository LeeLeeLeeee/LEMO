import React from 'react';
import tw, { theme } from 'twin.macro';
import ContainerFlex from '../common/ContainerFlex';
import Image from 'next/image';
import styled from '@emotion/styled';


const NavigationWrapper = tw(ContainerFlex)`
    w-64
    h-full
`;

const ProfileCard = styled(ContainerFlex)`
    ${tw`bg-white/80`}
    ${tw`h-72`}
    & > span {
        width: 100px;
        border-radius: 100px;
        overflow: hidden;
        ${tw`shadow-lg`}
    }
`;

const NameTitle = styled.div(({}) => [
    tw`self-stretch text-primary font-bold `,
    {fontSize: theme`fontSize.lg`},
]);

const SubTitle = styled.div(({}) => [
    {fontSize: theme`fontSize.sm`},
    tw`self-stretch text-secondary`,
]);

function NavigationBar(): JSX.Element {

    return (
        <NavigationWrapper >
            <ProfileCard
                $isInline
                $isRadius
                $isShadow
                $direction='column'
                $justify='between'
                $padding={5}
                $isStretch
                color='white'
                $items='center'
            >
                <span>
                    <Image src='/스폰지밥.PNG' width={100} height={100} />
                </span>
                <ContainerFlex tw='self-stretch' $direction='column'>
                    <NameTitle>
                        이영현
                    </NameTitle>
                    <SubTitle>
                        Web Developer
                    </SubTitle>
                    <ContainerFlex tw='self-stretch mt-2' $justify='start' $gap={2}>
                        <i data-eva='at-outline' data-eva-fill={theme`colors.primary`} data-eva-height="20" data-eva-width="20"/>
                        <i data-eva='github' data-eva-fill={theme`colors.primary`} data-eva-height="20" data-eva-width="20"/>
                        <i data-eva='phone-outline' data-eva-fill={theme`colors.primary`} data-eva-height="20" data-eva-width="20"/>
                    </ContainerFlex>
                </ContainerFlex>
            </ProfileCard>
        </NavigationWrapper>
    );
}

export default React.memo(NavigationBar);
