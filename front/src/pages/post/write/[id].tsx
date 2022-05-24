import React, { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { PostDto } from 'core/src/interface';
import { useSelector } from 'react-redux';

import getCore from '@/core-wrapper';
import { CombinedState } from '@/stores/interface';
import PostEditor from '@/components/post/PostEditor';
import { usePostingDispatch } from '@/stores/posting/hook';

const core = getCore();

interface Props extends PostDto {}

function PostUpdateComponent(props: Props) {
    const { content, title, thumbnailLink, id } = props;
    const { updateCode } = usePostingDispatch();
    const codeJarInstance = useSelector(
        (state: CombinedState) => state.posting.codeJarInstance
    );
    useEffect(() => {
        if (codeJarInstance !== undefined) {
            codeJarInstance.updateCode(content);
        }
        updateCode(content || '');
    }, [codeJarInstance]);

    return (
        <PostEditor
            id={id}
            title={title}
            thumbNailLink={thumbnailLink || undefined}
        />
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    res,
    params,
}) => {
    const { id } = params as any;
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    const response = await core.post.getById(id);

    return {
        props: {
            ...response.data,
        },
    };
};

export default React.memo(PostUpdateComponent);
