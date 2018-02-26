/**
 * Created by lyq on 2018/2/19.
 */

/*
 *  登录类型
 */
export const Login = {
    LOGIN_IN:'LOGIN_IN',
    LOGIN_OUT:'LOGIN_OUT'
};




/**
 *
 * action创建函数
 */
export function loginIn(){
    return {
        type:Login.LOGIN_IN,
        info:'登录'
    }
}

export function loginOut(){
    return {
        type:Login.LOGIN_OUT,
        info:'退出'
    }
}
