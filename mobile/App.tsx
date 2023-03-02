import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/AuthContext';
import WalletProvider from './src/contexts/WalletContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <WalletProvider>
          <StatusBar backgroundColor='#FFF' barStyle={'dark-content'} />
          <Routes />
        </WalletProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
