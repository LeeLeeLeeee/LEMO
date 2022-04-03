import React, { useEffect, useRef } from 'react';

import { CodeJar } from 'codejar-compat';
import tw from 'twin.macro';
import styled from '@emotion/styled';

import { highligher } from '@/lib/editor';
import { usePostingDispatch, usePostingState } from '@/stores/posting/hook';

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

function MarkDownEditor(): JSX.Element {
    const editor = useRef<HTMLDivElement>(null);
    const codeJar = useRef<any>(null);
    const { code } = usePostingState();
    const { updateCode } = usePostingDispatch();

    useEffect(() => {
        const mdEditor = editor.current as HTMLElement;
        if (mdEditor !== null) {
            codeJar.current = CodeJar(mdEditor, highligher, { tab: '\t' });
            codeJar.current.updateCode(code);
            codeJar.current.onUpdate((editorCode: string) =>
                updateCode(editorCode)
            );
            mdEditor.focus();
        }
    }, []);

    return <EditorElement className="hljs editor" ref={editor} />;
}

export default React.memo(MarkDownEditor);
