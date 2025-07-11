import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import axios from 'axios';

const LoginForm = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan Password wajib diisi');
      return;
    }

    try {
      const response = await axios.post('http://172.20.10.5:8000/api/login', {
        username,
        password,
      });

      const { user, token } = response.data;

      console.log('User:', user);
      console.log('Token:', token);

      navigation.navigate('Dashboard', { user, token });

    } catch (error) {
      console.error(error);
      Alert.alert('Login Gagal', 'Username atau password salah');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registrasi');
  };

  return (
    <View style={styles.background}>
      <BlurView intensity={50} tint="light" style={styles.container}>
        <Text style={styles.title}>Login</Text>

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

        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberRow}>
            <Checkbox
              value={remember}
              onValueChange={setRemember}
              color={remember ? '#333' : undefined}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.register}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  container: {
    width: '85%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    color: '#333',
  },
  forgot: {
    color: '#007BFF',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  register: {
    textAlign: 'center',
    color: '#333',
  },
  registerLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
