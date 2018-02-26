/**
 * Created by Administrator on 2018/2/23.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import PropTypes from 'prop-types';

export default class MaintScreen extends Component{

    constructor(props){
        super(props);
        this.props.navigation.setParams({goBack:this.goBack});
    }

    static navigationOptions = ({navigation})=>({
        headerTitle:<TouchableOpacity onPress={()=>navigation.state.params.goBack()}><Image source={require('../../assets/icons/back.png')}/></TouchableOpacity>,
    });

    goBack = ()=>{
        this.props.navigation.navigate('Main');
    };

    static contextTypes = {
        store:PropTypes.object
    };

    render(){
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/icons/account.png')}
                    style={styles.image}
                />
                <View style={styles.row}>
                    <Text>开车门</Text>
                    <Text>关车门</Text>
                    <Text>开始维护</Text>
                    <Text>完成维护</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'orange',
        alignItems:'center'
    },
    row:{
        flexDirection:'row'
    },
    image:{
        marginTop:'10%',
    }
});