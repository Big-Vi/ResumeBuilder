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
import {
  ScrollView,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import NotFoundScreen from './screens/NotFoundScreen';
import ModalScreen from './screens/ModalScreen';
import ResumeScreen from './screens/ResumeScreen';
import CoverLetterScreen from './screens/CoverLetterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Realm = require('realm');
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}> 
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> 
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Resume"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Resume') {
            iconName = focused
              ? 'document'
              : 'document';
          } else if (route.name === 'CoverLetter') {
            iconName = focused ? 'document' : 'document';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <BottomTab.Screen
        name="Resume"
        component={ResumeScreen}
        options={({ navigation }: RootTabScreenProps<'Resume'>) => ({
          title: 'Resume'
        })}
      />
      <BottomTab.Screen
        name="CoverLetter"
        component={CoverLetterScreen}
        options={({ navigation }: RootTabScreenProps<'CoverLetter'>) => ({
          title: 'Cover Letter',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
              <Ionicons name="add" size={20} color="blue" />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
