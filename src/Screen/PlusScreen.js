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
    Button,
    Alert
} from 'react-native';

export default class PlusScreen extends Component{



    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.props.controlModal}
                    style={styles.row}
                >
                    <Image
                        source={require('../../assets/icons/camera.png')}
                    />
                    <Text style={styles.test}>扫码</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#c6d2c2',
        alignItems:'center',
        width:'30%',
        marginLeft:'70%'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:'10%',
        backgroundColor:'red'
    },
    test:{
        marginLeft:'10%'
    }
});
