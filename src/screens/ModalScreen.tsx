import * as React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { useCoverLetters } from "@providers/CoverLetterProvider";
import { AddCoverLetter } from "@components/AddCoverLetter";

export default function ModalScreen() {
  const { coverLetters, createCoverLetter } = useCoverLetters();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <AddCoverLetter createCoverLetter={createCoverLetter} />
    </View>
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