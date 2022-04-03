import React from 'react';

import styled from '@emotion/styled';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';
import MarkDownEditor from '@/components/post/mark-down/MarkDownEditor';
import MarkDownMenu from '@/components/post/mark-down/MarkDownMenu';
import ContainerFlex from '@/components/common/ContainerFlex';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
`;

function PostWriteComponent() {
    return (
        <MainLayout
            meta={
                <Meta
                    title="GoGo Dev"
                    description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
                />
            }
        >
            <PostingContainer
                $padding={0}
                $isStretch
                $direction="column"
                $justify="center"
            >
                <MarkDownMenu />
                <MarkDownEditor />
            </PostingContainer>
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
