import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Button} from 'react-native';

export default function NewResumeScreen({
  navigation,
}: RootTabScreenProps<'NewResume'>) {
  return (
    <View>
      <Text>New Resume</Text>
      <Button
        title="Go to Info"
        onPress={() => navigation.navigate('PersonalInfo')}
      />
    </View>
  );
}
