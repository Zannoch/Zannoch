import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditJadwal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token, dataEdit } = route.params;

  const [namaAgenda, setNamaAgenda] = useState('');
  const [hari, setHari] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');

  useEffect(() => {
    if (dataEdit) {
      setNamaAgenda(dataEdit.namaAgenda);
      setHari(dataEdit.day);
      setTanggal(dataEdit.tanggal);
      setWaktu(dataEdit.waktu);
    }
  }, [dataEdit]);

  const handleUpdate = async () => {
    if (!namaAgenda || !hari || !tanggal || !waktu) {
      Alert.alert('Peringatan', 'Semua field harus diisi');
      return;
    }

    const payload = {
      namaAgenda,
      day: hari,
      tanggal,
      waktu,
    };

    try {
      await axios.put(`http://172.20.10.5:8000/api/jadwal/${dataEdit.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Sukses', 'Jadwal berhasil diperbarui');
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Gagal', 'Gagal memperbarui jadwal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Jadwal</Text>

      <TextInput
        placeholder="Nama Agenda"
        value={namaAgenda}
        onChangeText={setNamaAgenda}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Hari"
        value={hari}
        onChangeText={setHari}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Tanggal"
        value={tanggal}
        onChangeText={setTanggal}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Waktu (contoh: 08:00 - 10:00)"
        value={waktu}
        onChangeText={setWaktu}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>SIMPAN PERUBAHAN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f1f5f9' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1e293b',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
