export type ThemeMode = 'dark' | 'light';

export interface SettingState {
    mode: ThemeMode;
}

export interface PostingState {
    code: string;
    codeJarInstance?: any;
    setting: {
        preview: boolean;
    };
}

export interface CombinedState {
    setting: SettingState;
    posting: PostingState;
}
