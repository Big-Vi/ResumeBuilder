import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Button, Pressable} from 'react-native';
import {useResume} from '../../providers/ResumeProvider';
import {ResumeItem} from '../components/Resume/ResumeItem';

export default function ResumeScreen({
  navigation,
}: RootTabScreenProps<'Resume'>) {
  const {resumes, createResume} = useResume();
  // console.log(resumes[0]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return (
          <Pressable
            onPress={() => {
              createResume({
                newResumeName: 'New resume',
                newResumePersonalStatement: 'Hardworking bloke',
              });
              // navigation.navigate('NewResume');
            }}>
            <Text>&#x2b;</Text>
          </Pressable>
        );
      },
      title: 'Resume',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      {resumes.map((resume: any) =>
        resume ? (
          <ResumeItem
            key={`${resume._id[1]}`}
            resume={resume}
            navigation={navigation}
          />
        ) : null,
      )}
    </View>
  );
}
