import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { SaveIcon } from '@/icons';
import IconButton from '@/components/common/button/IconButton';
import ContainerFlex from '@/components/common/ContainerFlex';
import Toggle from '@/components/common/Toggle';
import { usePostingDispatch } from '@/stores/posting/hook';
import getCore from '@/core-wrapper';
import { CombinedState } from '@/stores/interface';

import { rootContext } from '../rootContext';

const core = getCore();

interface Props {
    id?: number;
    thumbNailLink?: string;
}

function PostMenu(props: Props): JSX.Element {
    const { id: postId, thumbNailLink: prevThumbNail } = props;
    const {
        code,
        preview,
        status: { success, error },
    } = useSelector((state: CombinedState) => ({
        code: state.posting.code,
        preview: state.posting.setting.preview,
        status: state.posting.status,
    }));
    const { changePreview, savePostThunk, resetPostingStatus, updateCode } =
        usePostingDispatch();
    const { message } = rootContext.useAlert();
    const router = useRouter();
    const { handleSubmit } = useFormContext();
    const changePreviewState = () => {
        changePreview(!preview);
    };

    const handleSaveClick = async (_props: any) => {
        const { title, thumbnail } = _props;

        let data = {} as any;
        if (thumbnail !== '' && thumbnail !== prevThumbNail)
            data = await core.post.uploadImage(thumbnail);

        if (postId !== undefined) {
            savePostThunk(
                {
                    content: code,
                    thumbnailLink: data?.filename || thumbnail,
                    title,
                },
                postId
            );
        } else {
            savePostThunk({
                email: 'ijj1792@naver.com',
                content: code,
                thumbnailLink: data?.filename || null,
                title,
            });
        }
    };

    useEffect(() => {
        if (success) {
            resetPostingStatus();
            updateCode('');
            message.success('성공적으로 저장되었습니다.');
            router.push('/');
        } else if (error) {
            message.error('저장에 실패하였습니다.');
        }
    }, [success, error]);

    return (
        <ContainerFlex
            $padding={1}
            $justify="between"
            $items="center"
            $isStretch
            className="w-full"
        >
            <IconButton
                color="light"
                onClick={handleSubmit(handleSaveClick)}
                iconNode={<SaveIcon />}
            />
            <Toggle isOn={preview} onToggleClick={changePreviewState} />
        </ContainerFlex>
    );
}

export default React.memo(PostMenu);
