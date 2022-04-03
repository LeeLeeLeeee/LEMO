import { combineReducers } from 'redux';

import PostingReducer from './posting/reducer';
import settingReducer from './setting/reducer';

export default combineReducers({
    setting: settingReducer,
    posting: PostingReducer,
});
