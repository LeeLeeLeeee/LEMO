import React, { useEffect, useRef } from 'react';

import { CodeJar } from 'codejar-compat';

import { highligher } from '@/lib/editor';
import { usePostingDispatch, usePostingState } from '@/stores/posting/hook';

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

    return <div ref={editor} />;
}

export default React.memo(MarkDownEditor);
