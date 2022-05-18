import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useSelector } from 'react-redux';

import marked from '@/lib/lib';
import { CombinedState } from '@/stores/interface';

const PreviewWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100%;
    background-color: white;
    border-radius: 10px;
    ${tw`shadow-md`}
    overflow-y: auto;
`;

function MarkDownPreview(): JSX.Element {
    const code = useSelector((state: CombinedState) => state.posting.code);
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
