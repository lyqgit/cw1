/**
 * Created by Administrator on 2018/2/22.
 */
import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
} from 'react-native';

export default class UserInfoScreen extends Component{

    static state = {
        fullname:'',
        role:'',
    };


    componentWillMount(){
        let user = this.getUser();
        // console.log(user)
        this.setState({fullname:user.fullname});
        // this.setState({role:user.role});

        this.setState({role:user.role===16?'车务':'车务总管'})

    }

    static contextTypes = {
        store:PropTypes.object
    };

    getUser = ()=>{
        return this.context.store.getState().doSkip;
        // console.log(this.props.navigation);
        // this.props.navigation.dispatch(doLogin());
    };

    render(){
        // console.log(this.state.fullname)
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../assets/icons/account.png')}
                    style={styles.image}
                />
                <View style={styles.row}>
                    <Text>姓名：</Text>
                    <Text>{this.state.fullname}</Text>
                </View>
                <View style={styles.row}>
                    <Text>职务：</Text>
                    <Text>{this.state.role}</Text>
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
        flexDirection:'row',
        padding:30,
    },
    image:{
        marginTop:'10%',
    }
});
