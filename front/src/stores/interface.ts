export type ThemeMode = 'dark' | 'light';

export interface SettingState {
    mode: ThemeMode;
}

export interface PostingState {
    code: string;
}

export interface CombinedState {
    setting: SettingState;
    posting: PostingState;
}
