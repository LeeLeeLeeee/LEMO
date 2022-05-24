export type ThemeMode = 'dark' | 'light';

export type Feed = {
    id: number;
    title: string;
    thumbnailLink: string;
    createdAt: string;
};

export interface SettingState {
    mode: ThemeMode;
    headerVisible: boolean;
}

export interface PostingState {
    code: string;
    codeJarInstance?: any;
    feeds: {
        list: Feed[];
        cursor: number;
    };
    setting: {
        preview: boolean;
    };
    status: {
        loading: boolean;
        success: boolean;
        error: any;
    };
}

/* TODO:: user 타입 명시 */
export interface AuthState {
    user: any;
    status: {
        emailConfirmed: boolean;
        emailConfirmedError: any;
    };
}

export interface CombinedState {
    setting: SettingState;
    posting: PostingState;
    auth: AuthState;
}
