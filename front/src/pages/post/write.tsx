import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Resizable } from 'react-resizable';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';
import MarkDownEditor from '@/components/post/mark-down/MarkDownEditor';
import MarkDownMenu from '@/components/post/mark-down/MarkDownMenu';
import ContainerFlex from '@/components/common/ContainerFlex';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
`;
const StyledResizable = styled(Resizable)`
    position: relative;
    .react-resizable-handle {
        top: 180px;
        left: 0px;
        cursor: e-resize;
        width: 20px;
        height: 20px;
        background-color: black;
        position: absolute;
    }
`;
function PostWriteComponent() {
    const [size, setSize] = useState({
        width: 500,
        height: 500,
    });

    const onResize = (_event: any, props: any) => {
        const {
            size: { width, height },
        } = props;
        setSize({ width, height });
    };

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
                <ContainerFlex className="w-full h-full">
                    <MarkDownEditor />
                    <StyledResizable
                        width={size.width}
                        height={size.height}
                        onResize={onResize}
                    >
                        <div
                            style={{
                                width: `${size.width}px`,
                                height: `${size.height}px`,
                            }}
                        >
                            <span className="text">
                                {
                                    'Raw use of <Resizable> element with controlled position. Resize and reposition in all directions.'
                                }
                            </span>
                        </div>
                        {/* <MarkDownPreview /> */}
                    </StyledResizable>
                </ContainerFlex>
            </PostingContainer>
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
