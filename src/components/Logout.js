import * as React from 'react';
import {Text, Alert, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../providers/AuthProvider';
import tw from '../../lib/tailwind';

export function Logout() {
  const navigation = useNavigation();
  const {signOut} = useAuth();

  return (
    <Pressable
      style={tw.style('text-lg', 'px-4', 'py-4', 'bg-white', 'w-full', 'mb-4')}
      onPress={() => {
        Alert.alert('Log Out', null, [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => {
              signOut();
              navigation.navigate('ResumeStack');
            },
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      }}>
      <Text style={tw.style('text-lg')}>Log Out</Text>
    </Pressable>
  );
}
