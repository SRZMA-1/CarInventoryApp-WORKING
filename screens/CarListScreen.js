import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CarListScreen({ navigation }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const storedCars = await AsyncStorage.getItem('cars');
      if (storedCars) {
        setCars(JSON.parse(storedCars));
      } else {
        setCars([]); // Ensure it's always an array
      }
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const deleteCar = async (id) => {
    const updatedCars = cars.filter(car => car.id !== id);
    setCars(updatedCars);
    await AsyncStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Edit Car', { car: item })} style={styles.card}>
            {item.images.length > 0 && (
              <Image source={{ uri: item.images[0] }} style={styles.carImage} />
            )}
            <View>
              <Text style={styles.carName}>{item.name}</Text>
              <Text style={styles.details}>Mileage: {item.mileage} miles</Text>
              <Text style={styles.details}>Status: {item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteCar(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F5F5F5' },
  card: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 5 },
  carImage: { width: 100, height: 100, borderRadius: 5, marginRight: 10 },
  carName: { fontWeight: 'bold', fontSize: 18, color: '#333' },
  details: { color: '#555', fontSize: 14 },
  deleteButton: { color: 'red', marginTop: 10 }
});
