import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { RootTabScreenProps } from '../../types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ResumeScreen({ navigation }: RootTabScreenProps<'Resume'>) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Resume Scrn</Text>
      <Button
        title="Add resume"
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
