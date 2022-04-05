import { PostingState } from '../interface';
import { PostingActions, PostingActionsTypes } from './action';

const initialState: PostingState = {
    code: '',
    setting: {
        preview: false,
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
        default: {
            return { ...state };
        }
    }
}
