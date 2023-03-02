import React from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Dashboard from '../../components/Dashboard';

export default function Home() {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});
