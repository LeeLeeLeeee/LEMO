import { SettingState } from '../interface';
import { SettingActionTypes, SettingActions } from './actions';

const initialState: SettingState = {
    mode: 'dark'
}

export default (state = initialState, action: SettingActions): SettingState => {
    switch(action.type) {
        case SettingActionTypes.CHANGE_THEME_MODE: {
            return {
                ...state,
                mode: action.payload,
            }
        }
        default: {
            return { ...state };
        }
    }
};