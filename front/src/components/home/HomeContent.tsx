import styled from '@emotion/styled';
import React from 'react';
import tw from 'twin.macro';
import FlexContainer from '../common/ContainerFlex';
import PostingCard from './PostingCard';

const HomeContentWrapper = styled(FlexContainer)(({}) => [
    tw`w-6/12`
]);

function HomeContent(): JSX.Element {
    return (
        <HomeContentWrapper $direction='column' >
            <PostingCard />
        </HomeContentWrapper>
    );
}

export default React.memo(HomeContent);
