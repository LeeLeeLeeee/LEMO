import React from 'react';

import MainLayout from '@/layout/Layout';
import { Meta } from '@/layout/Meta';

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
            <div>aaa</div>
        </MainLayout>
    );
}

export default React.memo(PostWriteComponent);
