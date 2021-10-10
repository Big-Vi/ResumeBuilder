import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Pressable} from 'react-native';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {transform} from '@babel/core';

export default function NewResumeScreen({
  navigation,
  route,
}: RootTabScreenProps<'NewResume'>) {
  const {name} = route.params;
  return (
    <View style={tw.style('mt-16', 'px-4')}>
      <View style={tw.style('flex', 'flex-row', 'justify-center')}>
        <Pressable
          style={{
            position: 'absolute',
            left: 0,
            transform: [{translateY: -6}],
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Pressable>
        <Text>{name}</Text>
      </View>
      <View style={tw.style()}>
        <Pressable
          style={tw.style(
            'flex',
            'justify-center',
            'h-20',
            'bg-white',
            'mt-4',
            'pl-4',
          )}
          onPress={() => navigation.navigate('PersonalInfo')}>
          <Text>Personal Info</Text>
        </Pressable>
      </View>
    </View>
  );
}
