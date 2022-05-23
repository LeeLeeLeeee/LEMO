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
                    await core.email.confirm(token);
                    thunkDispatch(authActions.emailConfirmSuccess());
                } catch (error) {
                    thunkDispatch(authActions.emailConfirmFailed(error));
                }
            },
        []
    );

    return {
        emailConfirm: (...props: Parameters<typeof emailConfirm>) =>
            dispatch(emailConfirm(...props)),
    };
}
