import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PostDto } from 'core/src/interface';

import { ThunkAction } from '@/lib/redux';
import getCore from '@/core-wrapper';

import { CombinedState, PostingState } from '../interface';
import { postingActions } from './action';

const core = getCore();

export function usePostingState(): PostingState {
    return useSelector((state: CombinedState) => state.posting);
}

export function usePostingDispatch() {
    const dispatch = useDispatch();

    const updateCode = useCallback((code: string) => {
        dispatch(postingActions.changeThemeMode(code));
    }, []);

    const changePreview = useCallback((mode: boolean) => {
        dispatch(postingActions.changePreview(mode));
    }, []);

    const savePostAsync = useCallback(
        (data: PostDto, id?: number): ThunkAction =>
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

    return {
        updateCode,
        changePreview,
        savePostAsync,
    };
}
