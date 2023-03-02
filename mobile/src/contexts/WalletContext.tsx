import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import React, {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';

import {
  TransactionData,
  TransactionFormData,
  WalletContextData,
  WalletData,
  WalletProviderProps
} from '../types';
import { useAuthContext } from './AuthContext';

export const WalletContext = createContext({} as WalletContextData);

export const useWalletContext = () => {
  return useContext(WalletContext);
};

export default function WalletProvider({ children }: WalletProviderProps) {
  const { user } = useAuthContext();

  const [wallet, setWallet] = useState<WalletData>({
    day: new Date().toLocaleDateString('pt-br'),
    wallet_total: 0,
    receipts_total: 0,
    expenses_total: 0
  });
  const [transactions, setTransactions] = useState<TransactionData[]  | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      try {
        const storage = await AsyncStorage.getItem('@auth.app');

        if (storage) {
          const response = await api.get('/reports/daily', {
            headers: {
              Authorization: `Bearer ${JSON.parse(storage)}`
            }
          });

          setTransactions(response.data);
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          Alert.alert(error.response?.data.error);
          return;
        }
  
        Alert.alert('Erro ao buscar as transações');
        console.log(`Erro ao buscar as transações: ${error}`);
      }
    }

    loadData();
  }, [ user ]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const storage = await AsyncStorage.getItem('@auth.app');

        if (storage) {
          const date = new Date().toLocaleDateString('pt-br');
          
          const response = await api.get('/report', {
            headers: {
              Authorization: `Bearer ${JSON.parse(storage)}`
            },
            params: { day: date }
          });

          setWallet(response.data);
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          Alert.alert(error.response?.data.error);
          return;
        }

        if (error instanceof Error) Alert.alert(error.message);
      }
    }

    loadData();
  }, [ user, transactions ]);

  const handleCreateTransaction = async (data: TransactionFormData) => {
    try {
      const response = await api.post('/billing', {
        amount: Number(data.amount),
        description: data.description,
        day: new Date().toLocaleDateString('pt-br'),
        nature_id: data.nature_id,
      });

      setTransactions(oldValues => [ ...oldValues, response.data ].reverse());
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert(error.response?.data.error);
        return;
      }

      if (error instanceof Error) Alert.alert(error.message);
    }
  };
  
  return (
    <WalletContext.Provider value={{
      wallet,
      transactions,
      loading,
      handleCreateTransaction
    }}>
      { children }
    </WalletContext.Provider>
  );
}
