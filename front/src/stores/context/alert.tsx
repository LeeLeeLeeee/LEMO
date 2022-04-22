import { ActionUnion, createAction } from '@/lib/redux';

export type MessageOption = 'warning' | 'error' | 'success' | 'info';
export type MessagePosition =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

interface BaseAlertType {
    title?: string;
    content: string;
    type?: MessageOption;
}

export interface MessageTypes extends BaseAlertType {
    index: number;
    duration?: number;
    position?: MessagePosition;
}

export interface ConfirmTypes extends BaseAlertType {
    callOkFunc: () => void;
}

export interface AlertState {
    message: {
        list: MessageTypes[];
        count: number;
    };
    confirm: {
        instance?: ConfirmTypes;
    };
}

const ActionTypes = {
    INSERT_MESSAGE: 'INSERT_MESSAGE',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    OPEN_CONFIRM: 'OPEN_CONFIRM',
    CLOSE_CONFIRM: 'CLOSE_CONFIRM',
} as const;

export const actions = {
    insertMessage: (message: Omit<MessageTypes, 'index'>) =>
        createAction(ActionTypes.INSERT_MESSAGE, { message }),
    deleteMessage: (index: number) =>
        createAction(ActionTypes.DELETE_MESSAGE, { index }),
    openConfirm: (confirm: ConfirmTypes) =>
        createAction(ActionTypes.OPEN_CONFIRM, { confirm }),
    closeConfirm: () => createAction(ActionTypes.CLOSE_CONFIRM),
};

type ActionsTypes = ActionUnion<typeof actions>;

export const initialState: AlertState = {
    message: {
        list: [],
        count: 1,
    },
    confirm: {
        instance: undefined,
    },
};

export function reducer(
    state: AlertState = initialState,
    action: ActionsTypes
): AlertState {
    switch (action.type) {
        case ActionTypes.INSERT_MESSAGE: {
            return {
                message: {
                    list: [
                        ...state.message.list,
                        {
                            index: state.message.count,
                            ...action.payload.message,
                        },
                    ],
                    count: state.message.count + 1,
                },
                confirm: {
                    ...state.confirm,
                },
            };
        }
        case ActionTypes.DELETE_MESSAGE: {
            return {
                message: {
                    list: state.message.list.filter(
                        (message) => message.index !== action.payload.index
                    ),
                    count: state.message.count,
                },
                confirm: {
                    ...state.confirm,
                },
            };
        }
        case ActionTypes.OPEN_CONFIRM: {
            return {
                message: {
                    ...state.message,
                },
                confirm: {
                    instance: {
                        ...action.payload.confirm,
                    },
                },
            };
        }
        case ActionTypes.CLOSE_CONFIRM: {
            return {
                message: {
                    ...state.message,
                },
                confirm: {
                    instance: undefined,
                },
            };
        }
        default: {
            return { ...state };
        }
    }
}
