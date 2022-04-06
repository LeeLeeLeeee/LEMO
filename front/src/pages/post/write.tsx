import React, {
    SyntheticEvent,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import styled from '@emotion/styled';
import { ResizableBox } from 'react-resizable';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';
import MarkDownEditor from '@/components/post/mark-down/MarkDownEditor';
import MarkDownMenu from '@/components/post/mark-down/MarkDownMenu';
import ContainerFlex from '@/components/common/ContainerFlex';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
`;

const ResizeHandler = styled.span`
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: black;
    right: 0px;
    top: 0px;
    cursor: e-resize;
`;

function PostWriteComponent() {
    const wrapperElement = useRef<HTMLDivElement>();
    const [size, setSize] = useState({
        width: 700,
        height: 0,
    });

    const onResize = (event: any) => {
        const { left } = wrapperElement.current?.getBoundingClientRect() || {
            left: 0,
        };
        const { clientX } = event;
        setSize((_size) => ({
            ..._size,
            width: Math.min(clientX - left, 700),
        }));
    };

    useLayoutEffect(() => {
        const { height } = wrapperElement.current?.getBoundingClientRect() || {
            height: 0,
        };
        setSize((_size) => ({ ..._size, height }));
    }, []);

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
                <ContainerFlex ref={wrapperElement} className="w-full h-full">
                    <ResizableBox
                        className="relative"
                        width={size.width}
                        height={size.height}
                        axis="x"
                        handle={<ResizeHandler />}
                        onResize={(e: SyntheticEvent) => onResize(e)}
                    >
                        {/* <MarkDownEditor /> */}
                    </ResizableBox>
                    <div>
                        <span className="text">
                            {
                                'Raw use of <Resizable> element with controlled position. Resize and reposition in all directions.'
                            }
                        </span>
                    </div>
                    {/* <MarkDownPreview /> */}
                </ContainerFlex>
            </PostingContainer>
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
