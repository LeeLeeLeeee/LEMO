import { ActionUnion, createAction } from '@/lib/redux';

import { Feed } from '../interface';

export const PostingActionsTypes = {
    CHANGE_CODE: 'CHANGE_CODE',
    CHANGE_PREVIEW: 'CHANGE_PREVIEW',
    SET_CODEJAR_INSTANCE: 'SET_CODEJAR_INSTANCE',
    SAVE_CODE: 'SAVE_CODE',
    SAVE_CODE_SUCCESS: 'SAVE_CODE_SUCCESS',
    SAVE_CODE_FAILED: 'SAVE_CODE_FAILED',
    GET_FEED: 'GET_FEED',
    GET_FEED_SUCCESS: 'GET_FEED_SUCCESS',
    GET_FEED_FAILED: 'GET_FEED_FAILED',
    RESET_POSTING_STATUS: 'RESET_POSTING_STATUS',
} as const;

export const postingActions = {
    changeThemeMode: (code: string) =>
        createAction(PostingActionsTypes.CHANGE_CODE, { code }),
    changePreview: (mode: boolean) =>
        createAction(PostingActionsTypes.CHANGE_PREVIEW, { mode }),
    setCodeJarInstance: (codeJar: any) =>
        createAction(PostingActionsTypes.SET_CODEJAR_INSTANCE, { codeJar }),
    savePost: () => createAction(PostingActionsTypes.SAVE_CODE),
    savePostSuccess: () => createAction(PostingActionsTypes.SAVE_CODE_SUCCESS),
    savePostFailed: (error: any) =>
        createAction(PostingActionsTypes.SAVE_CODE_FAILED, { error }),
    getFeed: () => createAction(PostingActionsTypes.GET_FEED),
    getFeedSuccess: (feeds: Feed[], cursor: number) =>
        createAction(PostingActionsTypes.GET_FEED_SUCCESS, { feeds, cursor }),
    getFeedFailed: (error: any) =>
        createAction(PostingActionsTypes.GET_FEED_FAILED, { error }),
    resetPostingStatus: () =>
        createAction(PostingActionsTypes.RESET_POSTING_STATUS),
};

export type PostingActions = ActionUnion<typeof postingActions>;
