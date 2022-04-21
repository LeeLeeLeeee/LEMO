import { ActionUnion, createAction } from '@/lib/redux';

export const PostingActionsTypes = {
    CHANGE_CODE: 'CHANGE_CODE',
    CHANGE_PREVIEW: 'CHANGE_PREVIEW',
    SET_CODEJAR_INSTANCE: 'SET_CODEJAR_INSTANCE',
    SAVE_CODE: 'SAVE_CODE',
    SAVE_CODE_SUCCESS: 'SAVE_CODE_SUCCESS',
    SAVE_CODE_FAILED: 'SAVE_CODE_FAILED',
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
};

export type PostingActions = ActionUnion<typeof postingActions>;
