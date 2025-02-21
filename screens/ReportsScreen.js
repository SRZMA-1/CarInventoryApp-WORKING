import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReportsScreen() {
  const [soldCars, setSoldCars] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    loadSoldCars();
  }, []);

  const loadSoldCars = async () => {
    try {
      const carsData = await AsyncStorage.getItem('cars');
      if (carsData) {
        const cars = JSON.parse(carsData);
        const filteredCars = cars.filter(car => car.status === 'Sold' || car.status === 'Awaiting Settlement');
        setSoldCars(filteredCars);

        // Calculate total profit from sold cars
        let profitSum = 0;
        filteredCars.forEach(car => {
          const profit = parseFloat(car.sellingPrice) - parseFloat(car.purchasePrice) - parseFloat(car.repairCosts || 0);
          profitSum += isNaN(profit) ? 0 : profit;
        });

        setTotalProfit(profitSum);
      }
    } catch (error) {
      console.error('Error loading sold cars:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports & Profit Summary</Text>
      
      <Text style={styles.profitText}>Total Profit: £{totalProfit.toFixed(2)}</Text>

      <FlatList
        data={soldCars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carName}>{item.carName}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Profit: £{(item.sellingPrice - item.purchasePrice - (item.repairCosts || 0)).toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  profitText: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: 'green' },
  carItem: { backgroundColor: '#fff', padding: 15, marginVertical: 5, borderRadius: 5 },
  carName: { fontSize: 16, fontWeight: 'bold' },
});
