/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import getCore from '@/core-wrapper';
import { ThunkAction } from '@/lib/redux';

import { authActions } from './action';

const core = getCore();

export default function useAuthDispatch() {
    const dispatch = useDispatch();
    const emailConfirm = useCallback(
        (token: string): ThunkAction =>
            async (thunkDispatch: any) => {
                try {
                    const { email } = await core.email.confirm(token);
                    thunkDispatch(authActions.emailConfirmSuccess(email));
                } catch (error) {
                    thunkDispatch(authActions.emailConfirmFailed(error));
                }
            },
        []
    );

    const sendEmail = useCallback(
        (email: string): ThunkAction =>
            async (thunkDispatch: any) => {
                try {
                    await core.email.sendEmail(email);
                    thunkDispatch(authActions.sendMailSuccess());
                } catch (error) {
                    thunkDispatch(authActions.sendMailFailed(error));
                }
            },
        []
    );

    const register = useCallback(
        (
                username: string,
                email: string,
                password: string,
                description: string
            ): ThunkAction =>
            async (thunkDispatch: any) => {
                try {
                    const user = await core.auth.register({
                        name: username,
                        email,
                        password,
                        description,
                    });
                    thunkDispatch(authActions.registerSuccess(user));
                } catch (error) {
                    thunkDispatch(authActions.registerFailed(error));
                }
            },
        []
    );

    const resetStatus = useCallback(() => {
        dispatch(authActions.resetAuthStatus());
    }, []);

    const getSelf = useCallback(
        (): ThunkAction => async (thunkDispatch: any) => {
            try {
                const user = await core.user.getSelf();
                thunkDispatch(authActions.getSelfSuccess(user));
            } catch (error) {
                thunkDispatch(authActions.getSelfFailed(error));
            }
        },
        []
    );

    return {
        emailConfirmAsync: (...props: Parameters<typeof emailConfirm>) =>
            dispatch(emailConfirm(...props)),
        resetStatus,
        sendEmailAsync: (...props: Parameters<typeof sendEmail>) =>
            dispatch(sendEmail(...props)),
        registerAsync: (...props: Parameters<typeof register>) =>
            dispatch(register(...props)),
        getSelfAsync: (...props: Parameters<typeof getSelf>) =>
            dispatch(getSelf(...props)),
    };
}
