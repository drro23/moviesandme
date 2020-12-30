import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainView from './views/MainView';
import MovieDetailsView from './views/MovieDetailsView';
import FavoriteMoviesView from './views/FavoriteMoviesView';
import {Provider} from 'react-redux';
import store from './redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MainStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MainStack.Screen
        name="Home"
        component={MainView}
        options={{title: 'Search'}}
      />
      <MainStack.Screen
        name="MovieDetails"
        component={MovieDetailsView}
        options={{
          title: 'Movie Details',
        }}
      />
    </MainStack.Navigator>
  );
};

const FavoriteStackScreen = () => {
  return (
    <FavoriteStack.Navigator
      initialRouteName="FavoriteMovies"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <FavoriteStack.Screen
        name="FavoriteMovies"
        component={FavoriteMoviesView}
        options={{title: 'Favorite Movies'}}
      />
      <FavoriteStack.Screen
        name="MovieDetails"
        component={MovieDetailsView}
        options={{
          title: 'Movie Details',
        }}
      />
    </FavoriteStack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{style: {backgroundColor: '#333'}, showLabel: false}}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              size = 30;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                color = focused ? '#00a2ff' : 'white';
              } else if (route.name === 'FavoriteMovies') {
                iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Home" component={MainStackScreen} />
          <Tab.Screen name="FavoriteMovies" component={FavoriteStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
