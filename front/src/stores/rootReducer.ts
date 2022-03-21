import { combineReducers } from "redux";
import settingReducer from './setting/reducer';

export default combineReducers({
    setting: settingReducer,
});