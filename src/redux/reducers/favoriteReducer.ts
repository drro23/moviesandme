import {TOGGLE_FAVORITE} from './../actions/favoriteActions';

export type favoriteState = {
  favorite: boolean;
};

export type favoriteAction = {
  type: string;
  payload: object | undefined;
};

export function favoriteReducer(
  state: favoriteState,
  action: favoriteAction,
): favoriteState {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return {...state, favorite: !state.favorite};
    default:
      return state;
  }
}
