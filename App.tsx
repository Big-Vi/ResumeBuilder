/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
{/* <script src="http://localhost:8097"></script> */}
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { AuthProvider } from "./providers/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
          <Navigation/>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
