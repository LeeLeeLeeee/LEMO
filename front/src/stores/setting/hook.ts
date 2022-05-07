import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { ThemeMode } from '../interface';
import { settingActions } from './actions';

export function useSettingsDispatch() {
    const dispatch = useDispatch();

    const setThemeMode = useCallback((mode: ThemeMode) => {
        dispatch(settingActions.changeThemeMode(mode));
    }, []);

    const setHeaderVisible = useCallback((visible: boolean) => {
        dispatch(settingActions.changeHeaderVisible(visible));
    }, []);

    return {
        setThemeMode,
        setHeaderVisible,
    };
}
