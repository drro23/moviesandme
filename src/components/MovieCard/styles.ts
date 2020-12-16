import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    color: 'white',
    height: 250,
    margin: 7,
    flexDirection: 'row',
  },
  movieImage: {
    flex: 1,
    width: 120,
    height: 300,
    borderRadius: 15,
  },
  movieInfo: {
    flexDirection: 'column',
    flex: 2.5,
    marginLeft: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  voteAverage: {
    color: 'white',
    position: 'absolute',
    right: 0,
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  descriptionContainer: {
    marginTop: 5,
    flex: 3,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  overview: {
    color: 'white',
    fontSize: 18,
    lineHeight: 25,
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
    fontSize: 15,
  },
});

export default styles;
