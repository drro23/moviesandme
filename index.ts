import {AppRegistry} from 'react-native';
import MainView from './src/views/MainView';
import * as appConfig from './app.json';

AppRegistry.registerComponent(appConfig.name, () => MainView);
