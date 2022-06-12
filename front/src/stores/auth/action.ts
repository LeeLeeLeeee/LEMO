import { ActionUnion, createAction } from '@/lib/redux';

export const AuthActionsTypes = {
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILED: 'REGISTER_FAILED',
    SEND_MAIL_SUCCESS: 'SEND_MAIL_SUCCESS',
    SEND_MAIL_FAILED: 'SEND_MAIL_FAILED',
    EMAIL_CONFIRM_SUCCESS: 'EMAIL_CONFIRM_SUCCESS',
    EMAIL_CONFIRM_FAILED: 'EMAIL_CONFIRM_FAILED',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILED: 'SIGN_IN_FAILED',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
    RESET_AUTH_STATUS: 'RESET_AUTH_STATUS',
    GET_SELF_SUCCESS: 'GET_SELF_SUCCESS',
    GET_SELF_FAILED: 'GET_SELF_FAILED',
} as const;

export const authActions = {
    registerSuccess: (user: any) =>
        createAction(AuthActionsTypes.REGISTER_SUCCESS, { user }),
    registerFailed: (error: any) =>
        createAction(AuthActionsTypes.REGISTER_FAILED, { error }),
    sendMailSuccess: () => createAction(AuthActionsTypes.SEND_MAIL_SUCCESS),
    sendMailFailed: (error: any) =>
        createAction(AuthActionsTypes.SEND_MAIL_FAILED, { error }),
    emailConfirmSuccess: (email: string) =>
        createAction(AuthActionsTypes.EMAIL_CONFIRM_SUCCESS, { email }),
    emailConfirmFailed: (error: any) =>
        createAction(AuthActionsTypes.EMAIL_CONFIRM_FAILED, { error }),
    signInSuccess: (user: any) =>
        createAction(AuthActionsTypes.SIGN_IN_SUCCESS, { user }),
    signInFailed: (error: any) =>
        createAction(AuthActionsTypes.SIGN_IN_FAILED, { error }),
    resetAuthStatus: () => createAction(AuthActionsTypes.RESET_AUTH_STATUS),
    signOutSuccess: () => createAction(AuthActionsTypes.SIGN_OUT_SUCCESS),
    signOutFailed: (error: any) =>
        createAction(AuthActionsTypes.SIGN_OUT_FAILED, { error }),
    getSelfSuccess: (user: any) =>
        createAction(AuthActionsTypes.GET_SELF_SUCCESS, { user }),
    getSelfFailed: (error: any) =>
        createAction(AuthActionsTypes.GET_SELF_FAILED, { error }),
};

export type AuthActions = ActionUnion<typeof authActions>;
