import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainView from './views/MainView';
import MovieDetailsView from './views/MovieDetailsView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={MainView}
          options={{title: 'Search'}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsView}
          options={{title: 'Movie Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
