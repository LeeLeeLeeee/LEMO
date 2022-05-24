import React from 'react';

import PostEditor from '@/components/post/PostEditor';

function PostWriteComponent() {
    return <PostEditor />;
}

export default React.memo(PostWriteComponent);
