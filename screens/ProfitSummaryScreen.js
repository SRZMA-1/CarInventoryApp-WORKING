import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfitSummaryScreen({ cars }) {
  const soldCars = cars.filter(car => car.status !== 'In Stock');
  const totalProfit = soldCars.reduce((acc, car) => acc + (parseFloat(car.sellingPrice) - parseFloat(car.purchasePrice) - parseFloat(car.repairCosts)), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profit Summary</Text>
      <Text style={styles.totalProfit}>Total Profit: £{totalProfit.toFixed(2)}</Text>
      {soldCars.map((car) => (
        <Text key={car.id} style={styles.carProfit}>
          {car.carName}: £{(parseFloat(car.sellingPrice) - parseFloat(car.purchasePrice) - parseFloat(car.repairCosts)).toFixed(2)}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  totalProfit: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  carProfit: { fontSize: 16, marginTop: 5 },
});
