import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, signOut } = useAuthContext();
 
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: user?.avatar }} />
      <Text style={styles.text}>{user?.name}</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.signOut}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },
  text: {
    fontSize: 18,
    marginVertical: 20
  },
  signOut: {
    color: 'rgba(255, 77, 77, 1)',
    fontSize: 18
  }
});
