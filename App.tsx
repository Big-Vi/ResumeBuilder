/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {AuthProvider} from './providers/AuthProvider';
import {Provider} from 'react-redux';
import {store} from './src/state/store';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </Provider>
    </AuthProvider>
  );
};

export default App;
