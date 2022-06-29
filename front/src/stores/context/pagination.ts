import { ActionUnion, createAction } from '@/lib/redux';

type State = {
    page: number;
    count: number;
    rowsPerPage: number;
};

const initialState: State = {
    page: 0,
    count: 0,
    rowsPerPage: 10,
};

const ActionTypes = {
    CHANGE_PAGE: 'PAGINATION/CHANGE_PAGE',
    CHANGE_COUNT: 'PAGINATION/CHANGE_COUNT',
    CHANGE_ROWS_PER_PAGE: 'PAGINATION/CHANGE_ROWS_PER_PAGE',
} as const;

const paginationActions = {
    changePage: (page: number) =>
        createAction(ActionTypes.CHANGE_PAGE, { page }),
    changeCount: (count: number) =>
        createAction(ActionTypes.CHANGE_COUNT, { count }),
    changeRowsPerPage: (rows: number) =>
        createAction(ActionTypes.CHANGE_ROWS_PER_PAGE, { rows }),
};

type PaginationActions = ActionUnion<typeof paginationActions>;

const reducer = (
    state: State = initialState,
    action: PaginationActions
): State => {
    switch (action.type) {
        case ActionTypes.CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload.page,
            };
        }
        case ActionTypes.CHANGE_COUNT: {
            return {
                ...state,
                count: action.payload.count,
            };
        }
        case ActionTypes.CHANGE_ROWS_PER_PAGE: {
            return {
                ...state,
                rowsPerPage: action.payload.rows,
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer, initialState, paginationActions };
