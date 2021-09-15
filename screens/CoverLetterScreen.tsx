import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootTabScreenProps } from '../types';

export default function CoverLetterScreen({ navigation }: RootTabScreenProps<'CoverLetter'>) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>CoverLetter Screen</Text>
      <Button
        title="Add cover letter"
        onPress={() => navigation.navigate('CoverLetter')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
