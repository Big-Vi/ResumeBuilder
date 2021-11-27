import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {RootTabScreenProps} from '../../types';
import tw from '../../lib/tailwind';
import {Linking} from 'react-native';

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  const handleOpenLink = async url => {
    try {
      await Linking.openURL(url);
    } catch {
      throw new Error('URI cant open:' + url);
    }
  };

  return (
    <View style={tw.style('h-full', 'flex', 'items-center', 'mt-24', 'w-full')}>
      <View style={tw.style('w-full', 'px-4')}>
        <Pressable
          onPress={() => {
            handleOpenLink('https://www.resumeonthefly.com/privacy-policy');
          }}>
          <Text
            style={tw.style('text-lg', 'py-4', 'px-4', 'bg-white', 'w-full')}>
            Privacy Policy
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
