import React from 'react';
import { createStackNavigator } from 'react-navigation';

import {SCREEN_NAME, ADD_SCREEN_NAME} from '../things/constants';
import ThingsScreen from '../things/screen';
import ThingsAddScreen from '../things/add';

import StuffNavigator from '../stuff/navigator';

const ThingsStack = createStackNavigator(
  {
    [SCREEN_NAME]: ThingsScreen,
    [ADD_SCREEN_NAME]: ThingsAddScreen,
    ...StuffNavigator,
  },
  {
    headerMode: 'none',
  },
)

export default ThingsStack;
