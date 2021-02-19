/**
 * @format
 */

import * as React from 'react'
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppRegistry} from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';

export default function Main() {
    return (
      <PaperProvider
      settings={{
        icon: props => <Ionicons {...props} />,
      }}
      >
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
