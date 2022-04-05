import { ActionUnion, createAction } from '@/lib/redux';

export const PostingActionsTypes = {
    CHANGE_CODE: 'CHANGE_CODE',
    CHANGE_PREVIEW: 'CHANGE_PREVIEW',
} as const;

export const postingActions = {
    changeThemeMode: (code: string) =>
        createAction(PostingActionsTypes.CHANGE_CODE, { code }),
    changePreview: (mode: boolean) =>
        createAction(PostingActionsTypes.CHANGE_PREVIEW, { mode }),
};

export type PostingActions = ActionUnion<typeof postingActions>;
