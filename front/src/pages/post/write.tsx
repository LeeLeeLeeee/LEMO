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
import { ResizeIcon } from '@/icons';
import { usePostingState } from '@/stores/posting/hook';
import MarkDownPreview from '@/components/post/mark-down/MarkDownPreview';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
`;

const ResizeHandler = styled.span`
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    top: -20px;
    cursor: e-resize;
`;

function PostWriteComponent() {
    const wrapperElement = useRef<any>();
    const [size, setSize] = useState({
        width: 700,
        height: 0,
    });

    const {
        setting: { preview },
    } = usePostingState();

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
    console.log(size);
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
                    {preview ? (
                        <ResizableBox
                            className="relative"
                            width={size.width}
                            height={size.height}
                            maxConstraints={[700, Infinity]}
                            axis="x"
                            handle={
                                preview ? (
                                    <ResizeHandler>
                                        <ResizeIcon />
                                    </ResizeHandler>
                                ) : (
                                    <></>
                                )
                            }
                            onResize={(e: SyntheticEvent) => onResize(e)}
                        >
                            <MarkDownEditor resizeMode width={size.width} />
                        </ResizableBox>
                    ) : (
                        <MarkDownEditor />
                    )}

                    {preview && <MarkDownPreview />}
                </ContainerFlex>
            </PostingContainer>
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
