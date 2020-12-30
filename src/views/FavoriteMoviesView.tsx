import React from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MovieCard from '../components/MovieCard';
import {Movie} from '../components/MovieCard/MovieCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {FavoriteState} from '../redux/reducers/favoriteReducer';

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
  favoriteMovies: Movie[];
};

const mapStateToProps = (state: FavoriteState) => {
  return {
    favoriteMovies: state.favoriteMovies,
  };
};

const FavoriteMoviesView = ({navigation, favoriteMovies}: Props) => {
  const _displayDetailsForMovie = (movieId: string) => {
    navigation.navigate('MovieDetails', {movieId: movieId});
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mainView}>
          <FlatList
            data={favoriteMovies}
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
});

export default connect(mapStateToProps, null)(FavoriteMoviesView);
