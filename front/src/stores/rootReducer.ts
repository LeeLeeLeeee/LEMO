import { combineReducers } from 'redux';

import postingReducer from './posting/reducer';
import settingReducer from './setting/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
    setting: settingReducer,
    posting: postingReducer,
    auth: authReducer,
});
