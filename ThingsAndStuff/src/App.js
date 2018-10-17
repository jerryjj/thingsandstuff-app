import React from 'react';
import { createSwitchNavigator, createStackNavigator ,createDrawerNavigator } from 'react-navigation';

import {SCREEN_NAME as SPLASH_SCREEN_NAME} from './features/splash/constants';
import SplashScreen from './features/splash/screen';

import {SCREEN_NAME as LOGIN_SCREEN_NAME} from './features/login/constants';
import LoginScreen from './features/login/screen';

import Drawer from './features/drawer';

import {
  Root,
} from 'native-base';

import ThingsStack from './features/things/navigator';

const DrawerStack = createDrawerNavigator({
  ThingsStack: ThingsStack,
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
    MainStack: DrawerNavigation
  },
  {
    headerMode: 'none',
  },
)

const RootStack = createSwitchNavigator(
  {
    [SPLASH_SCREEN_NAME]: {
      screen: SplashScreen
    },
    AppStack,
    LoginStack: LoginStack,
  },
  {
    initialRouteName: SPLASH_SCREEN_NAME,
    headerMode: 'none',
  },
);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <RootStack />
      </Root>
    );
  }
}
