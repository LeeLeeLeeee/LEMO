import { ActionUnion, createAction } from '@/lib/redux';

export const PostingActionsTypes = {
    CHANGE_CODE: 'CHANGE_CODE',
} as const;

export const postingActions = {
    changeThemeMode: (code: string) =>
        createAction(PostingActionsTypes.CHANGE_CODE, code),
};

export type PostingActions = ActionUnion<typeof postingActions>;
