import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import semua screen
import Login from './src/components/LoginForm/LoginFrom';
import Registrasi from './src/components/LoginForm/Registrasi';
import Dashboard from './src/components/Dashboard';
import ListJadwal from './src/components/Jadwal/ListJadwal';
import TambahJadwal from './src/components/Jadwal/TambahJadwal';
import EditJadwal from './src/components/Jadwal/EditJadwal';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // hilangkan header atas
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrasi" component={Registrasi} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ListJadwal" component={ListJadwal} />
        <Stack.Screen name="TambahJadwal" component={TambahJadwal} />
        <Stack.Screen name="EditJadwal" component={EditJadwal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
