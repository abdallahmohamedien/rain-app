import { getWeatherByCity } from '@/api/weather.api';
import { useWeatherStore } from '@/store/weatherStore';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MapPin, Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_KEY = '7754215307e84719877224203262602';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setGlobalWeather = useWeatherStore((state) => state.setWeather);

  useEffect(() => {
    const searchCity = async () => {
      if (search.length < 3) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchCity();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);


  const handleSelectCity = async (cityName: string) => {
    try {
      setLoading(true);

      const data = await getWeatherByCity(cityName);


      setGlobalWeather(data);


      router.push('/');
    } catch (error) {
      console.error("Fetch City Weather Error:", error);
      alert("Failed to get weather for this city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.searchBar}>
          <Search color="#94a3b8" size={20} />
          <TextInput
            placeholder="Search for a city..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            autoFocus={false}
          />
          {loading && <ActivityIndicator size="small" color="#60a5fa" />}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && search.length > 2 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No cities found for {search}</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cityCard}
            onPress={() => handleSelectCity(item.name)}
          >
            <View style={styles.cityInfo}>
              <MapPin color="#60a5fa" size={18} />
              <View>
                <Text style={styles.cityName}>{item.name}</Text>
                <Text style={styles.cityRegion}>{item.region}, {item.country}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  header: { marginBottom: 20 },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  input: { color: '#fff', flex: 1, fontSize: 16 },
  cityCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  cityInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cityName: { color: '#fff', fontSize: 18, fontWeight: '600' },
  cityRegion: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  emptyContainer: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: '#94a3b8', textAlign: 'center', fontSize: 16 }
});