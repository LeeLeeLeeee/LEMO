import { ActionUnion, createAction } from '@/lib/redux';

import { ThemeMode } from '../interface';

export const SettingActionTypes = {
    CHANGE_THEME_MODE: 'CHANGE_THEME_MODE',
    CHANGE_HEADER_VISIBLE: 'CHANGE_HEADER_VISIBLE',
} as const;

export const settingActions = {
    changeThemeMode: (mode: ThemeMode) =>
        createAction(SettingActionTypes.CHANGE_THEME_MODE, mode),
    changeHeaderVisible: (visible: boolean) =>
        createAction(SettingActionTypes.CHANGE_HEADER_VISIBLE, visible),
};

export type SettingActions = ActionUnion<typeof settingActions>;
