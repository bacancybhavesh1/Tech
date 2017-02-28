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
  View
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';

import Login from './components/loginPage';
import Home from './components/homePage';
import UserSummary from './components/userSummaryPage';
import Refill from './components/refillPage';

export default class App extends Component {
    render(){

        const scenes = Actions.create(
            <Scene key="root">
               <Scene key="login"  component={Login} title="Login" hideNavBar={true} initial={true}/>
               <Scene key="home" component={Home} />
               <Scene key="userSummary" component={UserSummary} />
               <Scene key="refill" component={Refill}  hideNavBar={true}/>
            </Scene>
        );

        return(
            <Router scenes={scenes}/>
        )
    }
}