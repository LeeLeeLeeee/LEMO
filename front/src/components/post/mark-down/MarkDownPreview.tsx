import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';

import marked from '@/lib/lib';
import { usePostingState } from '@/stores/posting/hook';

const PreviewWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    ${tw`shadow-md`}
`;

function MarkDownPreview(): JSX.Element {
    const { code } = usePostingState();
    const previewElement = useRef<any>();
    useEffect(() => {
        if (previewElement.current) {
            previewElement.current.innerHTML = marked(code);
        }
    }, [code]);
    return (
        <PreviewWrapper>
            <div className="markdown-preview" ref={previewElement} />
        </PreviewWrapper>
    );
}

export default React.memo(MarkDownPreview);
