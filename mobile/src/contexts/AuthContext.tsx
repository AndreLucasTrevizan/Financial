import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';
import {
  AuthContextData,
  AuthProviderProps,
  SignUpFormData,
  UserData,
  AuthStackProps,
  SignInFormData
} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const signed = !!user;

  const {
    navigate
  } = useNavigation<NativeStackNavigationProp<AuthStackProps>>();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const storage = await AsyncStorage.getItem('@auth.app');

        if (storage) {
          const token = JSON.parse(storage);

          const response = await api.get('/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setUser(response.data);
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          Alert.alert(error.response?.data.error);
          return;
        }

        Alert.alert((error as Error).message);
      }
    }

    loadData();
  }, []);

  async function signIn(data: SignInFormData) {
    try {
      setLoading(true);

      const response = await api.post('/sign_in', data);

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem('@auth.app', JSON.stringify(response.data.token));

      setLoading(false);
      setUser(response.data);
    } catch (error) {
      setLoading(false);
    }
  }

  async function signUp(data: SignUpFormData) {
    try {
      setLoading(true);

      const response = await api.post('/users', data);

      setLoading(false);
      setUser(response.data);
      navigate('SignIn');
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        Alert.alert(error.response?.data.error);
        return;
      }

      Alert.alert((error as Error).message);
    }
  }

  const signOut = async () => {
    await AsyncStorage.removeItem('@auth.app');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      loading,
      user,
      signed,
      signIn,
      signUp,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  );
}
