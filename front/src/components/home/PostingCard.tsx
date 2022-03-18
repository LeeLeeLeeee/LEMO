import styled from '@emotion/styled';
import React from 'react';
import tw, { theme } from 'twin.macro';
import ContainerFlex from '../common/ContainerFlex';
import Image from 'next/image';

const PostingCardWrapper = styled(ContainerFlex)(({}) => [
    tw`bg-white self-stretch`
]);

const PostingDate = styled.div(({}) => [
    tw`text-primary`,
    {fontSize: theme`fontSize.sm`}
])

const PostingTitleWrapper = styled.div(({}) => [
    tw`relative h-[350px] w-full overflow-hidden shadow-md`,
]);

const PostingTitle = styled.div(({}) => [
    tw`font-bold w-full z-10 break-all`,
    {fontSize: theme`fontSize.xl`}
]);

const PostingBottomWrapper = styled.div`
    ${tw`pl-1 mt-2`}
`;

function PostingCard(): JSX.Element {
    return (
        <PostingCardWrapper $isShadow $isRadius $padding={2} $direction='column'>
            <PostingDate>2021.01.03</PostingDate>
            <PostingTitle>자바스크립트에 관하여</PostingTitle>
            <PostingTitleWrapper>
                <Image src='/jsmeme.PNG' layout='fixed' width={600} height={400}/>
            </PostingTitleWrapper>
            <PostingBottomWrapper>
                <i data-eva='heart-outline' data-eva-fill='#F68989' />
            </PostingBottomWrapper>
        </PostingCardWrapper>
    );
}

export default React.memo(PostingCard);
