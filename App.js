import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import AppReducer from './src/Reducer/IndexReducer';
import AppWithNavigationState from './src/Navigation/AppNavigator';
import { middleware } from './src/Utils/redux';
import { storage } from './src/Utils/storage';

global.topUrl = 'https://cw.icbqida.com';
global.testUrl = 'http://192.168.31.233/tp5/index.php';

const store = createStore(
    AppReducer,
    applyMiddleware(middleware),
);

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            introStatus:false,
            LoginStatus:false,
            isStart:false,
        };
        let that = this;
        storage.load({
            key:'introStatus',
            autoSync:true,
            syncInBackground:false,
        }).then(ret=>{
            console.log(ret);
            global.IntroStatus = ret.introStatus;
        });

        storage.load({
            key:'loginInfo',
            autoSync:true,
            syncInBackground:false,
        }).then(ret=>{
            console.log(ret);
            global.LoginStatus = (ret.username&&ret.password)?true:false;
            if(LoginStatus){
                global.LoginInfo = ret
            }
            setTimeout(function(){
                that.setState({isStart:true});
            },1500);

        });


    }



    render() {
        if(this.state.isStart){
            return (
                <Provider store={store}>
                    <AppWithNavigationState/>
                </Provider>
            );
        }else{
            return (
                <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'orange',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:30}}>爱橙宝车务端</Text>
                </View>
            );
        }

    }
}