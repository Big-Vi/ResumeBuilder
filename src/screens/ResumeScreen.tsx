import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Button, Pressable, ScrollView} from 'react-native';
import {useResume} from '../../providers/ResumeProvider';
import {ResumeItem} from '../components/Resume/ResumeItem';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResumeScreenIcon from '../../assets/svg/ResumeScreenIcon.svg';

export default function ResumeScreen({
  navigation,
}: RootTabScreenProps<'Resume'>) {
  const {resumes, createResume} = useResume();
  return (
    <View>
      <View
        style={tw.style('h-full', 'px-4', {
          'justify-center': resumes.length <= 0,
          'mt-16': resumes.length > 0,
        })}>
        {resumes.length > 0 ? (
          resumes.map((resume: any) =>
            resume ? (
              <ResumeItem
                key={`${resume._id[1]}`}
                resume={resume}
                navigation={navigation}
              />
            ) : null,
          )
        ) : (
          <View style={tw.style('flex', 'justify-center', 'items-center')}>
            <ResumeScreenIcon width={300} height={200} />
            <Text style={tw.style('text-center')}>No resume created yet.</Text>
          </View>
        )}
      </View>
      <View>
        <Pressable
          style={tw.style(
            'absolute',
            'right-6',
            'bottom-8',
            'text-lg',
            'bg-red-500',
            'w-12',
            'h-12',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
            {'bottom-40': resumes.length > 0},
          )}
          onPress={() => {
            createResume({
              newResumeName: 'New resume',
              newResumePersonalStatement: 'Hardworking bloke',
            });
            // navigation.navigate('NewResume');
          }}>
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
}
