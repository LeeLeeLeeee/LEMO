import { ActionUnion, createAction } from "@/lib/redux";
import { SettingThemeModeProp } from "../interface";

export const SettingActionTypes = {
    CHANGE_THEME_MODE: 'CHANGE_THEME_MODE',
} as const;

export const settingActions = {
    changeThemeMode: (props: SettingThemeModeProp) => createAction(SettingActionTypes.CHANGE_THEME_MODE, { ...props }),
};

export type SettingActions = ActionUnion<typeof settingActions>;

