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
import {useResume} from '../../../providers/ResumeProvider';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function EditResume({modalVisibleState, clickedResume}) {
  const {updateResume} = useResume();
  const [newResumeFields] = useState({
    newResumeName: '',
    newResumePersonalStatement: '',
  });
  const [modalVisible, setModalVisible] = useState(modalVisibleState);
  const dispatch = useDispatch();
  const {setEditState, setViewState, setPreviewState} = bindActionCreators(
    actionCreators,
    dispatch,
  );
  const setParentState = () => {
    setEditState(false);
    setPreviewState(false);
    setViewState(true);
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{clickedResume[0].name}</Text>
            <Input
              placeholder="New Cover Letter Name"
              onChangeText={text => (newResumeFields.newResumeName = text)}
              autoFocus={true}
              defaultValue={
                (newResumeFields.newResumeName = clickedResume[0].name)
              }
            />
            <TextInput
              multiline
              numberOfLines={6}
              onChangeText={text =>
                (newResumeFields.newResumePersonalStatement = text)
              }
              style={styles.inputText}
              defaultValue={
                (newResumeFields.newResumePersonalStatement =
                  clickedResume[0].personalStatement)
              }
            />
            <Button
              title="Save"
              onPress={() => {
                setModalVisible(!modalVisible);
                updateResume(clickedResume, newResumeFields);
                setParentState();
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setParentState();
              }}>
              <Text>&#x2715;</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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
