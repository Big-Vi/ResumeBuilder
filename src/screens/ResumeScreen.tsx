import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Pressable, ScrollView} from 'react-native';
import {useResume} from '../../providers/ResumeProvider';
import {ResumeItem} from '../components/Resume/ResumeItem';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ResumeScreenIcon from '../../assets/svg/ResumeScreenIcon.svg';
import uuid from 'react-native-uuid';

export default function ResumeScreen({
  navigation,
}: RootTabScreenProps<'Resume'>) {
  const {resumes, createResume} = useResume();

  // useEffect(() => {
  //   if (route.params?.pdfview) {
  //   }
  // }, [route.params]);

  return (
    <View style={tw.style('h-full')}>
      {resumes.length > 0 ? (
        <ScrollView
          style={tw.style('px-4', {
            'mt-16': resumes.length > 0,
          })}>
          {resumes.map((resume: any) =>
            resume ? (
              <View style={tw.style('mb-20')} key={`${resume._id}`}>
                <ResumeItem resume={resume} navigation={navigation} />
              </View>
            ) : null,
          )}
        </ScrollView>
      ) : (
        <View
          style={tw.style('flex', 'justify-center', 'items-center', 'h-full')}>
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
          )}
          onPress={() => {
            let id1 = uuid.v4(),
              id2 = uuid.v4();
            createResume({
              resumeTitle: 'New resume',
              name: 'Jon doe',
              personalStatement:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
              email: 'jon@gmail.com',
              mobile: '0342344234',
              visaStatus: 'Citizen',
              location: 'New york',
              customize: {
                template: 'template1',
                font: 'DM Mono',
                color: 'Black',
                lineHeight: '16',
              },
              order: [
                'PersonalInfo',
                'Experiences',
                'Qualifications',
                'Skills',
              ],
              skills:
                '<ul><li>Skill</li><li>Skill</li><li>Skill</li><li>Skill</li><li>Skill</li><li>Skill</li><li>Skill</li></ul>',
              qualifications: {
                id1: {
                  id: id1,
                  title: 'Qualification',
                  institute: 'Institute',
                  location: 'Location',
                  finishedDate: new Date(),
                  order: 0,
                },
                id2: {
                  id: id2,
                  title: 'Qualification',
                  institute: 'Institute',
                  location: 'Location',
                  finishedDate: new Date(),
                  order: 1,
                },
              },
              experiences: {
                id1: {
                  id: id1,
                  title: 'Job title',
                  employer: 'Employer',
                  location: 'Location',
                  fromDate: new Date(),
                  toDate: new Date(),
                  currentlyWorking: false,
                  order: 0,
                  responsibilities:
                    '<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li></ul>',
                },
                id2: {
                  id: id2,
                  title: 'Job title',
                  employer: 'Employer',
                  location: 'Location',
                  fromDate: new Date(),
                  toDate: new Date(),
                  order: 1,
                  currentlyWorking: false,
                  responsibilities:
                    '<ul><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li><li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt ut labore et dolore magna aliqua. </li></ul>',
                },
              },
            });
          }}>
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
    </View>
  );
}
