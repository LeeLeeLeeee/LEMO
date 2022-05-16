import { SettingState } from '../interface';
import { SettingActionTypes, SettingActions } from './action';

const initialState: SettingState = {
    mode: 'light',
    headerVisible: true,
};

export default function SettingsReducer(
    state = initialState,
    action: SettingActions
): SettingState {
    switch (action.type) {
        case SettingActionTypes.CHANGE_THEME_MODE: {
            return {
                ...state,
                mode: action.payload,
            };
        }
        case SettingActionTypes.CHANGE_HEADER_VISIBLE: {
            return {
                ...state,
                headerVisible: action.payload,
            };
        }
        default: {
            return { ...state };
        }
    }
}
