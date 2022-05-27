import React, { useEffect } from 'react';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from '@emotion/styled';

import MainLayout from '@/layout/Layout';
import HookFormInput from '@/components/common/forms/HookFormInput';
import PostMenu from '@/components/post/PostMenu';
import Collapse from '@/components/common/Collapse';
import MarkDown from '@/components/post/mark-down/MarkDown';

import ContainerFlex from '../common/ContainerFlex';

const PostingContainer = styled(ContainerFlex)`
    height: 100%;
    & > div:nth-of-type(1) {
        flex: 1;
    }

    & > div:nth-of-type(4) {
        flex: 20;
        height: 1px;
        overflow-y: auto;
    }
`;

const writeSchema = yup.object().shape({
    title: yup.string().required('제목은 필수로 입력해주세요.'),
    thumbnail: yup
        .mixed()
        .test('file-type', '이미지 파일만 업로드해주세요.', (file) => {
            if (typeof file === 'string') {
                return /\.(jpg|png|jpeg)$/.test(file.toLowerCase());
            }
            return (file?.type || '').includes('image');
        }),
});

interface Props {
    id?: number;
    title?: string;
    thumbNailLink?: string;
}

function PostEditor(props: Props): JSX.Element {
    const { title, thumbNailLink, id } = props;
    const methods = useForm({
        resolver: yupResolver(writeSchema),
    });

    useEffect(() => {
        if (title !== undefined) methods.setValue('title', title);
        if (thumbNailLink !== undefined)
            methods.setValue('thumbnail', thumbNailLink);
    }, []);

    return (
        <FormProvider {...methods}>
            <MainLayout>
                <PostingContainer
                    $padding={0}
                    $gap={2}
                    $isStretch
                    $direction="column"
                    $justify="center"
                >
                    <PostMenu id={id} thumbNailLink={thumbNailLink} />
                    <Collapse>
                        <ContainerFlex $direction="column" $padding={3}>
                            <HookFormInput
                                style={{ width: '100%' }}
                                control={methods?.control}
                                name="title"
                                label="제목"
                                type="text"
                            />
                            <HookFormInput
                                style={{ width: '100%' }}
                                control={methods?.control}
                                name="thumbnail"
                                label="썸네일"
                                type="file"
                            />
                        </ContainerFlex>
                    </Collapse>
                    <MarkDown />
                </PostingContainer>
            </MainLayout>
        </FormProvider>
    );
}

export default React.memo(PostEditor);
