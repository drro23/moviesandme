import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

type Item = {
  id: number;
  vote_average: number;
  title: string;
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
};

interface MovieCardProps {
  movie: Item;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          style={styles.movieImage}
          source={{uri: props.movie.poster_path}}
        />
      </View>
      <View style={styles.movieInfo}>
        <View style={styles.movieHeader}>
          <Text style={styles.movieTitle}>{props.movie.title}</Text>
          <Text style={styles.voteAverage}>{props.movie.vote_average}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.overview} numberOfLines={6}>
            {props.movie.overview}
          </Text>
        </View>
        <View style={styles.releaseContainer}>
          <Text style={styles.releaseDate}>
            Get out on {props.movie.release_date}
          </Text>
        </View>
      </View>
    </View>
  );
}
