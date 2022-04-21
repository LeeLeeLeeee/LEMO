import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { ResizableBox } from 'react-resizable';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';
import MarkDownEditor from '@/components/post/mark-down/MarkDownEditor';
import ContainerFlex from '@/components/common/ContainerFlex';
import { usePostingState } from '@/stores/posting/hook';
import MarkDownPreview from '@/components/post/mark-down/MarkDownPreview';
import HookFormInput from '@/components/common/forms/HookFormInput';
import PostMenu from '@/components/post/PostMenu';
import MarkDownEditorMenu from '@/components/post/mark-down/MarkDownEditorMenu';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
    & > div:nth-of-type(1) {
        flex: 1;
    }

    & > div:nth-of-type(3) {
        flex: 20;
        height: 1px;
        overflow-y: auto;
    }
`;

const ResizeHandler = styled.span`
    position: absolute;
    height: 100%;
    right: -7px;
    top: 0px;
    cursor: e-resize;
    border: 2px solid gray;
    border-radius: 5px;
`;

const writeSchema = yup
    .object()
    .shape({
        title: yup.string().required('제목은 필수로 입력해주세요.'),
    })
    .required();

function PostWriteComponent() {
    const wrapperElement = useRef<any>();
    const methods = useForm({
        resolver: yupResolver(writeSchema),
    });
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

    useEffect(() => {
        const { height } = wrapperElement.current?.getBoundingClientRect() || {
            height: 0,
        };
        setSize((_size) => ({ ..._size, height }));
    }, []);
    return (
        <FormProvider {...methods}>
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
                    $gap={2}
                    $isStretch
                    $direction="column"
                    $justify="center"
                >
                    <PostMenu />
                    <HookFormInput
                        style={{ width: '100%' }}
                        control={methods?.control}
                        name="title"
                        label="제목"
                        type="text"
                    />
                    <MarkDownEditorMenu />
                    <ContainerFlex
                        $gap={3}
                        ref={wrapperElement}
                        className="flex-1 w-full"
                    >
                        {preview ? (
                            <ResizableBox
                                className="relative h-full"
                                width={size.width}
                                height={size.height}
                                maxConstraints={[700, Infinity]}
                                axis="x"
                                handle={preview ? <ResizeHandler /> : <></>}
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
        </FormProvider>
    );
}

export default React.memo(PostWriteComponent);
