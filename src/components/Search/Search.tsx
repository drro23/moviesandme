import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default function Search() {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search a movie"
        placeholderTextColor="grey"
      />
      <View style={styles.searchButton}>
        <Button title="Search" color="" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  searchInput: {
    padding: 10,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 6,
  },
  searchButton: {
    padding: 10,
  },
});
