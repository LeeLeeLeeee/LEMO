import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { CombinedState, SettingState, ThemeMode } from '../interface';
import { settingActions } from './actions';

export function useSettingsState(): SettingState {
    return useSelector((state: CombinedState) => state.setting);
}

export function useSettingsDispatch() {
    const dispatch = useDispatch();

    const setThemeMode = useCallback((mode: ThemeMode) => {
        dispatch(settingActions.changeThemeMode(mode));
    }, []);

    return {
        setThemeMode,
    };
}
