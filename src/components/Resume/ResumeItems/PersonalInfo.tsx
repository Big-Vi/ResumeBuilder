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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: function Header() {
        return (
          <Text
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
            Back
          </Text>
        );
      },
      title: 'PersonalInfo',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formInputs]);

  return (
    <>
      <Input
        placeholder="New Resume"
        onChangeText={text => setResumeName(text)}
        autoFocus={true}
        defaultValue={clickedResume[0].name}
      />
      <TextInput
        multiline
        numberOfLines={10}
        onChangeText={text => setResumePersonalStatement(text)}
        style={styles.inputText}
        defaultValue={clickedResume[0].personalStatement}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 80,
    margin: 12,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
