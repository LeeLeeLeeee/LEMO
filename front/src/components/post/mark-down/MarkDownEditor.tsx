import React, { useEffect, useRef } from 'react';

import { CodeJar } from 'codejar-compat';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import { highligher } from '@/lib/editor';
import { usePostingDispatch } from '@/stores/posting/hook';

import 'highlight.js/styles/androidstudio.css';

const EditorElement = styled.div`
    ${tw`
        w-full
        h-full
        !resize-none
        rounded-md
        shadow-md
        p-3
    `}
    .hljs-keyword, .hljs-selector-tag, .hljs-literal, .hljs-title, .hljs-section, .hljs-doctag, .hljs-type, .hljs-name, .hljs-strong {
        ${tw`font-bold`}
    }
`;

interface Props {
    width?: number;
    resizeMode?: boolean;
}

function MarkDownEditor(props: Props): JSX.Element {
    const editor = useRef<HTMLDivElement>(null);
    const { width, resizeMode } = props;
    const codeJar = useRef<any>(null);
    const { updateCode, setCodeJarInstance, uploadImage } =
        usePostingDispatch();
    const widthStyle = resizeMode ? { width: `${width}px` } : {};

    const handleEditorPaste = (e: any) => {
        const clipBoardInstance = e.clipboardData;
        if (clipBoardInstance.types[0] === 'Files') {
            uploadImage(clipBoardInstance.files[0]);
        }
    };

    useEffect(() => {
        const mdEditor = editor.current as HTMLElement;
        if (mdEditor !== null) {
            codeJar.current = CodeJar(mdEditor, highligher, { tab: '\t' });
            codeJar.current.updateCode('');
            codeJar.current.onUpdate((editorCode: string) =>
                updateCode(editorCode)
            );
            setCodeJarInstance(codeJar.current);
            mdEditor.focus();
        }
    }, []);

    return (
        <EditorElement
            style={widthStyle}
            className="hljs editor"
            ref={editor}
            onPaste={handleEditorPaste}
        />
    );
}

export default React.memo(MarkDownEditor);
