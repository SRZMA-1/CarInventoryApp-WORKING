import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddCarScreen({ navigation }) {
  const [car, setCar] = useState({
    name: '',
    mileage: '',
    registration: '',
    price: '',
    status: 'In Stock',
    images: [],
    description: ''
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setCar({ ...car, images: [...car.images, result.assets[0].uri] });
    }
  };

  const saveCar = async () => {
    if (!car.name || !car.mileage) {
      alert('Please fill in all fields');
      return;
    }

    const storedCars = await AsyncStorage.getItem('cars');
    const carList = storedCars ? JSON.parse(storedCars) : [];
    const newCar = { ...car, id: Date.now().toString() };
    carList.push(newCar);
    await AsyncStorage.setItem('cars', JSON.stringify(carList));
    navigation.navigate('Cars');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Car Name</Text>
      <TextInput style={styles.input} placeholder="Enter car name" onChangeText={(text) => setCar({ ...car, name: text })} />

      <Text style={styles.label}>Mileage</Text>
      <TextInput style={styles.input} placeholder="Enter mileage" onChangeText={(text) => setCar({ ...car, mileage: text })} />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} placeholder="Enter price" onChangeText={(text) => setCar({ ...car, price: text })} />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} placeholder="Write description" onChangeText={(text) => setCar({ ...car, description: text })} multiline />

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text>Add Images</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={saveCar} style={styles.saveButton}>
        <Text style={{ color: '#fff' }}>Save Car</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#F5F5F5' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, backgroundColor: '#fff', borderRadius: 5 },
  imageButton: { padding: 10, backgroundColor: '#ddd', alignItems: 'center', marginBottom: 10 },
  saveButton: { padding: 10, backgroundColor: 'blue', alignItems: 'center', borderRadius: 5 }
});
