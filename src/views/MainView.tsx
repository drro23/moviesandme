import React, {useEffect, useReducer} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import {Movie} from '../components/MovieCard/MovieCard';
import {getPopularMovies, searchMovie} from '../../API/TMDBApi';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  MovieDetails: {movieId: string};
};

type MovieDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MovieDetails'
>;

type Props = {
  navigation: MovieDetailsScreenNavigationProp;
};

interface IState {
  movies: Movie[] | undefined;
}

interface IAction {
  type: string;
  payload: Movie[] | undefined;
}

const initialState: IState = {
  movies: undefined,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'setMovies':
      return {movies: action.payload};
    default:
      return state;
  }
};

const MainView = ({navigation}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _getMovies = async () => {
    const moviesData = await getPopularMovies();
    dispatch({type: 'setMovies', payload: moviesData});
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    _getMovies();

    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  const _search = async (text: string) => {
    if (text.length > 2) {
      const moviesData = await searchMovie(text);
      dispatch({type: 'setMovies', payload: moviesData});
    }
  };

  const _displayDetailsForMovie = (movieId: string) => {
    navigation.navigate('MovieDetails', {movieId: movieId});
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
            data={state.movies}
            renderItem={({item}) => (
              <MovieCard
                movie={item}
                displayDetailsForMovie={_displayDetailsForMovie}
              />
            )}
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
