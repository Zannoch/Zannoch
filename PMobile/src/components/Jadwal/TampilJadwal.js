import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function TampilJadwal({ route }) {
  const { token } = route.params;
  const [jadwal, setJadwal] = useState([]);
  const navigation = useNavigation();

  const fetchJadwal = async () => {
    try {
      const res = await axios.get('http://172.20.10.5:8000/api/jadwal', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJadwal(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchJadwal);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus jadwal ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://172.20.10.5:8000/api/jadwal/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchJadwal();
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Kembali',
        style: 'destructive',
        onPress: () => {
          // Arahkan kembali ke halaman login
          navigation.replace('Login');
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.namaAgenda}</Text>
      <Text style={styles.text}>{item.day}, {item.tanggal}</Text>
      <Text style={styles.text}>{item.waktu}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditJadwal', { token, dataEdit: item })
          }>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tombol Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Tombol Tambah */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TambahJadwal', { token })}>
        <Text style={styles.buttonText}>+ Tambah Jadwal</Text>
      </TouchableOpacity>

      <FlatList
        data={jadwal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 10 },
  item: { backgroundColor: '#1e293b', padding: 10, marginVertical: 5, borderRadius: 10 },
  text: { color: '#fff' },
  buttonContainer: { flexDirection: 'row', marginTop: 10 },
  editButton: { backgroundColor: 'blue', padding: 8, marginRight: 10, borderRadius: 6 },
  deleteButton: { backgroundColor: 'red', padding: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#22c55e',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#f43f5e',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
