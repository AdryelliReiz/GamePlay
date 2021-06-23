import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { SignIn } from '../screens/SingIn/index';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return(
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
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