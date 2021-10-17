import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {useResume} from '../../providers/ResumeProvider';
import {ResumeItem} from '../components/Resume/ResumeItem';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResumeScreenIcon from '../../assets/svg/ResumeScreenIcon.svg';

export default function ResumeScreen({
  navigation,
  route,
}: RootTabScreenProps<'Resume'>) {
  const {resumes, createResume} = useResume();

  useEffect(() => {
    if (route.params?.pdfview) {
    }
  }, [route.params]);

  return (
    <View>
      {resumes.length > 0 ? (
        <ScrollView
          style={tw.style('px-4', {
            // 'mt-16': resumes.length > 0,
          })}>
          {resumes.map((resume: any) =>
            resume ? (
              <View style={tw.style('mb-20')} key={`${resume._id[1]}`}>
                <ResumeItem resume={resume} navigation={navigation} />
              </View>
            ) : null,
          )}
        </ScrollView>
      ) : (
        <View style={tw.style('flex', 'justify-center', 'items-center')}>
          <ResumeScreenIcon width={300} height={200} />
          <Text style={tw.style('text-center')}>No resume created yet.</Text>
        </View>
      )}

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
              resumeTitle: 'New resume',
              name: 'Vignesh',
              personalStatement: 'Hardworking',
              email: 'jon@gmail.com',
              mobile: '0342344234',
              visaStatus: 'Citizen',
              location: 'New york',
            });
            // navigation.navigate('NewResume');
          }}>
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
}
