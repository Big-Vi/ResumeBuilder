import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {RootTabScreenProps} from '../../types';
import tw from '../../lib/tailwind';
import {Logout} from '../components/Logout';
import {useAuth} from '../../providers/AuthProvider';

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const {user} = useAuth();
  return (
    <View style={tw.style('h-full', 'flex', 'items-center', 'mt-24', 'w-full')}>
      <View style={tw.style('w-full', 'px-4')}>
        {user ? (
          <Logout />
        ) : (
          <Pressable
            onPress={() => {
              navigation.navigate('AuthView');
            }}>
            <Text
              style={tw.style('text-lg', 'py-4', 'px-4', 'bg-white', 'w-full')}>
              Register
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
