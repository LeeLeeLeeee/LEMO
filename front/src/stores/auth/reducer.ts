import { AuthState } from '../interface';
import { AuthActions, AuthActionsTypes } from './action';

const initialState: AuthState = {
    user: undefined,
    status: {
        emailConfirmed: false,
        emailConfirmedError: false,
    },
};

export default function AuthReducer(
    state = initialState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionsTypes.EMAIL_CONFIRM_SUCCESS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    emailConfirmed: true,
                },
            };
        }
        case AuthActionsTypes.EMAIL_CONFIRM_FAILED: {
            return {
                ...state,
                status: {
                    emailConfirmed: false,
                    emailConfirmedError: action.payload.error,
                },
            };
        }
        default: {
            return { ...state };
        }
    }
}
