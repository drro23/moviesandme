import {Movie} from '../../components/MovieCard/MovieCard';
import {ADD_FAVORITE, REMOVE_FAVORITE} from './../actions/favoriteActions';

export type FavoriteState = {
  favoriteMovies: Movie[];
};

export type FavoriteAction = {
  type: string;
  payload: any;
};

const initialState: FavoriteState = {
  favoriteMovies: [],
};

var removeByAttr = function (arr: Array<any>, attr: string, value: string) {
  for (let i = 0; i < arr.length; i++) {
    console.log('arr attr: ', arr[i][attr]);
    if (
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr].toString() === value
    ) {
      console.log('index removeBy', i);
      arr.splice(i, 1);
      break;
    } else {
      console.log('not found movie');
    }
  }
  console.log('removeBy: ', arr.length);
  return arr;
};

export function favoriteReducer(
  state: FavoriteState = initialState,
  action: FavoriteAction,
): FavoriteState {
  switch (action.type) {
    case ADD_FAVORITE:
      let alreadyExists = false;
      state.favoriteMovies.forEach((el) => {
        if (el.id === action.payload.id) {
          alreadyExists = true;
        }
      });
      return {
        ...state,
        favoriteMovies: alreadyExists
          ? [...state.favoriteMovies]
          : [...state.favoriteMovies, action.payload],
      };
    case REMOVE_FAVORITE:
      let arr_copy = state.favoriteMovies;
      let newFavMovies: Movie[] = removeByAttr(
        arr_copy,
        'id',
        action.payload.id,
      );
      console.log('newFavMovies', newFavMovies.length);
      return {
        ...state,
        favoriteMovies: [...newFavMovies],
      };
    default:
      return state;
  }
}
