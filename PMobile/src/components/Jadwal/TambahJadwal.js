import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import axios from 'axios';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TambahJadwal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;

  const [namaAgenda, setNamaAgenda] = useState('');
  const [hari, setHari] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');

  // State untuk picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimeRangePickerVisible, setTimeRangePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isPickingStartTime, setIsPickingStartTime] = useState(true);

  // Tampilkan/Hide Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirmDate = (date) => {
    const formatted = date.toISOString().split('T')[0]; // YYYY-MM-DD
    setTanggal(formatted);
    hideDatePicker();
  };

  // Time picker
  const showTimeRangePicker = () => {
    setTimeRangePickerVisible(true);
    setIsPickingStartTime(true);
  };
  const hideTimeRangePicker = () => setTimeRangePickerVisible(false);

  const handleConfirmTime = (time) => {
    const formattedTime = time.toTimeString().slice(0, 5); // "HH:MM"
    if (isPickingStartTime) {
      setStartTime(formattedTime);
      setIsPickingStartTime(false);
    } else {
      setEndTime(formattedTime);
      setWaktu(`${startTime} - ${formattedTime}`);
      hideTimeRangePicker();
    }
  };

  const handleSubmit = async () => {
    if (!namaAgenda || !hari || !tanggal || !waktu) {
      Alert.alert('Peringatan', 'Semua field harus diisi!');
      return;
    }

    const data = {
      namaAgenda,
      day: hari,
      tanggal,
      waktu,
    };

    try {
      await axios.post('http://172.20.10.5:8000/api/jadwal', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert('Sukses', 'Jadwal berhasil ditambahkan');
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error.response?.data);
      Alert.alert('Gagal', 'Terjadi kesalahan saat menambah jadwal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masukkan Jadwal</Text>

      <TextInput
        placeholder="Nama Agenda"
        value={namaAgenda}
        onChangeText={setNamaAgenda}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Hari (contoh: Senin)"
        value={hari}
        onChangeText={setHari}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={{ color: tanggal ? '#000' : '#888' }}>
          {tanggal || 'Pilih Tanggal'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input} onPress={showTimeRangePicker}>
        <Text style={{ color: waktu ? '#000' : '#888' }}>
          {waktu || 'Pilih Jam (HH:MM - HH:MM)'}
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />

      {/* Time Range Picker */}
      <DateTimePickerModal
        isVisible={isTimeRangePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimeRangePicker}
        is24Hour={true}
        headerTextIOS={isPickingStartTime ? "Pilih Jam Mulai" : "Pilih Jam Selesai"}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>TAMBAH JADWAL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1f1f1f',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
