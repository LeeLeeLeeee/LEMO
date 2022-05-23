import { ActionUnion, createAction } from '@/lib/redux';

export const AuthActionsTypes = {
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILED: 'REGISTER_FAILED',
    EMAIL_CONFIRM_SUCCESS: 'EMAIL_CONFIRM_SUCCESS',
    EMAIL_CONFIRM_FAILED: 'EMAIL_CONFIRM_FAILED',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILED: 'SIGN_IN_FAILED',
} as const;

export const authActions = {
    registerSuccess: (user: any) =>
        createAction(AuthActionsTypes.REGISTER_SUCCESS, { user }),
    registerFailed: (error: any) =>
        createAction(AuthActionsTypes.REGISTER_FAILED, { error }),
    emailConfirmSuccess: () =>
        createAction(AuthActionsTypes.EMAIL_CONFIRM_SUCCESS),
    emailConfirmFailed: (error: any) =>
        createAction(AuthActionsTypes.EMAIL_CONFIRM_FAILED, { error }),
    signInSuccess: (user: any) =>
        createAction(AuthActionsTypes.SIGN_IN_SUCCESS, { user }),
    signInFailed: (error: any) =>
        createAction(AuthActionsTypes.SIGN_IN_FAILED, { error }),
};

export type AuthActions = ActionUnion<typeof authActions>;
