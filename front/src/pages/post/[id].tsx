import React, { useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';
import { PostDto } from 'core/src/interface';
import tw from 'twin.macro';
import Image from 'next/image';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

import MainLayout from '@/layout/Layout';
import getCore from '@/core-wrapper';
import { Meta } from '@/layout/Meta';
import marked from '@/lib/lib';
import useThrottleFn from '@/hooks/useThrottleFn';
import { useSettingsDispatch } from '@/stores/setting/hook';
import 'highlight.js/styles/atom-one-dark.css';
import withHoverAnime from '@/components/hoc/withHoverAnime';

const core = getCore();
const MarkDownTOCNoSSR = dynamic(
    () => import('@/components/post/mark-down/MarkDownTOC'),
    {
        ssr: false,
    }
);
interface Props extends PostDto {}

const PostingContainer = styled.div(() => [
    tw`flex flex-col w-full`,
    {
        '& > h1': {
            fontSize: '3rem',
            fontWeight: 700,
            textAlign: 'center',
            padding: '0px 5rem',
            margin: '1rem 0px',
        },
        '& > .thumbnail-wrapper': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '10px',
            maxWidth: '100%',
            height: '30vw',
        },
    },
]);

const MarkdownPreview = tw.div`
    p-5
    mt-3
    mb-10
`;

const PostingFooter = tw.div`
    flex
    flex-col
    p-5
    border-t
    border-t-gray-400
`;

const PostingFooterCard = withHoverAnime(
    styled.div(() => [
        tw`border
    bg-white
    justify-between
    inline-flex
    w-[800px]
    `,
        {
            '& > div:first-of-type': {
                height: '100%',
                boxSizing: 'border-box',
                padding: '20px',
            },
        },
    ]),
    { styles: { display: 'inline-block', width: '790px' } }
);

type ScrollDirection = 'up' | 'down';

function PostingComponent(props: Props) {
    const postingContent = useRef<HTMLDivElement | null>(null);
    const { title, updatedAt, createdAt, thumbnailLink, content } = props;
    const layoutElement = useRef<HTMLDivElement | null>(null);
    const prevScrollTop = useRef<number>(0);
    const [scrollDirection, setScrollDirection] =
        useState<ScrollDirection>('up');
    const [trackingTitle, setTrackingTitle] = useState<string>('');

    const { setHeaderVisible } = useSettingsDispatch();

    const scrollFunction = useThrottleFn((scrollTop) => {
        if (prevScrollTop.current < scrollTop) {
            setScrollDirection('down');
        } else {
            setScrollDirection('up');
        }
        prevScrollTop.current = scrollTop;
    }, 100);

    useEffect(() => {
        let intersectionObserver: IntersectionObserver | undefined;

        const { height = 1200 } = window.document.body.getBoundingClientRect();
        const dividedHeight = height / 10;
        if (postingContent.current !== null) {
            postingContent.current.innerHTML = marked(content);
            const indexList =
                postingContent.current.querySelectorAll('h1, h2, h3');
            if (indexList.length > 0) {
                intersectionObserver = new IntersectionObserver(
                    (entries) => {
                        const [entry] = entries;
                        if (entry?.isIntersecting) {
                            setTrackingTitle(entry.target.innerHTML);
                        }
                    },
                    {
                        threshold: 1,
                        rootMargin: `0px 0px -${dividedHeight * 6}px 0px`,
                    }
                );
                indexList.forEach((element: Element) => {
                    intersectionObserver?.observe(element);
                });
            }
        }
    }, []);

    useEffect(() => {
        if (scrollDirection === 'up') {
            setHeaderVisible(true);
        } else {
            setHeaderVisible(false);
        }
    }, [scrollDirection]);

    const handleLayoutScroll = () => {
        scrollFunction(layoutElement.current?.scrollTop);
    };

    return (
        <MainLayout
            onScroll={handleLayoutScroll}
            ref={layoutElement}
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
                {thumbnailLink && (
                    <div className="thumbnail-wrapper">
                        <Image
                            src={`http://localhost:3000/static/${thumbnailLink}`}
                            layout="fill"
                            alt="none"
                        />
                    </div>
                )}
                <h1>{title}</h1>
                <MarkDownTOCNoSSR
                    trackingTitle={trackingTitle}
                    code={content || ''}
                />
                <MarkdownPreview
                    className="markdown-preview"
                    ref={postingContent}
                />
                <PostingFooter>
                    유저의 다른 게시글 보기
                    <PostingFooterCard>
                        <div>{title}</div>
                        <div
                            style={{
                                width: '300px',
                                height: '200px',
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={`http://localhost:3000/static/${thumbnailLink}`}
                                layout="fill"
                                alt="none"
                            />
                        </div>
                    </PostingFooterCard>
                </PostingFooter>
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
