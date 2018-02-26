/**
 * Created by lyq on 2018/2/19.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import { doSkip,doDone,doLogin } from '../Action/IntroAction';
import AppIntroSlider from 'react-native-app-intro-slider';
import { storage } from '../Utils/storage';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'Title 1',
        text: '',
        image: require('../../assets/images/bg_screen1.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: '',
        image: require('../../assets/images/bg_screen2.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: '',
        image: require('../../assets/images/bg_screen3.jpg'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];

storage.save({
    key:'introStatus',
    data:{
        introStatus:true,
    }
});



export default class IntroScreen extends React.Component {

    constructor(props){
        super(props);
        if(LoginStatus){
            this.login(LoginInfo.username,LoginInfo.password)
        }else if(IntroStatus){
            this.props.navigation.dispatch(doDone());
        }
    }

    login = (user,pawd)=>{
        // console.log(this.context.store.getState());
        // console.log(this.props.navigation);
        let that = this;
        fetch(testUrl+'/v4/App/appVerify',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:'username='+user+'&password='+pawd,
        }).then(function(resp){
            console.log(user);
            console.log(pawd);
            console.log(resp);
            return resp.json();
        }).then(function(body){
            console.log(body);
            switch(body.result){
                case 1:
                    storage.save({
                        key:'loginInfo',
                        data:{
                            username:user,
                            password:pawd,
                        }
                    });
                    that.props.navigation.dispatch(doLogin(body));
                    break;
                case 0:
                    Alert.alert(body.info);
                    break;
                case 1001:
                    Alert.alert(body.info);
                    break;
                case 101:
                    Alert.alert(body.info);
                    break;
            }
        });

    };

    skipBtn = ()=>{
        console.log('skip');
        this.props.navigation.dispatch(doSkip());
    };

    static navigationOptions = {
        header:null
    };

    doneBtn = ()=>{
        console.log('Done');
        this.props.navigation.dispatch(doDone());
    };
    render() {
        if(LoginStatus){
            return (
                <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'orange',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:30}}>爱橙宝车务端</Text>
                </View>
            );
        }else{
            return (
                <AppIntroSlider
                    slides={slides}
                    onDone={this.doneBtn}
                    onSkip={this.skipBtn}
                    showSkipButton={true}
                />
            );
        }

    }
}