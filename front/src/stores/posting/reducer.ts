import { PostingState } from '../interface';
import { PostingActions, PostingActionsTypes } from './action';

const initialState: PostingState = {
    code: 'xxxxxxxxx',
};

export default function PostingReducer(
    state = initialState,
    action: PostingActions
): PostingState {
    switch (action.type) {
        case PostingActionsTypes.CHANGE_CODE: {
            return {
                ...state,
                code: action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
}
