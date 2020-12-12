import React from 'react';
import {Image, Text, View} from 'react-native';
import { IMAGE_URL } from '@env';
import styles from './styles';

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image
          style={styles.movieImage}
          source={{uri: IMAGE_URL + props.movie.poster_path}}
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
