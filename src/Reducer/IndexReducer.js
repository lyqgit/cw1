/**
 * Created by lyq on 2018/2/19.
 */
import { combineReducers } from 'redux';
import { doLogin } from './LoginReducer';
import { doSkip } from './IntroReducer';

const AppReducer = combineReducers({
    // doLogin,
    doSkip,
});

export default AppReducer;