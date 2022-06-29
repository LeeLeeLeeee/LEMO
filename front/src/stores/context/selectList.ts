import { ActionUnion, createAction } from '@/lib/redux';

type State = {
    total: number;
    selectedIDList: (number | string)[];
    idListByPage: { [key: number]: any[] };
    cachedDataByPage: { [key: number]: any[] };
};

const initialState: State = {
    total: 0,
    selectedIDList: [],
    idListByPage: {},
    cachedDataByPage: {},
};

const ActionTypes = {
    CHECK_ITEM: 'LIST/CHECK_ITEM',
    CLEAR_ITEM: 'LIST/CLEAR_ITEM',
    CHECK_ITEM_LIST: 'LIST/CHECK_ITEM_LIST',
    CLEAR_ITEM_LIST: 'LIST/CLEAR_ITEM_LIST',
    CLEAR_ITEM_LIST_ALL: 'LIST/CLEAR_ITEM_LIST_ALL',
    SET_PAGE_ID: 'LIST/SET_PAGE_ID',
    SET_PAGE: 'LIST/SET_PAGE',
    SET_CACHED_DATA: 'SET_CACHED_DATA',
} as const;

const listActions = {
    checkItem: (id: any) => createAction(ActionTypes.CHECK_ITEM, { id }),
    clearItem: (id: any) => createAction(ActionTypes.CLEAR_ITEM, { id }),
    checkItemList: (idList: any[]) =>
        createAction(ActionTypes.CHECK_ITEM_LIST, { idList }),
    clearItemListAll: () => createAction(ActionTypes.CLEAR_ITEM_LIST_ALL),
    clearItemList: (idList: any[]) =>
        createAction(ActionTypes.CLEAR_ITEM_LIST, { idList }),
    setPageIDList: (page: number, idList: any[]) =>
        createAction(ActionTypes.SET_PAGE_ID, { page, idList }),
    setPageCachedData: (page: number, dataList: any[]) =>
        createAction(ActionTypes.SET_CACHED_DATA, { page, dataList }),
};

type ListActions = ActionUnion<typeof listActions>;

const reducer = (state: State = initialState, action: ListActions): State => {
    const { total, idListByPage, selectedIDList, cachedDataByPage } = state;
    switch (action.type) {
        case ActionTypes.CHECK_ITEM: {
            return {
                ...state,
                total: total + 1,
                selectedIDList: [...selectedIDList, action.payload.id],
            };
        }
        case ActionTypes.CLEAR_ITEM: {
            return {
                ...state,
                total: total - 1,
                selectedIDList: selectedIDList.filter(
                    (id: any) => id !== action.payload.id
                ),
            };
        }
        case ActionTypes.CHECK_ITEM_LIST: {
            return {
                ...state,
                total: total + action.payload.idList.length,
                selectedIDList: [...selectedIDList, ...action.payload.idList],
            };
        }
        case ActionTypes.CLEAR_ITEM_LIST: {
            return {
                ...state,
                total: total - action.payload.idList.length,
                selectedIDList: selectedIDList.filter(
                    (id: any) => !action.payload.idList.includes(id)
                ),
            };
        }
        case ActionTypes.CLEAR_ITEM_LIST_ALL: {
            return {
                ...state,
                total: 0,
                selectedIDList: [],
            };
        }
        case ActionTypes.SET_PAGE_ID: {
            return {
                ...state,
                idListByPage: {
                    ...idListByPage,
                    [action.payload.page]: action.payload.idList,
                },
            };
        }
        case ActionTypes.SET_CACHED_DATA: {
            return {
                ...state,
                cachedDataByPage: {
                    ...cachedDataByPage,
                    [action.payload.page]: action.payload.dataList,
                },
            };
        }
        default: {
            break;
        }
    }
    return state;
};

export { listActions, reducer, initialState };
