import { ActionState } from '../interface';

/* eslint-disable import/no-anonymous-default-export */
const initialState: ActionState = {
    type: '',
    payload: null,
};

export default (state = initialState, action: any) => {
    return {
        ...state,
        ...action,
    };
};
