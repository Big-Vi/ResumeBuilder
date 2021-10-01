import * as React from 'react';
import {Text, Button} from 'react-native';

import {RootTabScreenProps} from '../../types';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ResumeScreen({
  navigation,
}: RootTabScreenProps<'Resume'>) {
  return (
    <SafeAreaView>
      <Text>Resume Scrn</Text>
      <Button
        title="Add resume"
        onPress={() => navigation.navigate('CoverLetter')}
      />
    </SafeAreaView>
  );
}
