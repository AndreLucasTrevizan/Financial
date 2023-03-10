import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { AuthStackProps } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackProps>();

export default function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name='SignIn'
        component={SignIn}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name='SignUp'
        component={SignUp}
      />
    </AuthStack.Navigator>
  );
}
