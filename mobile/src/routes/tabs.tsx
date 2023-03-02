import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Home from '../pages/Home';

const Tabs = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Register' component={Register} />
      <Tabs.Screen name='Profile' component={Profile} />
    </Tabs.Navigator>
  );
}
