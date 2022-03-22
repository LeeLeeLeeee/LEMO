
export type ThemeMode = 'dark' | 'light';

export interface SettingState {
    mode: ThemeMode
}

export interface CombinedState {
    setting: SettingState
}
