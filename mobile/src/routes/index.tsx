import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const { signed, loading } = useAuthContext();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={60} color='#9E78FE' />
      </View>
    );
  }
  
  return (
    signed ? <AppRoutes /> : <AuthRoutes />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
