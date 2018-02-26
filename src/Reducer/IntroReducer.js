/**
 * Created by lyq on 2018/2/19.
 */

import { NavigationActions } from 'react-navigation';
import * as types from '../Action/IntroAction';
import { AppNavigator } from '../Navigation/AppNavigator';
import Main from '../Navigation/MainNavigator';

// console.log(Main.router.getStateForAction(Main.router.getActionForPathAndParams('Map')));
// const taskNavigator = Main.router.getStateForAction(Main.router.getActionForPathAndParams('Task'));
// const mapNavigator = Main.router.getStateForAction(Main.router.getActionForPathAndParams('Map'),taskNavigator);
const mainNavigator = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName:'Main'}));
const loginNavigator = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'),mainNavigator);
const introNavigator = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Intro'),loginNavigator);
// console.log(introNavigator.routes);



// let introStatus = false;
// let LoginStatus = false;

let final;

// if(!introStatus){
    final = introNavigator;
// }else if(!LoginStatus){
//     final = loginNavigator
// }else{
//     final = mainNavigator;
// }

let initialState = {
    ...final,
    token:"",
    role:"",
    fullname:"",
};

export function doSkip(state = initialState,action){

    let nextState;
    switch(action.type){
        case types.SKIP:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName:'Login'}),
                state
            );
        break;
        case types.DONE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName:'Login'}),
                state
            );
        break;
        case types.SKIP_LOGIN:
            state.token = action.openid;
            state.role = action.role;
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName:'Main'}),
                state
            );
        break;
        case types.LOGIN_IN:
            state.token = action.openid;
            state.role = action.role;
            state.fullname = action.fullname;
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName:'Main'}),
                state
            );
        break;
        case types.SKIP_MAINT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName:'Maint'}),
                state
            );
        break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
        break;
    }
    // console.log(introNavigator.routes.push(mapNavigator));
    // console.log(nextState);
    // console.log(mainNavigator);
    return nextState || state;
}