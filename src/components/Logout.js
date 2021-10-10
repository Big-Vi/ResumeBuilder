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
      style={tw.style('text-xs')}
      onPress={() => {
        Alert.alert('Log Out', null, [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => {
              signOut();
              navigation.navigate('AuthView');
            },
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      }}>
      <Text>Log Out</Text>
    </Pressable>
  );
}
