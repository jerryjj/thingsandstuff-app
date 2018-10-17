import React from 'react';
import { createStackNavigator ,createDrawerNavigator } from 'react-navigation';

import {SCREEN_NAME as SPLASH_SCREEN_NAME} from './features/splash/constants';
import SplashScreen from './features/splash/screen';

import {SCREEN_NAME as LOGIN_SCREEN_NAME} from './features/login/constants';
import LoginScreen from './features/login/screen';

import {SCREEN_NAME as THINGS_SCREEN_NAME} from './features/things/constants';
import ThingsScreen from './features/things/screen';

import {SCREEN_NAME as STUFF_SCREEN_NAME} from './features/stuff/constants';
import StuffScreen from './features/stuff/screen';

import Drawer from './features/drawer';

const DrawerStack = createDrawerNavigator({
  [THINGS_SCREEN_NAME]: ThingsScreen,
  [STUFF_SCREEN_NAME]: StuffScreen,
}, {
  gesturesEnabled: false,
  contentComponent: Drawer,
})
const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none'
})

const LoginStack = createStackNavigator(
  {
    [LOGIN_SCREEN_NAME]: {
      screen: LoginScreen
    },
  },
  {
    headerMode: 'none',
  },
)

const AppStack = createStackNavigator(
  {
    LoginStack: LoginStack,
    MainStack: DrawerNavigation
  },
  {
    headerMode: 'none',
  },
)

const RootStack = createStackNavigator(
  {
    [SPLASH_SCREEN_NAME]: {
      screen: SplashScreen
    },
    AppStack
  },
  {
    initialRouteName: SPLASH_SCREEN_NAME,
    headerMode: 'none',
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
