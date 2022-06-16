import React from 'react';

import tw, { theme } from 'twin.macro';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { EmailIcon, GithubIcon, PencilIcon, PhoneIcon } from '@/icons';

import ContainerFlex from '../common/ContainerFlex';
import withHoverAnime from '../hoc/withHoverAnime';
import CircleImage from '../common/CircleImage';

const NavigationWrapper = tw(ContainerFlex)`
    w-64
    h-full
`;

const ProfileCard = styled(ContainerFlex)`
    ${tw`bg-white/80 h-[300px] flex-none w-full`}
`;

const WritePostLabel = styled(ContainerFlex)`
    ${tw`bg-white w-full cursor-pointer`}
`;

const NameTitle = styled.div(() => [
    tw`self-stretch text-primary font-bold `,
    { fontSize: theme`fontSize.lg` },
]);

const SubTitle = styled.div(() => [
    { fontSize: theme`fontSize.sm` },
    tw`self-stretch text-secondary`,
]);
const WritePostLabelHOC = withHoverAnime(WritePostLabel, {
    styles: { width: '100%' },
});

function NavigationBar(): JSX.Element {
    const router = useRouter();
    return (
        <NavigationWrapper $gap={3} $direction="column">
            <ProfileCard
                $isInline
                $isRadius
                $isShadow
                $direction="column"
                $justify="between"
                $padding={5}
                $isStretch
                color="white"
                $items="center"
            >
                <CircleImage imagePath="/스폰지밥.PNG" />
                <ContainerFlex tw="self-stretch" $direction="column">
                    <NameTitle>이영현</NameTitle>
                    <SubTitle>Web Developer</SubTitle>
                    <ContainerFlex
                        tw="self-stretch mt-2"
                        $justify="start"
                        $gap={2}
                    >
                        <GithubIcon />
                        <PhoneIcon />
                        <EmailIcon />
                    </ContainerFlex>
                </ContainerFlex>
            </ProfileCard>
            <WritePostLabelHOC
                onClick={() => router.push('/post/write')}
                $justify="between"
                $items="center"
                $padding={5}
                $isRadius
                $isShadow
            >
                <PencilIcon /> 게시글 작성
            </WritePostLabelHOC>
        </NavigationWrapper>
    );
}

export default React.memo(NavigationBar);
