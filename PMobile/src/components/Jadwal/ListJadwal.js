import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ListJadwal({ route }) {
  const { token, user } = route.params; // ambil token dan user
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
    Alert.alert('Logout', 'Yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => {
          navigation.navigate('Dashboard', { token, user }); // kirim user dan token kembali ke Dashboard
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.namaAgenda}</Text>
      <Text style={styles.text}>{item.day}, {item.tanggal}</Text>
      <Text style={styles.text}>{item.waktu}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('EditJadwal', { token, dataEdit: item })
          }>
          <Text style={styles.btnText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}>
          <Text style={styles.btnText}>HAPUS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jadwal}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={handleLogout}
      >
        <Text style={styles.fabText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' },
  card: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, color: '#0f172a' },
  text: { color: '#334155', marginBottom: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 10 },
  editBtn: {
    backgroundColor: '#facc15',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  fab: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
