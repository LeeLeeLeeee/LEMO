import React, { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import tw, { theme } from 'twin.macro';
import Image from 'next/image';
import { useRouter } from 'next/router';

import getCore from '@/core-wrapper';
import { convertDate } from '@/lib/date';

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
    id: number;
    title: string;
    createDate: string;
    thumbnailLink: string;
}
const core = getCore();
function PostingCard(props: Props): JSX.Element {
    const { title, createDate, thumbnailLink, id } = props;
    const [imgUrl, setImgUrl] = useState<string>('');
    const createDateAt = convertDate(createDate, 'YYYY.MM.DD');
    const router = useRouter();
    const handleCardClick = useCallback(() => {
        router.push(`/post/${id}`);
    }, []);
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
            onClick={handleCardClick}
        >
            <PostingImageWrapper>
                {imgUrl === '' ? undefined : (
                    <Image src={imgUrl} layout="fill" alt="none" />
                )}
            </PostingImageWrapper>
            <PostingTitle>{title}</PostingTitle>
            <PostingBottomWrapper>
                <PostingDate>{createDateAt}</PostingDate>
            </PostingBottomWrapper>
        </PostingCardWrapper>
    );
}

export default React.memo(PostingCard);
