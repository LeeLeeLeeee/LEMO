import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { PostDto } from 'core/src/interface';

import { ThunkAction } from '@/lib/redux';
import getCore from '@/core-wrapper';
import { concatText, createImageMarkDownSymbol } from '@/lib/editor';

import { Feed } from '../interface';
import { postingActions } from './action';

const core = getCore();

export function usePostingDispatch() {
    const dispatch = useDispatch();

    const updateCode = useCallback((_code: string) => {
        dispatch(postingActions.changeThemeMode(_code));
    }, []);

    const changePreview = useCallback((mode: boolean) => {
        dispatch(postingActions.changePreview(mode));
    }, []);

    const setCodeJarInstance = useCallback((codeJar: any) => {
        dispatch(postingActions.setCodeJarInstance(codeJar));
    }, []);

    const resetPostingStatus = useCallback(() => {
        dispatch(postingActions.resetPostingStatus());
    }, []);

    const uploadImage = useCallback(
        (file: File): ThunkAction =>
            async (_thunkDispatch, getState) => {
                try {
                    const {
                        posting: { code, codeJarInstance },
                    } = getState();
                    if (file?.type.includes('image')) {
                        const position = codeJarInstance.save();
                        const data = await core.post.uploadImage(file);
                        const imageText = createImageMarkDownSymbol(
                            data.filename
                        );
                        codeJarInstance.updateCode(
                            concatText(code, imageText, position.start)
                        );
                        codeJarInstance.restore(position);
                        updateCode(concatText(code, imageText, position.start));
                    }
                } catch (error: any) {
                    throw new Error(error);
                    /* TODO: Error Handling */
                }
            },
        []
    );

    const savePostThunk = useCallback(
        (
                data: Partial<PostDto & { email: string }>,
                id?: number
            ): ThunkAction =>
            async (thunkDispatch) => {
                thunkDispatch(postingActions.savePost());
                try {
                    if (id !== undefined) {
                        await core.post.update(id, data);
                    } else {
                        await core.post.create(data);
                    }
                    thunkDispatch(postingActions.savePostSuccess());
                } catch (error) {
                    thunkDispatch(postingActions.savePostFailed(error));
                }
            },
        []
    );

    const getFeedsThunk = useCallback(
        (pageSize: number = 1, authorID?: number): ThunkAction =>
            async (thunkDispatch, getState) => {
                thunkDispatch(postingActions.getFeed());
                const state = getState();
                const {
                    posting: {
                        feeds: { cursor },
                    },
                } = state;
                try {
                    const data = await core.post.getFeeds(
                        pageSize,
                        cursor,
                        authorID
                    );
                    const feeds = data.posts.map<Feed>((post: any) => ({
                        createdAt: post.createdAt,
                        id: post.id,
                        thumbnailLink: post.thumbnailLink,
                        title: post.title,
                    }));
                    thunkDispatch(
                        postingActions.getFeedSuccess(feeds, data.cursor)
                    );
                } catch (error) {
                    thunkDispatch(postingActions.getFeedFailed(error));
                }
            },
        []
    );

    return {
        updateCode,
        changePreview,
        setCodeJarInstance,
        resetPostingStatus,
        savePostThunk: (...props: Parameters<typeof savePostThunk>) =>
            dispatch(savePostThunk(...props)),
        uploadImage: (...props: Parameters<typeof uploadImage>) =>
            dispatch(uploadImage(...props)),
        getFeedsThunk: (...props: Parameters<typeof getFeedsThunk>) =>
            dispatch(getFeedsThunk(...props)),
    };
}
