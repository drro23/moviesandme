import React, {useState, useEffect} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
// import data from '../../helpers/filmsData';
import MovieCard from '../components/MovieCard';
import {Movie} from '../components/MovieCard/MovieCard';
import {getPopularMovies, searchMovie} from '../../API/TMDBApi';

const MainView: () => JSX.Element = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const _getMovies = async () => {
    const moviesData = await getPopularMovies();
    setMovies(moviesData);
  };

  useEffect(() => {
    _getMovies();
  }, []);

  const _search = async (text: string) => {
    if (text.length > 2) {
      const moviesData = await searchMovie(text);
      setMovies(moviesData);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mainView}>
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={(text) => {
                _search(text);
              }}
              style={styles.searchInput}
              placeholder="Search a movie"
              placeholderTextColor="grey"
            />
            <View style={styles.searchButton}>
              <Button title="Search" color="" onPress={() => {}} />
            </View>
          </View>
          <FlatList
            data={movies}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: '#333',
  },
  textStyle: {
    color: 'white',
  },
  searchContainer: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  searchInput: {
    padding: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
  },
  searchButton: {
    padding: 10,
  },
});

export default MainView;
