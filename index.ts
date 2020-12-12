import {AppRegistry} from 'react-native';
import MainView from './src/views/MainView';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainView);
