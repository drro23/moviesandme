import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useReducer, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import axios from 'axios';
import {getMovieById} from '../../API/TMDBApi';
import {Movie} from '../components/MovieCard/MovieCard';
import MovieCardDetails from '../components/MovieCardDetails';

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
  //   const [movie, setMovie] = useState<Movie>();
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
      <View>
        <MovieCardDetails movie={state.movie} />
      </View>
    </SafeAreaView>
  );
};

export default MovieDetailsView;
