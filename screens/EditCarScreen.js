import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function EditCarScreen({ route, navigation }) {
  const { car } = route.params;
  const [carName, setCarName] = useState(car.carName);
  const [status, setStatus] = useState(car.status);

  const handleSaveChanges = () => {
    const updatedCar = { ...car, carName, status };
    navigation.navigate('Inventory', { updatedCar });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Car</Text>

      <Text style={styles.label}>Car Name</Text>
      <TextInput style={styles.input} value={carName} onChangeText={setCarName} />

      <Text style={styles.label}>Car Status</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)} style={styles.picker}>
          <Picker.Item label="In Stock" value="In Stock" color="#000" />
          <Picker.Item label="Sold" value="Sold" color="#000" />
          <Picker.Item label="Awaiting Settlement" value="Awaiting Settlement" color="#000" />
          <Picker.Item label="Archived" value="Archived" color="#000" />
        </Picker>
      </View>

      <Button title="Save Changes" onPress={handleSaveChanges} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#f9f9f9' },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff', height: 50, justifyContent: 'center' },
  picker: { height: 50, color: '#000' }, // Ensures dropdown text is BLACK
});
