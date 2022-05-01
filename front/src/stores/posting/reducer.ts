import { PostingState } from '../interface';
import { PostingActions, PostingActionsTypes } from './action';

const initialState: PostingState = {
    code: '',
    codeJarInstance: undefined,
    setting: {
        preview: false,
    },
    feeds: {
        list: [],
        cursor: -1,
    },
    status: {
        error: false,
        loading: false,
        success: false,
    },
};

export default function PostingReducer(
    state = initialState,
    action: PostingActions
): PostingState {
    switch (action.type) {
        case PostingActionsTypes.CHANGE_CODE: {
            return {
                ...state,
                code: action.payload.code,
            };
        }
        case PostingActionsTypes.CHANGE_PREVIEW: {
            return {
                ...state,
                setting: {
                    preview: action.payload.mode,
                },
            };
        }
        case PostingActionsTypes.SET_CODEJAR_INSTANCE: {
            return {
                ...state,
                codeJarInstance: action.payload.codeJar,
            };
        }
        case PostingActionsTypes.SAVE_CODE: {
            return {
                ...state,
                status: {
                    loading: true,
                    success: false,
                    error: false,
                },
            };
        }
        case PostingActionsTypes.SAVE_CODE_FAILED: {
            const { error } = action.payload;
            return {
                ...state,
                status: {
                    loading: false,
                    success: false,
                    error,
                },
            };
        }
        case PostingActionsTypes.SAVE_CODE_SUCCESS: {
            return {
                ...state,
                status: {
                    loading: false,
                    success: true,
                    error: false,
                },
            };
        }
        case PostingActionsTypes.GET_FEED: {
            return {
                ...state,
                status: {
                    loading: true,
                    success: false,
                    error: false,
                },
            };
        }
        case PostingActionsTypes.GET_FEED_SUCCESS: {
            const { feeds, cursor } = action.payload;
            return {
                ...state,
                status: {
                    loading: false,
                    success: true,
                    error: false,
                },
                feeds: {
                    list: [...state.feeds.list, ...feeds],
                    cursor,
                },
            };
        }
        case PostingActionsTypes.GET_FEED_FAILED: {
            const { error } = action.payload;
            return {
                ...state,
                status: {
                    loading: false,
                    success: false,
                    error,
                },
            };
        }
        case PostingActionsTypes.RESET_POSTING_STATUS: {
            return {
                ...state,
                status: {
                    loading: false,
                    success: false,
                    error: false,
                },
            };
        }
        default: {
            return { ...state };
        }
    }
}
