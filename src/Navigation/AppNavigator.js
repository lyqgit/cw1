/**
 * Created by lyq on 2018/2/19.
 */
import React,{ Component } from 'react';
import { StackNavigator,addNavigationHelpers } from 'react-navigation';
import IntroScreen from '../Screen/IntroScreen';
import LoginScreen from '../Screen/LoginScreen';
import { general } from '../Action/IntroAction';
import Main from './MainNavigator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addListener } from '../Utils/redux';


export const AppNavigator = StackNavigator({
    Intro:{
        screen:IntroScreen,
    },
    Login:{
        screen:LoginScreen
    },
    Main:{
        screen:Main,
        navigationOptions:{
            headerLeft:null
        },
    }
},{
    gesturesEnabled:false
});

class AppWithNavigationState extends Component{

    render(){
        const { dispatch,doSkip } = this.props;
        return(
            <AppNavigator
                navigation = {
                    addNavigationHelpers({
                        dispatch,
                        state:doSkip,
                        addListener
                    })
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    doSkip:state.doSkip,
});

const mapDispatchToProps = (dispatch)=>({
    user:bindActionCreators(general,dispatch),
});

export default connect(mapStateToProps)(AppWithNavigationState);
