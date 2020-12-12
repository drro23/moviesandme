import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
// import data from '../../helpers/filmsData';
import MovieCard from '../components/MovieCard';
import Search from '../components/Search';

import {API_TOKEN, BASE_URL} from '@env';
import {Movie} from '../components/MovieCard/MovieCard';

const MainView: () => JSX.Element = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const _getMovies = () => {
    const res = fetch(`${BASE_URL}/popular?api_key=${API_TOKEN}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));

    res.then((data) => setMovies(data.results));
  };

  useEffect(() => {
    _getMovies();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mainView}>
          <Search />
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
});

export default MainView;
