import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import { useSelector } from 'react-redux';

import { usePostingDispatch } from '@/stores/posting/hook';
import { CombinedState } from '@/stores/interface';

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

    const { feeds, user } = useSelector((state: CombinedState) => ({
        feeds: state.posting.feeds.list,
        user: state.auth.user,
    }));

    useEffect(() => {
        if (user === undefined) return () => {};
        let intersectionObserver: any;
        if (intersectionElement.current !== null) {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry?.isIntersecting) {
                        getFeedsThunk(2, user.id);
                    }
                },
                { threshold: [0.5] }
            );

            intersectionObserver.observe(intersectionElement.current);
        }

        return () => {
            intersectionObserver.disconnect();
        };
    }, [user]);

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
                            id={feed.id}
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
