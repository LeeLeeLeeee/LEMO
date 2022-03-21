import { SettingState } from '../interface';
import { SettingActionTypes, SettingActions } from './actions';

const initialState: SettingState = {
    mode: 'light'
}

export default (state = initialState, action: SettingActions): SettingState => {
    switch(action.type) {
        case SettingActionTypes.CHANGE_THEME_MODE: {
            return {
                ...state,
                mode: action.payload.mode,
            }
        }
        default: {
            return { ...state };
        }
    }
};