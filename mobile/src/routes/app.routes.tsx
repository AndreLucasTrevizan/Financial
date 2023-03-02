import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Home from '../pages/Home';

import Feather from '@expo/vector-icons/Feather';

const Tabs = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: '#FFF',
        tabBarActiveTintColor: '#9E78FE',
        tabBarInactiveTintColor: '#1C1E26',
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({size, color, focused}) => {
            return <Feather name='home' size={size} color={focused ? '#9E78FE' : '#1C1E26'} />
          },
        }}
      />
      <Tabs.Screen
        name='Register'
        component={Register}
        options={{
          title: 'Transactions',
          tabBarIcon: ({size, color, focused}) => {
            return <Feather name='list' size={size} color={focused ? '#9E78FE' : '#1C1E26'} />
          }
        }}
      />
      <Tabs.Screen
        name='Profile'
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({size, color, focused}) => {
            return <Feather name='user' size={size} color={focused ? '#9E78FE' : '#1C1E26'} />
          }
        }}
      />
    </Tabs.Navigator>
  );
}
