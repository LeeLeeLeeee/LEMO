import { useCallback, useReducer } from 'react';

import { ActionUnion, createAction } from '@/lib/redux';

export interface State {
    modalID: Set<string>;
}

const initialState: State = {
    modalID: new Set(),
};

const ActionTypes = {
    SET_IS_CLOSE: 'MODAL/SET_IS_CLOSE',
    SET_IS_CLOSE_ALL: 'MODAL/SET_IS_CLOSE_ALL',
    SET_IS_OPEN: 'MODAL/SET_IS_OPEN',
} as const;

const actions = {
    setIsClose: (id: string) => createAction(ActionTypes.SET_IS_CLOSE, { id }),
    setIsCloseAll: () => createAction(ActionTypes.SET_IS_CLOSE_ALL),
    setIsOpen: (id: string) => createAction(ActionTypes.SET_IS_OPEN, { id }),
};

type ActionsTypes = ActionUnion<typeof actions>;

const reducer = (state: State = initialState, action: ActionsTypes): State => {
    switch (action.type) {
        case ActionTypes.SET_IS_CLOSE: {
            state.modalID.delete(action.payload.id);
            if (state.modalID.has(action.payload.id)) {
                return {
                    ...state,
                    modalID: state.modalID,
                };
            }
            return { ...state };
        }
        case ActionTypes.SET_IS_OPEN: {
            state.modalID.add(action.payload.id);
            return {
                ...state,
                modalID: state.modalID,
            };
        }
        case ActionTypes.SET_IS_CLOSE_ALL: {
            return {
                modalID: new Set(),
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

const useModal = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setModalOpen = useCallback((id: string) => {
        dispatch(actions.setIsOpen(id));
    }, []);

    const setModalClose = useCallback((id: string) => {
        dispatch(actions.setIsClose(id));
    }, []);

    const setModalCloseAll = useCallback(() => {
        dispatch(actions.setIsCloseAll());
    }, []);

    return {
        state,
        setModalCloseAll,
        setModalClose,
        setModalOpen,
    };
};

export default useModal;
