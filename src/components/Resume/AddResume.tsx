import React, {useState} from 'react';
import {Input, Button} from 'react-native-elements';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import {PersonalInfo} from './ResumeItems/PersonalInfo';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function AddResume({createResume, modalVisibleState, navigation}) {
  const [newResumeFields] = useState({
    newResumeName: '',
    newResumePersonalStatement: '',
  });
  const dispatch = useDispatch();
  const {setEditState, setPreviewState} = bindActionCreators(
    actionCreators,
    dispatch,
  );
  const [modalVisible, setModalVisible] = useState(modalVisibleState);
  const setParentState = () => {
    setEditState(false);
    setPreviewState(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View>
            <Text onPress={() => console.log('l')}>Peronal Info</Text>
            <PersonalInfo />
            <Button
              title="Create"
              onPress={() => {
                createResume(newResumeFields);
                setModalVisible(!modalVisible);
                setParentState();
              }}
            />
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                setParentState();
              }}>
              <Text>&#x2715;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>&#x2b;</Text>
      </Pressable>
    </View>
  );
}
