import {API_TOKEN, SEARCH_BASE_URL, MOVIE_BASE_URL} from '@env';
import axios from 'axios';
import {Movie} from '../src/components/MovieCard/MovieCard';

export async function getPopularMovies() {
  let moviesData: Movie[] = [];
  try {
    const res = await axios.get(
      `${MOVIE_BASE_URL}/popular?api_key=${API_TOKEN}`,
    );
    moviesData = res.data.results;
  } catch (error) {
    console.log(error);
  }
  return moviesData;
}

export async function searchMovie(movie: string): Promise<Movie[]> {
  let moviesData: Movie[] = [];
  try {
    const res = await axios.get(
      `${SEARCH_BASE_URL + API_TOKEN}&query=${movie}`,
    );
    moviesData = res.data.results;
  } catch (error) {
    console.log(error);
  }
  return moviesData;
}
