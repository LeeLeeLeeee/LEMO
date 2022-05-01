import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';

import { usePostingDispatch, usePostingState } from '@/stores/posting/hook';

import FlexContainer from '../common/ContainerFlex';
import withHoverAnime from '../hoc/withHoverAnime';

const HomeContentWrapper = styled(FlexContainer)(() => [
    tw`w-6/12 relative`,
    {
        '& > ul > li:not(:last-child)': {
            marginBottom: '10px',
        },
    },
]);
const PostingCard = dynamic(() => import('./PostingCard'), {
    ssr: false,
});

const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
        opacity: 1,
        scale: 1,
    },
};

const PostingCardHOC = withHoverAnime(PostingCard, {
    styles: { width: '100%' },
});

function HomeContent(): JSX.Element {
    const intersectionElement = useRef<null | HTMLDivElement>(null);
    const homeElement = useRef<null | HTMLDivElement>(null);
    const { getFeedsThunk } = usePostingDispatch();

    const {
        feeds: { list: feeds },
    } = usePostingState();

    useEffect(() => {
        if (intersectionElement.current !== null) {
            const intersectionObserver = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry?.isIntersecting) {
                        getFeedsThunk(2);
                    }
                },
                { threshold: [0.5] }
            );
            intersectionObserver.observe(intersectionElement.current);
        }
    }, []);

    return (
        <HomeContentWrapper
            ref={homeElement}
            $direction="column"
            $items="center"
        >
            <motion.ul variants={container} initial="hidden" animate="visible">
                {feeds.map((feed) => (
                    <motion.li
                        variants={item}
                        key={feed.id}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                    >
                        <PostingCardHOC
                            title={feed.title}
                            thumbnailLink={feed.thumbnailLink}
                            createDate={feed.createdAt}
                        />
                    </motion.li>
                ))}
            </motion.ul>
            <div
                ref={intersectionElement}
                style={{
                    padding: '10px',
                    bottom: '10px',
                    width: '100%',
                    height: '10px',
                }}
            />
        </HomeContentWrapper>
    );
}

export default React.memo(HomeContent);
