import React, { useEffect, useRef } from 'react';

import Stackedit from 'stackedit-js';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

function PostWriteComponent() {
    const stackEditElement = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (stackEditElement.current === null) return;
        const stackedit = new Stackedit();
        // Open the iframe
        stackedit.openFile({
            name: 'Filename', // with an optional filename
            content: {
                text: stackEditElement.current.value, // and the Markdown content.
            },
        });

        // Listen to StackEdit events and apply the changes to the textarea.
        stackedit.on('fileChange', (file: any) => {
            if (stackEditElement.current === null) return;
            stackEditElement.current.value = file.content.text;
        });
    }, []);

    return (
        <MainLayout
            meta={
                <Meta
                    title="GoGo Dev"
                    description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
                />
            }
        >
            <textarea ref={stackEditElement} />
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
