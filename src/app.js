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

export default class App extends Component {
	render(){

		const scenes = Actions.create(
			<Scene key="root">
		       <Scene key="login" initial={true} component={Login} title="Login" hideNavBar={true}/>
		       <Scene key="home" component={Home} />
		    </Scene>
		);

		return(
			<Router scenes={scenes}/>
		)
	}
}