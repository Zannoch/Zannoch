import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import axios from 'axios';

const RegisterForm = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom wajib diisi');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password dan konfirmasi tidak cocok');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.5:8000/api/register', {
        username,
        password,
      });

      Alert.alert('Sukses', 'Registrasi berhasil. Silakan login.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.response?.data);
      Alert.alert('Gagal', 'Username sudah digunakan atau server error');
    }
  };

  return (
    <View style={styles.background}>
      <BlurView intensity={50} tint="light" style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.inputBox}>
          <FontAwesome name="user" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#333"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputBox}>
          <FontAwesome name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputBox}>
          <FontAwesome name="lock" size={20} color="#333" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#333"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.register}>
            Already have an account? <Text style={styles.registerLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6', 
  },
  container: {
    width: 320,
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    color: '#333',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  register: {
    color: '#333',
    fontSize: 13,
  },
  registerLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
