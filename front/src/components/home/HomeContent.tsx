import React from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import dynamic from 'next/dynamic';

import FlexContainer from '../common/ContainerFlex';

const HomeContentWrapper = styled(FlexContainer)(() => [tw`w-6/12`]);
const PostingCard = dynamic(() => import('./PostingCard'), {
    ssr: false,
});

type Feed = {
    id: number;
    title: string;
    thumbnailLink: string;
    createDate: Date;
};

interface Props {
    feeds: Feed[];
}

function HomeContent(props: Props): JSX.Element {
    const { feeds } = props;
    return (
        <HomeContentWrapper $direction="column">
            {feeds.map((feed) => (
                <PostingCard
                    key={feed.id}
                    title={feed.title}
                    thumbnailLink={feed.thumbnailLink}
                    createDate={'2020.03.01'}
                />
            ))}
        </HomeContentWrapper>
    );
}

export default React.memo(HomeContent);
