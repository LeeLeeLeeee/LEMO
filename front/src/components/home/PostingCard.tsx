import React from 'react';

import styled from '@emotion/styled';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';

import ContainerFlex from '../common/ContainerFlex';

const PostingCardWrapper = styled(ContainerFlex)(() => [
    tw`bg-white self-center h-[450px] w-[380px] overflow-hidden flex-1 cursor-pointer`,
]);

const PostingDate = styled.div(() => [
    tw`text-primary`,
    { fontSize: theme`fontSize.sm` },
]);

const PostingImageWrapper = styled.div(() => [
    tw`relative h-[300px] w-full overflow-hidden shadow-md`,
]);

const PostingTitle = styled.div(() => [
    tw`font-bold w-full z-10 break-all p-5 flex-1`,
    { fontSize: theme`fontSize.xl` },
]);

const PostingBottomWrapper = styled.div`
    ${tw`p-3 mt-2 flex justify-between w-full items-center`}
    & > svg {
        stroke: #ff3c3c;
    }
`;

function PostingCard(): JSX.Element {
    return (
        <PostingCardWrapper
            $isShadow
            $isRadius
            $padding={0}
            $direction="column"
        >
            <PostingImageWrapper>
                <Image src="/스폰지밥.PNG" layout="fill" alt="none" />
            </PostingImageWrapper>
            <PostingTitle>자바스크립트에 관하여</PostingTitle>
            <PostingBottomWrapper>
                <PostingDate>2021.01.03</PostingDate>
            </PostingBottomWrapper>
        </PostingCardWrapper>
    );
}

export default React.memo(PostingCard);
