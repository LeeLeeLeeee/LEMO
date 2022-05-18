import React, { useRef } from 'react';

import ContainerFlex from '@/components/common/ContainerFlex';
import { ImageUploadIcon } from '@/icons';
import IconButton from '@/components/common/button/IconButton';
import { usePostingDispatch } from '@/stores/posting/hook';
import { rootContext } from '@/components/rootContext';

function MarkDownEditorMenu(): JSX.Element {
    const inputFileElement = useRef<HTMLInputElement | null>(null);
    const { uploadImage } = usePostingDispatch();
    const { message } = rootContext.useAlert();
    const handleImageUploadClick = () => {
        if (inputFileElement.current !== null) inputFileElement.current.click();
    };

    const handleImageUploadChange = async (e: any) => {
        const file = e.target.files[0];
        try {
            uploadImage(file);
            message.success('이미지 업로드에 성공했습니다.');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContainerFlex $padding={0}>
            <IconButton
                color="light"
                onClick={handleImageUploadClick}
                iconNode={<ImageUploadIcon />}
            />
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={inputFileElement}
                onChange={handleImageUploadChange}
            />
        </ContainerFlex>
    );
}

export default React.memo(MarkDownEditorMenu);
