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
  ListView
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var commonBackgroundImage = require('../images/backgroundImage.jpg');

export default class UserSummary extends Component {
    constructor(props){
        super(props);
    }

    render(){

        var userData = [
            {
                'key': 'UserDetails.FirstName',
                'title': 'First Name',
                'text': this.props.userData['UserDetails.FirstName']
            },
            {
                'key': 'UserDetails.LastName',
                'title': 'Last Name',
                'text': this.props.userData['UserDetails.LastName']
            },
            {
                'key': 'UserID',
                'title': 'UserID',
                'text': this.props.userData['UserID']
            },
            {
                'key': 'UserExpiryDate',
                'title': 'Expiry Date',
                'text': this.props.userData['UserExpiryDate']
            },
            {
                'key': 'UserDetails.CreateDate',
                'title': 'Create Date',
                'text': this.props.userData['UserDetails.CreateDate']
            },
            {
                'key': 'GroupName',
                'title': 'Package',
                'text': this.props.userData['GroupName']
            }
        ];

        content = userData.map((value, index) => {
            return (
                <View key={'main' + index} >
                    <View key={'topLine' + index} style={styles.line}></View>
                    <View key={index} style={styles.secondRow}>
                        <View style={styles.listItemRow}>
                            <View style={styles.listItemCol1}>
                                <View style={styles.roundShapeView}></View>
                            </View>
                            <View style={styles.listItemCol2}>
                                <View style={styles.sublistItemRow1}>
                                    <Text style={styles.listText1}>{value.title} :</Text>
                                </View>
                                <View style={styles.sublistItemRow2}>   
                                    <Text style={styles.listText2}>{value.text}</Text>
                                </View> 
                            </View> 
                        </View>
                    </View>
                    <View key={'bottomLine' + index} style={styles.line}></View>
                </View>    
            )
        });

        return(
            <View>
                <Image  style={styles.backgroundImage} source={commonBackgroundImage} resizeMode="cover">
                        <View style={styles.firstRow}>
                            <TouchableOpacity onPress={ (data) => { Actions.home({userData: this.props.userData}) }}>
                                <Text style={styles.backBtnText}>{'< Back'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.titleText}>Profile</Text>
                        </View>
                        {content}
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
    secondRow:{
        flexDirection: "row",
        justifyContent:'flex-start',
        alignItems:'center',
    },
    line:{
        height:2,
        marginTop:5,
        marginBottom:5,
        marginLeft:15,
        backgroundColor:'white',
        width:deviceWidth - 30
    },
    titleText:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginLeft:(deviceWidth * 30) / 100
    },
    listItemCol1:{
        flexDirection:'column',
        justifyContent:'center'
    },
    listItemCol2:{
        flexDirection:'column'
    },
    sublistItemRow1:{
        flexDirection:'row'

    },
    sublistItemRow2:{
        flexDirection:'row'
    },
    listText1:{
        color:'#B86B08',
        fontSize:15,
        marginLeft:10,
        backgroundColor:'transparent'
    },
    listText2:{
        color:'white',
        fontSize:15,
        marginLeft:10,
        backgroundColor:'transparent'
    },
    listItemRow:{
        flexDirection:'row'
    },
    roundShapeView:{
        flexDirection:'column',
        height:30,
        width:30,
        backgroundColor:'#606060',
        borderRadius:30,
        marginLeft:10
    },
    backBtnText:{
        color:'white',
        fontSize:12,
    }
});