import { AuthState } from '../interface';
import { AuthActions, AuthActionsTypes } from './action';

const initialState: AuthState = {
    user: undefined,
    email: '',
    status: {
        emailConfirmed: false,
        emailConfirmedError: false,
        emailSended: false,
        emailSendedError: false,
        registered: false,
        registeredError: false,
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
                email: action.payload.email,
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
                    ...state.status,
                    emailConfirmed: false,
                    emailConfirmedError: action.payload.error,
                },
            };
        }
        case AuthActionsTypes.SEND_MAIL_SUCCESS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    emailSended: true,
                },
            };
        }
        case AuthActionsTypes.SEND_MAIL_FAILED: {
            return {
                ...state,
                status: {
                    ...state.status,
                    emailSended: false,
                    emailSendedError: action.payload.error,
                },
            };
        }
        case AuthActionsTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    registered: true,
                },
            };
        }
        case AuthActionsTypes.REGISTER_FAILED: {
            return {
                ...state,
                status: {
                    ...state.status,
                    registeredError: action.payload.error,
                },
            };
        }
        case AuthActionsTypes.RESET_AUTH_STATUS: {
            return {
                ...state,
                status: {
                    registered: false,
                    registeredError: null,
                    emailConfirmed: false,
                    emailConfirmedError: null,
                    emailSended: false,
                    emailSendedError: null,
                },
            };
        }
        case AuthActionsTypes.GET_SELF_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
            };
        }
        default: {
            return { ...state };
        }
    }
}
