import { ActionUnion, createAction } from '@/lib/redux';

import { DictionaryType } from '../interface';

type State = {
    filterMap: DictionaryType;
};

const initialState: State = {
    filterMap: {},
};

const ActionTypes = {
    SET_FILTER: 'FILTER/SET_FILTER',
    SET_FILTER_VALUE: 'FILTER/SET_FILTER_VALUE',
    CLEAR_FILTER: 'FILTER/CLEAR_FILTER',
    CLEAR_ALL: 'FILTER/CLEAR_ALL',
} as const;

const filterActions = {
    setFilter: (filter: DictionaryType) =>
        createAction(ActionTypes.SET_FILTER, { filter }),
    setFilterValue: (key: string, value: string | number) =>
        createAction(ActionTypes.SET_FILTER_VALUE, { key, value }),
    clearFilter: (key: string) =>
        createAction(ActionTypes.CLEAR_FILTER, { key }),
    clearAll: () => createAction(ActionTypes.CLEAR_ALL),
};

type FilterActions = ActionUnion<typeof filterActions>;

function convertObjectToFilterMap(object: DictionaryType): DictionaryType {
    if (typeof object === 'object') {
        return Object.keys(object).reduce(
            (prev, key) => ({
                ...prev,
                [key]: { value: object[key] },
            }),
            {}
        );
    }
    return {};
}

const reducer = (state: State = initialState, action: FilterActions): State => {
    switch (action.type) {
        case ActionTypes.SET_FILTER: {
            return {
                filterMap: { ...state.filterMap, ...action.payload.filter },
            };
        }
        case ActionTypes.SET_FILTER_VALUE: {
            return {
                filterMap: {
                    ...state.filterMap,
                    [action.payload.key]: {
                        ...state.filterMap[action.payload.key],
                        value: action.payload.value,
                    },
                },
            };
        }
        case ActionTypes.CLEAR_FILTER: {
            const copyFilterMap = { ...state.filterMap };
            if (action.payload.key in copyFilterMap) {
                delete copyFilterMap[action.payload.key];
            }
            return {
                filterMap: { ...copyFilterMap },
            };
        }
        case ActionTypes.CLEAR_ALL: {
            return {
                filterMap: {},
            };
        }
        default: {
            return state;
        }
    }
};

export { reducer, initialState, filterActions, convertObjectToFilterMap };
