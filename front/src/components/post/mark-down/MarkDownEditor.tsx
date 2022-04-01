import React, { useEffect, useRef, useState } from 'react';

import { CodeJar } from 'codejar';

import { highligher } from '@/lib/editor';

function MarkDownEditor(): JSX.Element {
    const editor = useRef<HTMLDivElement>(null);
    const codeJar = useRef<any>(null);
    const [code, setCode] = useState('');

    useEffect(() => {
        const mdEditor = editor.current as HTMLElement;
        if (mdEditor !== null) {
            codeJar.current = CodeJar(mdEditor, highligher, { tab: '\t' });
            codeJar.current.onUpdate((editorCode: string) =>
                setCode(editorCode)
            );
        }
    }, []);

    useEffect(() => {
        codeJar.current.updateCode(code);
    }, [code]);

    return <div ref={editor} />;
}

export default React.memo(MarkDownEditor);
