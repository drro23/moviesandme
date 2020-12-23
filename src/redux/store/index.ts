import {compose, createStore, applyMiddleware} from 'redux';
import {favoriteReducer} from '../reducers/favoriteReducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  favoriteReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
