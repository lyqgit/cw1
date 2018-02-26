/**
 * Created by lyq on 2018/2/21.
 */
import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


export default class TaskScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            list:null,
        }
    }

    static navigationOptions = {
        tabBarLabel:'预约任务',
        headerTitle:'预约任务',
        headerLeft:null,
        tabBarIcon:<Image source={require('../../assets/icons/task-management.png')}/>,
    };

    static state = {
        list:'',
    };

    static contextTypes = {
        store:PropTypes.object
    };

    componentWillMount(){

        let token = this.getToken();
        let that = this;
        fetch(testUrl+'/v4/Maint/getbespeak',{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:'openid='+token+'&iscomp=0&region=2&page=0',
        }).then(function(resp){
            // console.log(resp);
            return resp.json();
        }).then(function(body){
            console.log(body);
            that.setState({list:body.data});
        });
    }

    getToken = ()=>{
        return this.context.store.getState().doSkip.token;
        // console.log(this.props.navigation);
        // this.props.navigation.dispatch(doLogin());
    };

    receive = (id)=>{//接收预约任务
        Alert.alert(id)
    };




    render(){
        return (
            <View style={{flex:1}}>
                <Text>任务页面</Text>
                {this.state.list === null
                    ?
                    <View style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                        <View style={{width:SCREEN_WIDTH*0.3,height:SCREEN_HEIGHT*0.15,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator
                                animating={true}
                                size="large"
                            />
                            <Text style={{color:'#ffffff'}}>数据加载中</Text>
                        </View>
                    </View>
                    :
                    <FlatList
                        data={this.state.list}
                        renderItem={({item})=>
                            <View style={{width:SCREEN_WIDTH,flexDirection:'row',alignItems:'center',marginTop:5,borderWidth:1,justifyContent:'space-between',flex:1}}>
                                <View style={{flexDirection:'column',marginLeft:0}}>
                                    <Text>{item.LoginName}</Text>
                                    <Text>{item.FullName}</Text>
                                    <Text>{item.BespeakAddr}</Text>
                                    <Text>{item.WayType === 1?'预约车':'日租车'}</Text>
                                    <Text>{item.CarType === 1?'俩坐车':'四座车'}</Text>
                                    <Text>{item.UsedTime.substring(0,19)}</Text>
                                </View>
                                <TouchableOpacity
                                    style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'red'}}
                                    onPress={()=>this.receive(item.Id)}
                                >
                                    <Text>接收预约任务</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item,index)=>item.Id}
                        style={{flex:1}}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        width:SCREEN_WIDTH/6,
        borderWidth:1,
    }
});
