import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useReducer} from 'react';
import {IMAGE_URL} from '@env';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {getMovieById} from '../../API/TMDBApi';
import {Movie} from '../components/MovieCard/MovieCard';

type RootStackParamList = {
  Home: undefined;
  MovieDetails: {movieId: string};
};

type MovieDetailsRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MovieDetails'
>;

type Props = {
  route: MovieDetailsRouteProp;
  navigation: ProfileScreenNavigationProp;
};

interface IState {
  movie: Movie | undefined;
}

interface IAction {
  type: string;
  payload: Movie | undefined;
}

const initialState: IState = {
  movie: undefined,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'setMovie':
      return {movie: action.payload};
    default:
      return state;
  }
};

const getMovie = async (movieId: string, dispatch: any) => {
  const movieData = await getMovieById(movieId);
  dispatch({type: 'setMovie', payload: movieData});
};

const MovieDetailsView = ({route}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const movieId = route.params.movieId;

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getMovie(movieId, dispatch);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [movieId]);

  return (
    <SafeAreaView>
      {!state.movie ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.mainDetailsView}>
          <Image
            style={styles.moviePoster}
            source={{uri: IMAGE_URL + state.movie?.poster_path}}
          />
          <Text style={styles.movieTitle}>{state.movie?.original_title}</Text>
          <Button title="Favorite" onPress={() => console.log('favori')} />
          <Text style={styles.overview}>{state.movie?.overview}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    color: 'white',
  },
  mainDetailsView: {
    height: '100%',
    backgroundColor: '#333',
  },
  moviePoster: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  movieTitle: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 15,
  },
  overview: {
    color: 'white',
    fontSize: 20,
    lineHeight: 25,
    marginHorizontal: 10,
  },
});

export default MovieDetailsView;
