import React, {useState} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Pressable} from 'react-native';
import {Input, Overlay} from 'react-native-elements';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useSelector} from 'react-redux';
import {State, actionCreators} from '../state';
import {useResume} from '../../providers/ResumeProvider';

export default function NewResumeScreen({
  navigation,
  route,
}: RootTabScreenProps<'NewResume'>) {
  const {updateResume} = useResume();
  const {resumeTitle} = route.params;
  const [titleEdit, setTitleEdit] = useState(false);
  const dispatch = useDispatch();
  const clickedResume = useSelector(
    (state: State) => state.ResumeReducer.clickedResume,
  );
  const formInputs = useSelector((state: State) => state.ResumeReducer);
  const {setResumeTitle} = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <Overlay
        overlayStyle={{width: '90%'}}
        isVisible={titleEdit}
        onBackdropPress={() => {
          setTitleEdit(false);
        }}>
        <View style={tw.style('py-4')}>
          <Input
            style={tw.style('')}
            onChangeText={text => setResumeTitle(text)}
            autoFocus={true}
            defaultValue={clickedResume[0].resumeTitle}
          />
          <Pressable
            style={tw.style('button-outer', 'mt-2', 'pl-2')}
            onPress={() => {
              updateResume(clickedResume, formInputs);
              setTitleEdit(false);
            }}>
            <Text style={tw.style('button-text')}>Save</Text>
          </Pressable>
        </View>
      </Overlay>
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
          <View style={tw.style('flex', 'flex-row', 'items-center')}>
            <Text
              onPress={() => {
                setTitleEdit(true);
              }}>
              <Ionicons name="create" size={26} color="black" />
              {formInputs.resumeTitle}
            </Text>
          </View>
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
    </>
  );
}
