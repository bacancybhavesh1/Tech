/**
 * Tech App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  WebView,
  Linking,
  Alert
} from 'react-native';
import Users from '../apiUtill/userApi.js';
import CheckBox from 'react-native-check-box';
import {Actions, Scene, Router} from 'react-native-router-flux';
import parse from 'xml-parser';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var loginBackgroundImage = require('../images/backgroundImage.jpg');
var loginImage = require('../images/loginImage.jpg');
var twitter = require('../images/twitter.png');
var facebook = require('../images/facebook.png');
var youtube = require('../images/youtube.png');
var mail = require('../images/mail.jpeg');
var defaultSigninText = 'Sign in';
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            media: (<View></View>),
            signInBtn: defaultSigninText
        };
        this.signIn = this.signIn.bind(this);
        this.signInWith = this.signInWith.bind(this);
    }

    signIn(){

        if(!this.state.username){
            Alert.alert( 'Error', 'Please enter username');
        }else if(!this.state.password){
            Alert.alert( 'Error', 'Please enter password');
        }else {
            var status = 'Loading...';
            this.setState({
                signInBtn: status
            });
            Users.signIn(this.state.username, this.state.password).then((response) => {
                if(response.status == 200) {
                    var userData = {};
                    var result = parse(response._bodyText);
                    result.root.children.map((main, index) => {
                        main.children.map((td, index) => {
                            userData[td.attributes.fieldName.replace('Users.', '')] = (td.content != undefined) ? td.content : ''
                        });
                    }); 
                    Alert.alert( 'Success', 'Login success');
                    Actions.home({userData: userData});
                    this.setState({
                        signInBtn: defaultSigninText
                    });
                }else{
                    Alert.alert( 'Error', 'Invalid Username or password');
                    this.setState({
                        signInBtn: defaultSigninText
                    });
                }
            }).catch((error) => { 
                Alert.alert( 'Error', 'Something want wrong');
                console.log('from class ', error); 
                this.setState({
                    signInBtn: defaultSigninText
                });
            });
        }    
    }

    signInWith(mediaType){
        var openURL;
        switch(mediaType){
            case 'twitter':
                openURL = 'https://twitter.com/';
                break;
            case 'facebook':
                openURL = 'https://www.facebook.com/';
                break;
            case 'youtube':
                openURL = 'https://www.youtube.com/';
                break;
            case 'mail':
                openURL = 'https://www.google.com/gmail/';
                break;
        }
        var browserData = (
            <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ openURL }}
                onNavigationStateChange={(event) => {
                  if (event.url !== openURL) {
                    this.webview.stopLoading();
                    Linking.openURL(openURL);
                  }
                }}
              />
        );
        this.setState({
            media: browserData
        });
    }
    
    remindedMe(){
    }

    render(){
        return(
            <View>
                <Image  style={styles.backgroundImage} source={loginBackgroundImage} resizeMode="cover">
                    <View style={styles.imageIcon}>
                        <View style={styles.imageRow}>
                            <Image  style={styles.loginImage} source={loginImage} resizeMode="cover" />
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <View style={styles.inputsColumn}>
                            <Text style={styles.textLabel}>Username:</Text>
                            <View style={styles.inputRow}>
                                <TextInput type="text" 
                                    onChangeText={(username) => this.setState({username})} 
                                    style={styles.textInput} 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.username} />
                            </View>
                            <Text style={styles.textLabel}>Password:</Text>
                            <View style={styles.inputRow}>
                                <TextInput type="text" 
                                    style={styles.textInput} 
                                    onChangeText={(password) => this.setState({password})} 
                                    secureTextEntry={true} 
                                    value={this.state.password} />
                            </View>
                        </View> 
                    </View>
                    <View style={styles.remindedMe}>
                        <CheckBox
                            style={{flex: 1, marginLeft: 25}}
                            onClick={this.remindedMe}
                            isChecked={true}
                            rightText={'Reminded me'}
                            rightTextStyle={{color: 'white'}}
                        />
                    </View>
                    <View style={styles.signInBtn}>
                        <TouchableOpacity style={styles.signInButton} onPress={this.signIn.bind()}>
                            <Text style={styles.signInText}>{this.state.signInBtn}</Text>
                        </ TouchableOpacity>
                    </View>
                    <View style={styles.signInWiths}>
                        <TouchableOpacity onPress={this.signInWith.bind(this, 'twitter')}>
                            <Image style={styles.signInWith} source={twitter} resizeMode="cover" />
                        </ TouchableOpacity>

                        <TouchableOpacity onPress={this.signInWith.bind(this, 'facebook')}>
                            <Image style={styles.signInWith} source={facebook} resizeMode="cover" />
                        </ TouchableOpacity>

                        <TouchableOpacity onPress={this.signInWith.bind(this, 'youtube')}>
                            <Image style={styles.signInWith} source={youtube} resizeMode="cover" />
                        </ TouchableOpacity>
                        
                        <TouchableOpacity onPress={this.signInWith.bind(this, 'mail')}>
                            <Image style={styles.signInWith} source={mail} resizeMode="cover" />
                        </ TouchableOpacity>
                    </View>
                </Image>
                {this.state.media}
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    imageIcon:{
        flexDirection: "row",
        height: (deviceHeight * 40) / 100,
        justifyContent:'center',
        alignItems:'center'
    },
    inputs:{
        flexDirection: "row",
        height: (deviceHeight * 20) / 100
    },
    inputsColumn:{
        flexDirection: "column"
    },
    signInBtn:{
        flexDirection: "row",
        justifyContent:'center',
        alignItems:'center',
        height: (deviceHeight * 10) / 100
    },
    remindedMe:{
        flexDirection: "row",
        alignItems:'center',
        height: (deviceHeight * 10) / 100
    },
    signInWiths:{
        flexDirection: "row",
        justifyContent:'center',
        alignItems:'center',
        height: (deviceHeight * 10) / 100
    },
    signInWith:{
        width:35,
        height:35,
        borderWidth:1,
        borderRadius:7,
        marginLeft:10,
        marginRight:10
    },
    signInButton:{
        height:35,
        width:(deviceWidth * 25) / 100,
        borderWidth: 1,
        borderRadius:10,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    signInText:{
        fontSize:15,
        color:'black',
        fontWeight: 'bold',
    },
    imageRow:{
        flexDirection: "row",
        justifyContent:'center',
        alignItems:'center'
    },
    loginImage:{
        height: (deviceHeight * 25) / 100,
        width:(deviceWidth * 50) / 100
    },
    backgroundImage:{
        width: deviceWidth,
        height: deviceHeight
    },
    textLabel:{
        color: 'white',
        marginLeft:25,
        backgroundColor:'transparent'
    },
    inputRow:{
        height: 40,
        width: deviceWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        height:35,
        marginRight:(deviceWidth * 5) / 100,
        marginLeft:(deviceWidth * 5) / 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius:10
    }
});