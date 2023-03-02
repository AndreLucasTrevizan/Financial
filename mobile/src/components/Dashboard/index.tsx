import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useWalletContext } from '../../contexts/WalletContext';

export default function Dashboard() {
  const {
    wallet,
    loading
  } = useWalletContext();

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <Text style={styles.username}>Welcome, here is your daily report</Text>
        <TouchableOpacity style={styles.total}>
          {loading && <ActivityIndicator size={20} color='#9E78FE' />}
          {!loading && (
            <>
              <Text>Total in Wallet</Text>
              <Image style={styles.img} source={require('../../assets/total.png')} />
              <Text style={styles.values}>R$ {wallet?.wallet_total.toFixed(2)}</Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.results}>
          <TouchableOpacity style={styles.receipts}>
            {loading && <ActivityIndicator size={20} color='#9E78FE' />}
            {!loading && (
              <>
                <Text>Daily Receipt Total</Text>
                <Image style={styles.img} source={require('../../assets/earning.png')} />
                <Text style={styles.values}>R$ {wallet?.receipts_total.toFixed(2)}</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.expenses}>
            {loading && <ActivityIndicator size={20} color='#9E78FE' />}
            {!loading && (
              <>
                <Text>Daily Expense Total</Text>
                <Image style={styles.img} source={require('../../assets/losing.png')} />
                <Text style={styles.values}>R$ {wallet?.expenses_total.toFixed(2)}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  username: {
    fontSize: 20,
    color: '#1C1E26',
    fontWeight: 'bold',
    marginBottom: 25
  },
  dashboard: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 15
  },
  total: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF0',
    height: 150,
    width: 150,
    marginBottom: 15,
    borderRadius: 5,
  },
  expenses: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 77, 77, 0.3)',
    height: 150,
    width: 150,
    flex: 1,
    borderRadius: 5,
  },
  receipts: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(71, 209, 71, 0.2)',
    height: 150,
    width: 150,
    flex: 1,
    borderRadius: 5,
  },
  markers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1E26'
  },
  values: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  img: {
    width: 50,
    height: 50,
    marginVertical: 15
  }
});
