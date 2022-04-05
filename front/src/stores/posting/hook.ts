import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CombinedState, PostingState } from '../interface';
import { postingActions } from './action';

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

    return {
        updateCode,
        changePreview,
    };
}
