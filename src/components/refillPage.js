import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  ListView,
  Alert
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import refillVouchers from '../apiUtill/refillApi.js';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var commonBackgroundImage = require('../images/backgroundImage.jpg');
var defaultRefillText = 'Refill';

export default class Refill extends Component {
    constructor(props){
        super(props);
        this.state = {
            voucherData: '',
            refillBtnText: defaultRefillText
        };
        this.refillData = this.refillData.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    refillData(){
        var username = this.props.userData['UserID'];
        var password = this.props.userData['Password'];

        if(this.state.voucherData.length < 16){
            Alert.alert( 'Error', 'Please enter valid number');
        }else{
            var status = 'Loading...';
            this.setState({
                refillBtnText: status
            });
            refillVouchers.refillVoucher(this.state.voucherData, username, password)
            .then((response) => {
                console.log(response);
                if(response.status == 200) {
                    Alert.alert( 'Success', 'Refill voucher successfully.');
                    this.setState({
                        refillBtnText: defaultRefillText
                    });
                }else{
                    Alert.alert( 'Error', 'Something want wrong.');
                    this.setState({
                        refillBtnText: defaultRefillText
                    });
                }
            }).catch((error) => { 
                Alert.alert( 'Error', 'Something want wrong.');
                this.setState({
                    refillBtnText: defaultRefillText
                });
                console.log('from class ', error); 
            });
        }

        
    }

    handleData(value){
        if (/^[0-9]{0,16}$/.test(value)){
            this.setState({ 
                voucherData: value
            });
        }
    }

    render(){
        return(
            <View>
                <Image  style={styles.backgroundImage} source={commonBackgroundImage} resizeMode="cover">
                    <View style={styles.firstRow}>
                        <TouchableOpacity onPress={ (data) => { Actions.home({userData: this.props.userData}) }}>
                            <Text style={styles.backBtnText}>{'< Back'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.titleText}>Refill</Text>
                    </View>
                    <View style={styles.inputs}>
                        <View style={styles.inputsColumn}>
                            <Text style={styles.textLabel}>Voucher Number :</Text>
                            <View style={styles.inputRow}>
                                <TextInput type="text" 
                                    onChangeText={this.handleData.bind(this)} 
                                    style={styles.textInput} 
                                    underlineColorAndroid="transparent" 
                                    maxLength={16}
                                    value={this.state.voucherData} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.refillBtn}>
                            <TouchableOpacity style={styles.refillButton} onPress={this.refillData.bind()}>
                                <Text style={styles.refillText}>{this.state.refillBtnText}</Text>
                            </TouchableOpacity>
                        </View>    
                </Image>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        width: deviceWidth,
        height: deviceHeight
    },
    firstRow:{
        flexDirection: "row",
        backgroundColor:'black',
        marginTop:20,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    titleText:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginLeft:(deviceWidth * 30) / 100
    },
    inputs:{
        flexDirection: "row",
        height: (deviceHeight * 20) / 100
    },
    inputsColumn:{
        flexDirection: "column"
    },
    textLabel:{
        color: 'white',
        marginTop:20,
        marginLeft:(deviceWidth  * 10) / 100,
        backgroundColor:'transparent'
    },
     refillBtn:{
        flexDirection: "row",
        justifyContent:'center',
        alignItems:'center',
    },
    refillButton:{
        height:35,
        width:(deviceWidth * 25) / 100,
        borderWidth: 1,
        borderRadius:10,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    refillText:{
        fontSize:15,
        color:'black',
        fontWeight: 'bold',
    },
    textInput:{
        height:35,
        width: deviceWidth - (deviceWidth * 10) / 100,
        marginRight:(deviceWidth * 5) / 100,
        marginLeft:(deviceWidth * 5) / 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius:10
    },
    inputRow:{
        height: 40,
        width: deviceWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    backBtnText:{
        color:'white',
        fontSize:12,
    }
});