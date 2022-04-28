import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';

import getCore from '@/core-wrapper';

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

interface Props {
    title: string;
    createDate: string;
    thumbnailLink: string;
}
const core = getCore();
function PostingCard(props: Props): JSX.Element {
    const { title, createDate, thumbnailLink } = props;
    const [imgUrl, setImgUrl] = useState<string>('');
    useEffect(() => {
        (async () => {
            const link = await core.common.getImageByName(thumbnailLink);
            setImgUrl(link);
        })();
    }, []);

    return (
        <PostingCardWrapper
            $isShadow
            $isRadius
            $padding={0}
            $direction="column"
        >
            <PostingImageWrapper>
                {imgUrl === '' ? undefined : (
                    <Image src={imgUrl} layout="fill" alt="none" />
                )}
            </PostingImageWrapper>
            <PostingTitle>{title}</PostingTitle>
            <PostingBottomWrapper>
                <PostingDate>{createDate}</PostingDate>
            </PostingBottomWrapper>
        </PostingCardWrapper>
    );
}

export default React.memo(PostingCard);
