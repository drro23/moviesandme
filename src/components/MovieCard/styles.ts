import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    color: 'white',
    height: 250,
    padding: 5,
    margin: 10,
    flexDirection: 'row',
  },
  movieImage: {
    flex: 1,
    width: 120,
    height: 300,
  },
  movieInfo: {
    flexDirection: 'column',
    flex: 2.5,
    marginLeft: 5,
  },
  movieHeader: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  movieTitle: {
    color: 'white',
    flex: 4,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  voteAverage: {
    color: 'white',
    position: 'absolute',
    right: 0,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  descriptionContainer: {
    marginTop: 5,
    flex: 3,
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  overview: {
    color: 'white',
  },
  releaseContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  releaseDate: {
    color: 'white',
    alignSelf: 'flex-end',
  },
});

export default styles;
