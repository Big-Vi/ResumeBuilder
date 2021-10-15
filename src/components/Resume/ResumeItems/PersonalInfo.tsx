import React, {useEffect} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Input, Button, Pressable} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useSelector} from 'react-redux';
import {State, actionCreators} from '../../../state';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

export default function PersonalInfo({
  navigation,
}: RootTabScreenProps<'PersonalInfo'>) {
  const {updateResume} = useResume();
  const dispatch = useDispatch();
  const {
    setResumeName,
    setResumeEmail,
    setResumeMobile,
    setResumeVisa,
    setResumeLocation,
    setResumePersonalStatement,
  } = bindActionCreators(actionCreators, dispatch);
  const clickedResume = useSelector(
    (state: State) => state.ResumeReducer.clickedResume,
  );
  const formInputs = useSelector((state: State) => state.ResumeReducer);

  return (
    <View style={tw.style('mt-16', 'px-4')}>
      <View style={tw.style('flex', 'flex-row', 'justify-center')}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            transform: [{translateY: -6}],
          }}
          onPress={() => {
            navigation.goBack();
            if (
              clickedResume[0].name !== formInputs.name ||
              clickedResume[0].email !== formInputs.email ||
              clickedResume[0].mobile !== formInputs.mobile ||
              clickedResume[0].visaStatus !== formInputs.visaStatus ||
              clickedResume[0].location !== formInputs.location ||
              clickedResume[0].personalStatement !==
                formInputs.personalStatement
            ) {
              updateResume(clickedResume, formInputs);
            }
          }}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Text>
        <Text>Personal Info</Text>
      </View>
      <View style={tw.style('mt-8')}>
        <Text>Name</Text>
        <Input
          style={tw.style('py-4')}
          onChangeText={text => setResumeName(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].name}
        />
        <Text>Email</Text>
        <Input
          style={tw.style('py-4', 'lowercase')}
          onChangeText={text => setResumeEmail(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].email}
        />
        <Text>Phone/Mobile</Text>
        <Input
          style={tw.style('py-4')}
          onChangeText={text => setResumeMobile(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].mobile}
        />
        <Text>visaStatus</Text>
        <Input
          style={tw.style('py-4')}
          onChangeText={text => setResumeVisa(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].visaStatus}
        />
        <Text>Location</Text>
        <Input
          style={tw.style('py-4')}
          onChangeText={text => setResumeLocation(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].location}
        />
        <Text>Personal statement</Text>
        <TextInput
          style={tw.style(
            'border-b',
            'py-4',
            'border-gray-500',
            'mx-2',
            'text-lg',
          )}
          multiline
          numberOfLines={10}
          onChangeText={text => setResumePersonalStatement(text)}
          defaultValue={clickedResume[0].personalStatement}
        />
      </View>
    </View>
  );
}
