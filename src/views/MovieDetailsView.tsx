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
import {connect, useDispatch} from 'react-redux';
import {FavoriteState} from '../redux/reducers/favoriteReducer';
import {ADD_FAVORITE, REMOVE_FAVORITE} from '../redux/actions/favoriteActions';
import Icon from 'react-native-vector-icons/AntDesign';

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
  favoriteMovies: Movie[];
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
      return {...state, movie: action.payload};
    default:
      return state;
  }
};

const getMovie = async (movieId: string, dispatch: Function) => {
  const movieData = await getMovieById(movieId);
  dispatch({type: 'setMovie', payload: movieData});
};

const mapStateToProps = (state: FavoriteState) => {
  return {
    favoriteMovies: state.favoriteMovies,
  };
};

const MovieDetailsView = ({route, favoriteMovies}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const movieId = route.params.movieId;
  const reduxDispatch = useDispatch();
  let isFavorite = favoriteMovies.find(
    (movie) => movie.id.toString() === movieId,
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getMovie(movieId, dispatch);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [movieId]);

  const toggleFavoriteMovie = () => {
    if (!isFavorite) {
      reduxDispatch({type: ADD_FAVORITE, payload: state.movie});
    } else {
      reduxDispatch({type: REMOVE_FAVORITE, payload: {id: movieId}});
    }
  };

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
          <Pressable onPress={() => toggleFavoriteMovie()}>
            <Icon
              style={styles.favoriButton}
              name={`${isFavorite ? 'heart' : 'hearto'}`}
              size={30}
              color="#00a2ff"
            />
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
    alignSelf: 'center',
    marginVertical: 7,
  },
});

export default connect(mapStateToProps, null)(MovieDetailsView);
