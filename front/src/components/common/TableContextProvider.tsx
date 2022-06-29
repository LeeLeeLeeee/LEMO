import { createContext, useCallback, useContext, useReducer } from 'react';

import {
    reducer as orderingReducer,
    initialState as orderingInitialState,
    orderingActions,
    OrderType,
} from '@/stores/context/ordering';
import {
    reducer as paginationReducer,
    initialState as paginationInitialState,
    paginationActions,
} from '@/stores/context/pagination';
import {
    reducer as selectListReducer,
    initialState as selectListInitialState,
    listActions,
} from '@/stores/context/selectList';
import {
    reducer as filterReducer,
    initialState as filterInitialState,
    filterActions,
} from '@/stores/context/filter';
import { DictionaryType } from '@/stores/interface';

type TableContextProps = {
    state: {
        ordering: typeof orderingInitialState;
        pagination: typeof paginationInitialState;
        selectList: typeof selectListInitialState;
        filter: typeof filterInitialState;
    };
    dispatch: {
        setOrderingKey: (key: string) => void;
        setOrderingDirection: (direction: OrderType) => void;
        changePage: (page: number) => void;
        changeCount: (count: number) => void;
        changeRowsPerPage: (rows: number) => void;
        checkItem: (id: any) => void;
        clearItem: (id: any) => void;
        checkItemList: (idList: any[]) => void;
        clearItemList: (idList: any[]) => void;
        clearItemListAll: () => void;
        setPageIDList: (idList: any[]) => void;
        setPageCachedData: (data: any[]) => void;
        clearFilterAll: () => void;
        clearFilter: (key: string) => void;
        setFilter: (filter: DictionaryType) => void;
        setFilterValue: (key: string, value: number | string) => void;
    };
};

const TableContext = createContext({} as TableContextProps);

export const useTableContextState = (): TableContextProps['state'] => {
    const { state } = useContext(TableContext);
    if (!state) {
        throw new Error('table context is not defined');
    }

    return state;
};

export const useTableContextDispatch = (): TableContextProps['dispatch'] => {
    const { dispatch } = useContext(TableContext);
    if (!dispatch) {
        throw new Error('table context is not defined');
    }

    return dispatch;
};

export function TableContextProvider({ children }: any) {
    const [orderingState, orderingDispatch] = useReducer(
        orderingReducer,
        orderingInitialState
    );
    const [paginationState, paginationDispatch] = useReducer(
        paginationReducer,
        paginationInitialState
    );
    const [selectListState, selectListDispatch] = useReducer(
        selectListReducer,
        selectListInitialState
    );
    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        filterInitialState
    );

    const setOrderingKey = useCallback((key: string) => {
        orderingDispatch(orderingActions.changeKey(key));
    }, []);

    const setOrderingDirection = useCallback((direction: OrderType) => {
        orderingDispatch(orderingActions.changeDirection(direction));
    }, []);

    const changePage = useCallback((page: number) => {
        paginationDispatch(paginationActions.changePage(page));
    }, []);

    const changeCount = useCallback((count: number) => {
        paginationDispatch(paginationActions.changeCount(count));
    }, []);

    const changeRowsPerPage = useCallback((rows: number) => {
        paginationDispatch(paginationActions.changeRowsPerPage(rows));
    }, []);

    const checkItem = useCallback((id: any) => {
        selectListDispatch(listActions.checkItem(id));
    }, []);

    const clearItem = useCallback((id: any) => {
        selectListDispatch(listActions.clearItem(id));
    }, []);

    const checkItemList = useCallback((idList: any[]) => {
        selectListDispatch(listActions.checkItemList(idList));
    }, []);

    const clearItemList = useCallback((idList: any[]) => {
        selectListDispatch(listActions.clearItemList(idList));
    }, []);

    const clearItemListAll = useCallback(() => {
        selectListDispatch(listActions.clearItemListAll());
    }, []);

    const clearFilterAll = useCallback(() => {
        filterDispatch(filterActions.clearAll());
    }, []);

    const clearFilter = useCallback((key: string) => {
        filterDispatch(filterActions.clearFilter(key));
    }, []);

    const setFilter = useCallback((filter: DictionaryType) => {
        filterDispatch(filterActions.setFilter(filter));
    }, []);

    const setFilterValue = useCallback(
        (key: string, value: string | number) => {
            filterDispatch(filterActions.setFilterValue(key, value));
        },
        []
    );

    const setPageIDList = useCallback(
        (idList: any[]) => {
            selectListDispatch(
                listActions.setPageIDList(paginationState.page, idList)
            );
        },
        [paginationState.page]
    );

    const setPageCachedData = useCallback(
        (dataList: any[]) => {
            selectListDispatch(
                listActions.setPageCachedData(paginationState.page, dataList)
            );
        },
        [paginationState.page]
    );

    const providerValue = {
        state: {
            ordering: orderingState,
            pagination: paginationState,
            selectList: selectListState,
            filter: filterState,
        },
        dispatch: {
            setOrderingKey,
            setOrderingDirection,
            changePage,
            changeCount,
            changeRowsPerPage,
            checkItem,
            clearItem,
            checkItemList,
            clearItemList,
            setPageIDList,
            clearFilterAll,
            clearFilter,
            setFilter,
            setFilterValue,
            clearItemListAll,
            setPageCachedData,
        },
    };
    return (
        <TableContext.Provider value={providerValue}>
            {children}
        </TableContext.Provider>
    );
}

TableContextProvider.DisplayName = 'TableContextProvider';
