import React, {useEffect} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Input, Button, Pressable} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../../state';
import {useSelector} from 'react-redux';
import {State} from '../../../state';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

export default function PersonalInfo({
  navigation,
}: RootTabScreenProps<'PersonalInfo'>) {
  const {updateResume} = useResume();
  const dispatch = useDispatch();
  const {setResumeName, setResumePersonalStatement} = bindActionCreators(
    actionCreators,
    dispatch,
  );
  const clickedResume = useSelector(
    (state: State) => state.ResumeReducer.clickedResume,
  );
  const formInputs = useSelector((state: State) => state.ResumeReducer);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: function Header() {
  //       return (
  //         <Text
  //           style={tw.style('flex', 'items-center', 'justify-center')}
  //           onPress={() => {
  //             navigation.goBack();
  //             if (
  //               clickedResume[0].name !== formInputs.name ||
  //               clickedResume[0].personalStatement !==
  //                 formInputs.personalStatement
  //             ) {
  //               updateResume(clickedResume, formInputs);
  //             }
  //           }}>
  //           <Ionicons name="arrow-back" size={26} color="black" />
  //         </Text>
  //       );
  //     },
  //     title: 'Personal Info',
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formInputs]);

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
        <Input
          // style={tw.style('border-b', 'border-gray-500')}
          placeholder="New Resume"
          onChangeText={text => setResumeName(text)}
          autoFocus={true}
          defaultValue={clickedResume[0].name}
        />
        <TextInput
          style={tw.style('border-b', 'border-gray-500')}
          multiline
          numberOfLines={10}
          onChangeText={text => setResumePersonalStatement(text)}
          defaultValue={clickedResume[0].personalStatement}
        />
      </View>
    </View>
  );
}
