import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SingIn/index';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return(
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Screen 
        name="SingIn"
        component={SignIn}
      />
      <Screen 
        name="Home"
        component={Home}
      />
    </Navigator>
  )
}