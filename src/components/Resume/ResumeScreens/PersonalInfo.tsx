import React from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../state/store';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import {
  addResumeName,
  addResumeEmail,
  addResumeMobile,
  addResumeVisa,
  addResumeLocation,
  addResumePersonalStatement,
} from '../../../features/resumeSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function PersonalInfo({
  navigation,
}: RootTabScreenProps<'PersonalInfo'>) {
  const {updateResume} = useResume();
  const dispatch = useDispatch();

  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);

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
      <KeyboardAwareScrollView>
        <ScrollView style={tw.style('mt-8')}>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch(addResumeName(text))}
            autoFocus={false}
            defaultValue={clickedResume[0].name}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch(addResumeEmail(text))}
            autoFocus={false}
            defaultValue={clickedResume[0].email}
          />
          <Text>Phone/Mobile</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch(addResumeMobile(text))}
            autoFocus={false}
            defaultValue={clickedResume[0].mobile}
          />
          <Text>visaStatus</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch(addResumeVisa(text))}
            autoFocus={false}
            defaultValue={clickedResume[0].visaStatus}
          />
          <Text>Location</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => dispatch(addResumeLocation(text))}
            autoFocus={false}
            defaultValue={clickedResume[0].location}
          />
          <Text>Personal statement</Text>
          <TextInput
            style={styles.textInput}
            multiline
            autoFocus={false}
            numberOfLines={10}
            onChangeText={text => dispatch(addResumePersonalStatement(text))}
            defaultValue={clickedResume[0].personalStatement}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingTop: 16,
    paddingBottom: 4,
    marginRight: 2,
    marginLeft: 8,
    fontSize: 18,
    marginBottom: 30,
  },
});
