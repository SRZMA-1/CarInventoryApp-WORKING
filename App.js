import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './screens/DashboardScreen';
import CarListScreen from './screens/CarListScreen';
import AddCarScreen from './screens/AddCarScreen';
import ServiceRemindersScreen from './screens/ServiceRemindersScreen';
import ReportsScreen from './screens/ReportsScreen';
import EditCarScreen from './screens/EditCarScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CarStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Car List" component={CarListScreen} />
    <Stack.Screen name="Edit Car" component={EditCarScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Cars') iconName = 'car';
            else if (route.name === 'Add Car') iconName = 'add-circle';
            else if (route.name === 'Service') iconName = 'build';
            else if (route.name === 'Reports') iconName = 'bar-chart';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Cars" component={CarStack} />
        <Tab.Screen name="Add Car" component={AddCarScreen} />
        <Tab.Screen name="Service" component={ServiceRemindersScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
