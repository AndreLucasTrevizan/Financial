import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthStackProps, SignUpFormData } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';

export default function SignUp() {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthStackProps>>();

  const { signUp } = useAuthContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (data: SignUpFormData) => {
    if (data.name === '' || data.email === '' || data.password === '') {
      Alert.alert('Preencha todos os campos');
      return;
    }

    await signUp(data);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        style={styles.input}
        placeholder='Type your name'
        placeholderTextColor={'#1C1F26'}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Type your email'
        placeholderTextColor={'#1C1F26'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Type your password'
        placeholderTextColor={'#1C1F26'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp({name, email, password})}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('SignIn')}>
        <Text style={styles.signUp}>Do you have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15
  },
  title: {
    fontSize: 30,
    color: '#1C1F26',
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    width: '100%',
    height: 40,
    paddingLeft: 15,
    fontSize: 18,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#1C1F26',
    marginBottom: 15,
    borderRadius: 5
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9E78FE',
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  signUp: {
    color: '#1C1F26',
    marginVertical: 15
  }
});
