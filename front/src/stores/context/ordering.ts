import { ActionUnion, createAction } from '@/lib/redux';

type OrderType = 'asc' | 'desc' | undefined;

type State = {
    orderKey: string;
    orderDirection: OrderType;
};

const initialState: State = {
    orderKey: '',
    orderDirection: 'asc',
};

const ActionTypes = {
    CHANGE_KEY: 'ORDERING/CHANGE_KEY',
    CHANGE_DIRECTION: 'ORDERING/CHANGE_DIRECTION',
} as const;

const orderingActions = {
    changeKey: (key: string) => createAction(ActionTypes.CHANGE_KEY, { key }),
    changeDirection: (direction: OrderType) =>
        createAction(ActionTypes.CHANGE_DIRECTION, { direction }),
};

type OrderingActions = ActionUnion<typeof orderingActions>;

const reducer = (
    state: State = initialState,
    action: OrderingActions
): State => {
    switch (action.type) {
        case ActionTypes.CHANGE_KEY: {
            return {
                ...state,
                orderKey: action.payload.key,
            };
        }
        case ActionTypes.CHANGE_DIRECTION: {
            return {
                ...state,
                orderDirection: action.payload.direction,
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer, initialState, orderingActions };
export type { OrderType };
