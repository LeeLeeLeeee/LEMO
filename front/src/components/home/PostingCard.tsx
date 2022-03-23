import React from 'react';

import styled from '@emotion/styled';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';

import { HeartIcon } from '@/icons';

import ContainerFlex from '../common/ContainerFlex';

const PostingCardWrapper = styled(ContainerFlex)(() => [
    tw`bg-white self-stretch`,
]);

const PostingDate = styled.div(() => [
    tw`text-primary`,
    { fontSize: theme`fontSize.sm` },
]);

const PostingTitleWrapper = styled.div(() => [
    tw`relative h-[350px] w-full overflow-hidden shadow-md`,
]);

const PostingTitle = styled.div(() => [
    tw`font-bold w-full z-10 break-all`,
    { fontSize: theme`fontSize.xl` },
]);

const PostingBottomWrapper = styled.div`
    ${tw`pl-1 mt-2`}
`;

function PostingCard(): JSX.Element {
    return (
        <PostingCardWrapper
            $isShadow
            $isRadius
            $padding={2}
            $direction="column"
        >
            <PostingDate>2021.01.03</PostingDate>
            <PostingTitle>자바스크립트에 관하여</PostingTitle>
            <PostingTitleWrapper>
                <Image
                    src="/jsmeme.PNG"
                    layout="fixed"
                    alt="none"
                    width={600}
                    height={400}
                />
            </PostingTitleWrapper>
            <PostingBottomWrapper>
                <HeartIcon />
            </PostingBottomWrapper>
        </PostingCardWrapper>
    );
}

export default React.memo(PostingCard);
