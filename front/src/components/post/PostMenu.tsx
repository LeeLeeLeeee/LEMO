import React from 'react';

import { useDispatch } from 'react-redux';
import { useFormContext } from 'react-hook-form';

import { SaveIcon } from '@/icons';
import IconButton from '@/components/common/button/IconButton';
import ContainerFlex from '@/components/common/ContainerFlex';
import Toggle from '@/components/common/Toggle';
import { usePostingDispatch, usePostingState } from '@/stores/posting/hook';
import getCore from '@/core-wrapper';

const core = getCore();

function PostMenu(): JSX.Element {
    const {
        code,
        setting: { preview },
    } = usePostingState();
    const { changePreview, savePostThunk } = usePostingDispatch();
    const { handleSubmit } = useFormContext();
    const dispatch = useDispatch();
    const changePreviewState = () => {
        changePreview(!preview);
    };

    const handleSaveClick = async (props: any) => {
        const { title, thumbnail } = props;
        const data = await core.post.uploadImage(thumbnail);
        dispatch(
            savePostThunk({
                email: 'ijj1792@naver.com',
                content: code,
                thumbnailLink: data.filename,
                title,
            })
        );
    };

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
