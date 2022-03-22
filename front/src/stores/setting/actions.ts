import { ActionUnion, createAction } from "@/lib/redux";
import { ThemeMode } from "../interface";

export const SettingActionTypes = {
    CHANGE_THEME_MODE: 'CHANGE_THEME_MODE',
} as const;

export const settingActions = {
    changeThemeMode: (mode: ThemeMode) => createAction(SettingActionTypes.CHANGE_THEME_MODE, mode),
};

export type SettingActions = ActionUnion<typeof settingActions>;

