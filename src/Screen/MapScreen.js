/**
 * Created by lyq on 2018/2/21.
 */

import React,{ Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Button,
    Dimensions,
    WebView,
    Platform,
    Modal,
    ActivityIndicator
} from 'react-native';
import { skipToMaint } from '../Action/IntroAction';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import PlusScreen from './PlusScreen';

export default class MapScreen extends Component{

    constructor(props){
        super(props);
        this.props.navigation.setParams({controlLeftDrawer:this.controlLeftDrawer});
        this.props.navigation.setParams({controlRightDrawer:this.controlRightDrawer});
        this.props.navigation.setParams({mapFresh:this.mapFresh});
        this.state={
            leftDrawer:true,
            rightDrawer:true,
            modalIsOpen:false,
            webFresh:true,
        }
    }

    // handleMessage = (e)=>{
    //     console.log(e.nativeEvent.data);
    //     this.props.navigation.navigate('CwMain',{platenumber:e.nativeEvent.data})
    // };

    static navigationOptions =({navigation})=>({
        headerRight:<TouchableOpacity onPress={()=>navigation.state.params.controlRightDrawer()}><Image source={require('../../assets/icons/add.png')}/></TouchableOpacity>,
        headerTitle:<View style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>navigation.state.params.controlLeftDrawer()}><Image source={require('../../assets/icons/Category.png')}/></TouchableOpacity><TouchableOpacity style={{marginLeft:'30%'}} onPress={()=>navigation.state.params.mapFresh()}><Image source={require('../../assets/icons/refresh.png')}/></TouchableOpacity></View>,
        tabBarLabel:'地图',
        tabBarIcon:<Image source={require('../../assets/icons/map.png')}/>,
    });

    static contextTypes = {
        store:PropTypes.object
    };

    mapFresh=()=>{
        let that = this;
        this.setState({webFresh:!this.state.webFresh});
        setTimeout(function(){
            that.setState({webFresh:!that.state.webFresh})
        },1500)
    };

    controlLeftDrawer=()=>{
        // this.setState({leftDrawer:!this.state.leftDrawer});
        // console.log(this.state.leftDrawer);
        user = this.context.store.getState().doSkip;
        this.props.navigation.navigate('DrawerOpen',{fullname:user.fullname,role:user.role===16?'车务':'车务总管'});
        // if(this.state.leftDrawer){
        //     // this._leftDrawer.open();
        //     this.props.navigation.navigate('DrawerOpen');
        // }else{
        //     this._leftDrawer.close();
        //     this.props.navigation.navigate('DrawerClose');
        // }

    };


    controlRightDrawer=()=>{
        this.setState({rightDrawer:!this.state.rightDrawer});
        // console.log(SCREEN_WIDTH);
        if(this.state.rightDrawer){
            this._RightDrawer.open();
        }else{
            this._RightDrawer.close();
        }

    };

    getState = ()=>{
        console.log(this.context.store.getState().doSkip);
        console.log(this.props);
        // console.log(this.props.navigation);
        // this.props.navigation.dispatch(doLogin());
    };

    controlModal=()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen})
    };

    handleMessage = (e)=>{
        console.log(e.nativeEvent.data);
        // this.props.navigation.navigate('Maint');
        this.props.navigation.dispatch(skipToMaint(e.nativeEvent.data))
    };


    render(){
        return (
            <Drawer
                type="overlay"
                ref={(ref)=>this._RightDrawer = ref}
                content={<PlusScreen controlModal={this.controlModal}/>}
                openDrawerOffset={Platform.OS === 'ios'?SCREEN_WIDTH*0.8:SCREEN_WIDTH}
                closedDrawerOffset={Platform.OS === 'ios'?-SCREEN_WIDTH*0.8:0}
                acceptPan={true}
                side="top"
                captureGestures="open"
                initializeOpen={false}
            >
                {this.state.webFresh
                    ?
                <WebView
                    source={{uri:'https://cw.icbqida.com/v4/App/cwmap?token=qida'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    mixedContentMode={"compatibility"}
                    automaticallyAdjustContentInsets={true}
                    onMessage={this.handleMessage}
                />
                    :
                <Modal
                    animationType="fade"
                    onRequestClose={() => {this.onRequestClose()}}
                    transparent={true}
                >
                    <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                        <View style={{width:SCREEN_WIDTH*0.3,height:SCREEN_HEIGHT*0.15,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator
                                animating={true}
                                size="large"
                            />
                            <Text style={{color:'#ffffff'}}>地图重新加载中</Text>
                        </View>
                    </View>
                </Modal>
                }

                <Modal
                    animationType="slide"
                    visible={this.state.modalIsOpen}
                    onRequestClose={() => {this.onRequestClose()}}
                    transparent={true}
                >
                    <View style={{width:SCREEN_WIDTH*0.3,height:SCREEN_HEIGHT*0.5}}>
                        <Text>相机页面</Text>
                        <Button
                            onPress={()=>this.setState({modalIsOpen:!this.state.modalIsOpen})}
                            title="关闭"
                        />
                    </View>
                </Modal>
            </Drawer>
        );
    }

}
