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
import {Actions, Scene, Router} from 'react-native-router-flux';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var loginBackgroundImage = require('../images/backgroundImage.jpg');
var userSummary = require('../images/home/userSummary.png');
var ourPartner = require('../images/home/ourPartner.png');
var refill = require('../images/home/refill.png');
var language = require('../images/home/language.png');
var logout =require('../images/home/logout.png');

export default class Home extends Component {
	constructor(props){
		super(props);
		console.log('props', this.props.userData);
	}

	render(){
		return(
			<View>
				<Image  style={styles.backgroundImage} source={loginBackgroundImage} resizeMode="cover">
					<View style={styles.titleText}>
						<Text style={styles.titleLable}>Welcome to O3 Telecom App</Text>
					</View>	
					<View style={styles.mainView}>
						<View style={styles.firstColView}>
							<View style={styles.userSummaryView}>
								<TouchableOpacity style={styles.userSummaryTouch}>
									<Image style={styles.userSummaryImage} source={userSummary} resizeMode="cover" />
									<Text style={styles.userSummaryText}>User Summary</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.refillView}>
								<TouchableOpacity style={styles.refillTouch}>
									<Image style={styles.refillImage} source={refill} resizeMode="cover" />
									<Text style={styles.refillText}>Refill</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity style={styles.logoutTouch} onPress={(data) => { Actions.login() }}>
									<Image style={styles.logoutImage} source={logout} resizeMode="cover" />
									<Text style={styles.logoutText}>Log Out</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.secondColView}>
							<View style={styles.ourPartnerView}>
								<TouchableOpacity style={styles.ourPartnerTouch}>
									<Image style={styles.ourPartnerImage} source={ourPartner} resizeMode="cover" />
									<Text style={styles.ourPartnerText}>Our Partner</Text>
								</TouchableOpacity>
							</View>
							<View>
								<TouchableOpacity style={styles.languageTouch}>
									<Image style={styles.languageImage} source={language} resizeMode="cover" />
									<Text style={styles.languageText}>Language</Text>
								</TouchableOpacity>
							</View>
						</View>	
					</View>	
				</Image>
			</View>	
		)
	}
}

const borderRadius = 10;
const styles = StyleSheet.create({
	backgroundImage:{
		width: deviceWidth,
    	height: deviceHeight
	},
	titleText:{
		flexDirection: "row",
		height: (deviceHeight * 30) / 100,
	},
	titleLable:{
		color: 'white',
		fontSize:18,
		position:'absolute',
		top:20,
		right:20,
	},

	mainView:{
		flexDirection: "row",
	},

	firstColView:{
		flexDirection: "column",
		width:(deviceWidth * 45) / 100,
	},
	secondColView:{
		flexDirection: "column",
		marginLeft:10
	},

	// User Summary Start
		userSummaryView:{
			marginBottom:15
		},
		userSummaryTouch:{
			backgroundColor: 'white',
			height:60,
			width:(deviceWidth * 45) / 100,
			marginLeft:10,
			borderRadius:borderRadius,
		},
		userSummaryImage:{
			height:50,
			width:50,
			marginLeft:10
		},
		userSummaryText:{
			color:'black',
			fontSize:13,
			position:'absolute',
			bottom:0,
			left:10
		},
	// User Summary End

	// Refill Start
		refillView:{
			marginBottom:15
		},
		refillTouch:{
			backgroundColor: 'white',
			height:(deviceHeight * 20) / 100,
			width:(deviceWidth * 45) / 100,
			marginLeft:10,
			borderRadius:borderRadius,
			justifyContent:'center',
			alignItems:'center'
		},
		refillImage:{
			height:60,
			width:80,
			marginLeft:10
		},
		refillText:{
			color:'black',
			fontSize:13,
			position:'absolute',
			bottom:0,
			left:10
		},
	// Refill End

	// Logout Start
		logoutTouch:{
			backgroundColor: '#AED16B',
			height:(deviceHeight * 12) / 100,
			width:(deviceWidth * 45) / 100,
			marginLeft:10,
			borderRadius:borderRadius,
			justifyContent:'center',
			alignItems:'flex-start'
		},
		logoutImage:{
			height:35,
			width:45,
			marginLeft:10
		},
		logoutText:{
			color:'black',
			fontSize:13,
			position:'absolute',
			bottom:0,
			left:10,
		},
	// Logout End

	// Our Partner Start
		ourPartnerView:{
			marginBottom:15
		},
		ourPartnerTouch:{
			backgroundColor: 'white',
			height:100,
			width:(deviceWidth * 45) / 100,
			marginLeft:10,
			borderRadius:borderRadius,
			justifyContent:'center',
			alignItems:'flex-start'
		},
		ourPartnerImage:{
			height:60,
			width:80,
			marginLeft:10
		},
		ourPartnerText:{
			color:'black',
			fontSize:13,
			position:'absolute',
			bottom:0,
			left:10
		},
	// Our Partner End

	// Language Start
		languageTouch:{
			backgroundColor: 'white',
			height:(deviceHeight * 25) / 100,
			width:(deviceWidth * 45) / 100,
			marginLeft:10,
			borderRadius:borderRadius,
			justifyContent:'center',
			alignItems:'flex-start'
		},
		languageImage:{
			height:80,
			width:80,
			marginLeft:10
		},
		languageText:{
			color:'black',
			fontSize:13,
			position:'absolute',
			bottom:0,
			left:10
		},
	// Language End

	
});