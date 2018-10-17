import React from 'react';
import { createStackNavigator } from 'react-navigation';

import {SCREEN_NAME, ADD_SCREEN_NAME} from '../stuff/constants';
import StuffScreen from '../stuff/screen';
import StuffAddScreen from '../stuff/add';

const StuffStack = createStackNavigator(
  {
    [SCREEN_NAME]: StuffScreen,
    [ADD_SCREEN_NAME]: StuffAddScreen,
  },
  {
    headerMode: 'none',
  },
)

export default StuffStack;
