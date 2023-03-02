import { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { api } from '../../services/api';
import { NatureData, PickerProps } from '../../types';

export default function Picker({
  handleSelectNature
}: PickerProps) {
  const [natures, setNatures] = useState<NatureData[] | []>([]);
  const [selectedNature, setSelectedNature] = useState<NatureData | undefined>();

  useEffect(() => {
    async function getNatures() {
      try {
        const response = await api.get('/natures');

        setNatures(response.data);
        setSelectedNature(response.data[0]);
        handleSelectNature(response.data[0]);
      } catch (error) {
        console.log(`Erro ao buscar naturezas`);
        if (error instanceof AxiosError) {
          Alert.alert(error.response?.data.error);
          return;
        }

        if (error instanceof Error) Alert.alert(error.message);
      }
    }

    getNatures();
  },  []);

  const handleChangeNature = () => {
    if (selectedNature?.name === 'receipt') {
      setSelectedNature(natures[1]);
      handleSelectNature(natures[1]);
    } else {
      setSelectedNature(natures[0]);
      handleSelectNature(natures[0]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={selectedNature?.name === 'receipt' ? styles.receipt : styles.picker} onPress={handleChangeNature}>
        <Image style={styles.img} source={require('../../assets/earning.png')} />
        <Text style={styles.text}>Is a Receipt</Text>
      </TouchableOpacity>
      <TouchableOpacity style={selectedNature?.name === 'expense' ? styles.expense : styles.picker} onPress={handleChangeNature}>
        <Image style={styles.img} source={require('../../assets/losing.png')} />
        <Text style={styles.text}>Is an Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: '47.7%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    alignItems: 'center',
  },
  receipt: {
    width: '47.7%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(71, 209, 71, 0.2)'
  },
  expense: {
    width: '47.7%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.3)'
  },
  img: {
    width: 50,
    height: 50,
    marginBottom: 15
  },
  text: {
    fontSize: 18,
    color: '#1C1E26',
    fontWeight: 'bold'
  }
});
