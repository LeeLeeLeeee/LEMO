import React from 'react';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';
import MarkDownEditor from '@/components/post/mark-down/MarkDownEditor';

function PostWriteComponent() {
    return (
        <MainLayout
            meta={
                <Meta
                    title="GoGo Dev"
                    description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
                />
            }
        >
            <MarkDownEditor />
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
