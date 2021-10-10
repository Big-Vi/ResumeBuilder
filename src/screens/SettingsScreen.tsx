import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {RootTabScreenProps} from '../../types';
import tw from '../../lib/tailwind';
import {Logout} from '../components/Logout';

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<'Settings'>) {
  return (
    <View style={tw.style('h-full', 'flex', 'items-center', 'justify-center')}>
      <View>
        <Logout />
      </View>
    </View>
  );
}
