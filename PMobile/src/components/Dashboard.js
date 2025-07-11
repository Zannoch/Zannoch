import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default function Dashboard({ route, navigation }) {
  const { user, token } = route.params;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.welcome}>Selamat datang, {user?.username}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ListJadwal', { token, user })}
        >
          <Text style={styles.buttonText}>Lihat Jadwal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#22c55e' }]}
          onPress={() => navigation.navigate('TambahJadwal', { token, user })}
        >
          <Text style={styles.buttonText}>Tambah Jadwal</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Logout di pojok kanan bawah */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e293b',
    backgroundColor: '#fde047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  welcome: {
    fontSize: 18,
    color: '#334155',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
