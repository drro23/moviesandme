import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import data from '../../helpers/filmsData';
import MovieCard from '../components/MovieCard';

import Search from '../components/Search';

const MainView: () => JSX.Element = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mainView}>
          <Search />
          <FlatList
            data={data}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id}
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
  textStyle: {
    color: 'white',
  },
});

export default MainView;
