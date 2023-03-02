import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import { TransactionItemProps } from '../../types';

export default function TransactionItem({
  data
}: TransactionItemProps) {
  return (
    <View style={data.nature?.name === 'expense' ? styles.expense : styles.receipt}>
      <Image source={
        data.nature?.name === 'expense' ?
        require('../../assets/losing.png') :
        require('../../assets/earning.png')
      } style={styles.img} />
      <View style={styles.transactionInfo}>
        <Text style={styles.value}>R$ {data.amount.toFixed(2)}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
  },
  receipt: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(71, 209, 71, 0.2)',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
  },
  expense: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.3)',
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 15,
  },
  img: {
    width: 60,
    height: 60,
  },
  transactionInfo: {
    marginLeft: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1E26'
  },
  description: {
    paddingTop: 5,
  }
});
