/**
 * Created by lyq on 2018/2/21.
 */
import React from 'react';
import { TabNavigator,DrawerNavigator } from 'react-navigation';
import MapScreen from '../Screen/MapScreen';
import TaskScreen from '../Screen/TaskScreen';
import MaintScreen from '../Screen/MaintScreen';
import UserInfo from '../Screen/UserInfoScreen';
import TabBarBottom from 'react-navigation/src/views/TabView/TabBarBottom';

const Tab = TabNavigator({
    Map:{
        screen:MapScreen
    },
    Task:{
        screen:TaskScreen
    }
},{
    tabBarPosition:'bottom',
    showIcon:true,
    swipeEnabled:false,
    indicatorStyle:{
        height:0
    },
    tabBarComponent: TabBarBottom
});

const Main = DrawerNavigator({
    Main:{
        screen:Tab,
    },
    Maint:{
        screen:MaintScreen
    }
},{
    contentComponent:props=><UserInfo {...props}/>
});

export default Main;
