import React from 'react';
import {IMAGE_URL} from '@env';
import {Image, Text, View} from 'react-native';
import {Movie} from '../MovieCard/MovieCard';

type Props = {
  movie?: Movie;
};

const MovieCardDetails = (props: Props) => {
  const movie: Movie | undefined = props.movie ? props.movie : undefined;

  return (
    <View>
      <Image source={{uri: IMAGE_URL + movie?.poster_path}} />
      <Text>{movie?.original_title}</Text>
    </View>
  );
};

export default MovieCardDetails;
