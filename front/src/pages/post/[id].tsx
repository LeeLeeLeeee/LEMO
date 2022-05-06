import React, { useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import { PostDto } from 'core/src/interface';
import tw from 'twin.macro';
import Image from 'next/image';
import styled from '@emotion/styled';

import MainLayout from '@/layout/Layout';
import getCore from '@/core-wrapper';
import { Meta } from '@/layout/Meta';
import marked from '@/lib/lib';
import MarkDownTOC from '@/components/post/mark-down/MarkDownTOC';

const core = getCore();

interface Props extends PostDto {}

const PostingContainer = styled.div(() => [
    tw`flex flex-col w-full`,
    {
        '& > h1': {
            fontSize: '2rem',
            fontWeight: 700,
            textAlign: 'center',
            padding: '0px 5rem',
            margin: '1rem 0px',
        },
        '& > .thumbnail-wrapper': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '10px',
            marginBottom: '0.75rem',
            maxWidth: '100%',
            height: '30vw',
        },
    },
]);

const MarkdownPreview = tw.div`
    bg-white
    p-5
    rounded-md
    shadow-md
    mt-3
    mb-10
`;

function PostingComponent(props: Props) {
    const postingContent = useRef<HTMLDivElement | null>(null);
    const { title, updatedAt, createdAt, thumbnailLink, content } = props;

    useEffect(() => {
        if (postingContent.current !== null)
            postingContent.current.innerHTML = marked(content);
    }, []);

    return (
        <MainLayout
            meta={
                <Meta
                    title={title}
                    authorName={'yhlee'}
                    dateModified={updatedAt.toString()}
                    datePublished={createdAt.toString()}
                    description={''}
                    url={''}
                    images={[thumbnailLink || '']}
                />
            }
        >
            <PostingContainer>
                <h1>{title}</h1>
                <div className="thumbnail-wrapper">
                    <Image
                        src={`http://localhost:3000/static/${thumbnailLink}`}
                        layout="fill"
                        alt="none"
                    />
                </div>
                <MarkDownTOC code={content || ''} />
                <MarkdownPreview
                    className="markdown-preview"
                    ref={postingContent}
                />
            </PostingContainer>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    res,
    params,
}) => {
    const { id } = params as any;
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    const response = await core.post.getById(id);

    return {
        props: {
            ...response.data,
        },
    };
};

export default React.memo(PostingComponent);
