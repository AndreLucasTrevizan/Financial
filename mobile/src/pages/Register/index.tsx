import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';

import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Picker from '../../components/Picker';
import TransactionItem from '../../components/TransactionItem';
import { useWalletContext } from '../../contexts/WalletContext';
import { api } from '../../services/api';
import { NatureData, TransactionData } from '../../types';

export default function Register() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedNature, setSelectedNature] = useState<NatureData | undefined>();
  const [loading, setLoading] = useState(false);

  const { transactions, handleCreateTransaction } = useWalletContext();

  const handleSelectNature = (nature: NatureData) => {
    setSelectedNature(nature);
  };

  const handleCreatingTransaction = async () => {
    setLoading(true);

    if (amount === '' || description === '') {
      setLoading(false);
      return;
    }

    try {
      await handleCreateTransaction({
        amount: Number(amount),
        description,
        nature_id: String(selectedNature?.id),
        day: new Date(Date.now() - 60 * 60 * 1000 * 3).toLocaleDateString('pt-br'),
      });

      setAmount('');
      setDescription('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder='Type the value'
        keyboardType='numeric'
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <TextInput
        placeholder='Type the description'
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Picker handleSelectNature={handleSelectNature} />
      <TouchableOpacity style={styles.button} onPress={handleCreatingTransaction}>
        {loading ? (
            <ActivityIndicator color='#FFF' size={18} />
        ) : (
          <Text style={styles.buttonText}>Confirm Transaction</Text>
        )}
      </TouchableOpacity>
      {transactions.length > 0 && <Text style={styles.subTitle}>Daily Transactions</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<TransactionItem data={item} />)}
        ListEmptyComponent={() => (<Text style={styles.emptyText}>You don't have transactions today</Text>)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  input: {
    height: 40,
    paddingLeft: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginBottom: 15,
    borderRadius: 5
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#9E78FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3',
    paddingTop: 15
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 15
  }
});
