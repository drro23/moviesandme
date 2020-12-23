import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useReducer} from 'react';
import {IMAGE_URL} from '@env';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {getMovieById} from '../../API/TMDBApi';
import {Movie} from '../components/MovieCard/MovieCard';
import {connect} from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
    favorite: state.favorite,
  };
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
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView style={styles.mainDetailsView}>
          <Image
            style={styles.moviePoster}
            source={{uri: IMAGE_URL + state.movie?.poster_path}}
          />
          <Text style={styles.movieTitle}>{state.movie?.original_title}</Text>
          <Pressable onPress={() => console.log('favori pressed')}>
            <Text style={styles.favoriButton}>Favori</Text>
          </Pressable>
          <Text style={styles.overview}>{state.movie?.overview}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#333',
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
  favoriButton: {
    backgroundColor: '#00a2ff',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default connect(mapStateToProps, null)(MovieDetailsView);
