/**
 * Created by lyq on 2018/2/19.
 */

export const SKIP = 'SKIP';
export const DONE = 'DONE';
export const LOGIN_IN = 'LOGIN_IN';
export const SKIP_LOGIN = 'SKIP_LOGIN';
export const SKIP_MAINT = 'SKIP_MAINT';

export function skipToMaint(data){
    return {
        type:'SKIP_MAINT',
        plateNumber:data
    }
}

export const UserStatus = {
    IntroStatus:false,
    LoginStatus:false,
    UserInfo:{}
};

export function doSkip(){
    return {
        type:'SKIP',
        info:'跳过引导页'
    }
}

export function doDone(){
    return {
        type:'DONE',
        info:'完成引导页'
    }
}

export function doLogin(data){
    return {
        type:'LOGIN_IN',
        info:'完成引导页',
        openid:data.openid,
        role:data.role,
        fullname:data.fullname
    }
}

export function skipLogin(data){
    return {
        type:'SKIP_LOGIN',
        info:'直接进入主页',
        openid:data.openid,
        role:data.role,
    }
}
