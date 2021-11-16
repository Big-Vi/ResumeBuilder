import React from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
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
      <ScrollView style={tw.style('mt-8')}>
        <View>
          <Text>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setResumeName(text)}
            autoFocus={false}
            defaultValue={clickedResume[0].name}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setResumeEmail(text)}
            autoFocus={false}
            defaultValue={clickedResume[0].email}
          />
          <Text>Phone/Mobile</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setResumeMobile(text)}
            autoFocus={false}
            defaultValue={clickedResume[0].mobile}
          />
          <Text>visaStatus</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setResumeVisa(text)}
            autoFocus={false}
            defaultValue={clickedResume[0].visaStatus}
          />
          <Text>Location.</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setResumeLocation(text)}
            autoFocus={false}
            defaultValue={clickedResume[0].location}
          />
          {/* <Text>Personal statement</Text>
          <TextInput
            style={styles.textInput}
            multiline
            autoFocus={false}
            numberOfLines={10}
            onChangeText={text => setResumePersonalStatement(text)}
            defaultValue={clickedResume[0].personalStatement}
          /> */}
        </View>
      </ScrollView>
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
