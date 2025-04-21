import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual TMDb API key

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchDisneyMovies();
  }, []);

  const fetchDisneyMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=2`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Failed to fetch Disney movies:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Disney Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 450,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
