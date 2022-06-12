import { AuthState } from '../interface';
import { AuthActions, AuthActionsTypes } from './action';

const initialState: AuthState = {
    user: undefined,
    email: '',
    status: {
        emailConfirmed: false,
        emailConfirmedError: null,
        emailSended: false,
        emailSendedError: null,
        registered: false,
        registeredError: null,
        signInError: null,
        signOutError: null,
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
                user: action.payload.user,
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
                    signInError: null,
                    signOutError: null,
                },
            };
        }
        case AuthActionsTypes.SIGN_IN_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
            };
        }
        case AuthActionsTypes.SIGN_IN_FAILED: {
            return {
                ...state,
                status: {
                    ...state.status,
                    signInError: action.payload.error,
                },
            };
        }
        case AuthActionsTypes.SIGN_OUT_SUCCESS: {
            return {
                ...state,
                user: undefined,
            };
        }
        case AuthActionsTypes.SIGN_OUT_FAILED: {
            return {
                ...state,
                status: {
                    ...state.status,
                    signOutError: action.payload.error,
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
