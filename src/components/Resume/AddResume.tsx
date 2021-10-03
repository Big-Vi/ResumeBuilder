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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.slideButton} onPress={() => console.log('l')}>
              Peronal Info
            </Text>
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
      <Pressable style={[styles.button]} onPress={() => setModalVisible(true)}>
        <Text>&#x2b;</Text>
      </Pressable>
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
  slideButton: {
    width: '90%',
    padding: 15,
    backgroundColor: 'black',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '100%',
    height: '100%',
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
