import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CreatePostDto } from 'core/src/interface';

import { ThunkAction } from '@/lib/redux';
import getCore from '@/core-wrapper';
import { createImageMarkDownSymbol } from '@/lib/editor';

import { CombinedState, PostingState } from '../interface';
import { postingActions } from './action';
import { getReduxStore } from '../store';

const core = getCore();
const reduxStore = getReduxStore();

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

    const setCodeJarInstance = useCallback((codeJar: any) => {
        dispatch(postingActions.setCodeJarInstance(codeJar));
    }, []);

    const uploadImage = useCallback(async (file: File) => {
        try {
            if (file?.type.includes('image')) {
                const {
                    posting: { code, codeJarInstance },
                } = reduxStore.getState();
                const data = await core.post.uploadImage(file);
                const imageText = createImageMarkDownSymbol(data.filename);
                codeJarInstance.updateCode(`${code}\n ${imageText}`);
                updateCode(`${code}\n ${imageText}`);
            }
        } catch (error) {
            /* TODO: Error Handling */
        }
    }, []);

    const savePostThunk = useCallback(
        (data: CreatePostDto, id?: number): ThunkAction =>
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
        savePostThunk,
        setCodeJarInstance,
        uploadImage,
    };
}
