/**
 * Created by lyq on 2018/2/19.
 */

import { Login } from '../Action/LoginAction';
import { AppNavigator } from '../Navigation/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export function doLogin(state = initialState,action){
    switch(action.type){
        case Login.Login_In:
        return state;
    }
    return state;
}
