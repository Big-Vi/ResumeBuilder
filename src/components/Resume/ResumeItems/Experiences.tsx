import React from 'react';
import {Text, View, Pressable, ScrollView} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import {RootState} from '../../../state/store';
import {
  addExperience,
  setClickedResume,
  deleteExperience,
} from '../../../features/resumeSlice';
import uuid from 'react-native-uuid';
import ExperienceItem from './ExperienceItem';

export default function Experiences({
  navigation,
}: RootTabScreenProps<'Experiences'>) {
  const {updateResume, findResume} = useResume();
  const dispatch = useDispatch();
  const store = useStore();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);
  const handleDelete = id => {
    dispatch(deleteExperience(id));
    updateResume(clickedResume, store.getState().resume);
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  const handleCreateExp = () => {
    let idNew = uuid.v4();
    let exp = {};
    exp = {
      id: idNew,
      title: 'Full stack developer',
      employer: 'Plato',
      location: 'CHCH',
      fromDate: JSON.stringify(new Date()),
      toDate: JSON.stringify(new Date()),
      currentlyWorking: false,
      responsibilities: ['string', 'string'],
    };
    dispatch(addExperience(exp));
    updateResume(clickedResume, store.getState().resume);
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  return (
    <View style={tw.style('mt-16', 'px-4', 'h-full')}>
      <View style={tw.style('flex', 'flex-row', 'justify-center')}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            transform: [{translateY: -6}],
          }}
          onPress={() => {
            navigation.goBack();
            updateResume(clickedResume, formInputs);
          }}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Text>
        <Text>Experiences</Text>
      </View>
      <ScrollView style={tw.style('mt-8')}>
        {clickedResume[0].experiences.length > 0 &&
          clickedResume[0].experiences.map(experience => {
            return (
              <View key={experience.id} style={tw.style('mb-8')}>
                <ExperienceItem experience={experience} />
                <Text
                  style={tw.style('text-center', 'text-right', 'mt-1')}
                  onPress={() => handleDelete(experience.id)}>
                  <Ionicons name="trash-outline" size={20} color={'black'} />
                </Text>
              </View>
            );
          })}
        <View style={tw.style('flex', 'flex-row', 'justify-end')}>
          <Pressable
            style={tw.style(
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
              handleCreateExp();
            }}>
            <Ionicons name="add" size={20} color={'white'} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
