import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function EditCoverLetter({ updateCoverLetter, modalVisibleState, clickedCL, setParentState }) {
  const [newCoverLetterFields, setNewCoverLetterFields] = useState({
    newCoverLetterName: "",
    newCoverLetterSalutation: "",
    newCoverLetterIntro: "",
    newCoverLetterBody: "",
    newCoverLetterClosing: "",
    newCoverLetterSignature: ""
  });
  const [modalVisible, setModalVisible] = useState(modalVisibleState);
  return (
    <View>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{ clickedCL[0].name }</Text>
          <Input
            placeholder="New Cover Letter Name"
            onChangeText={(text) => newCoverLetterFields.newCoverLetterName = text}
            autoFocus={true}
            defaultValue={newCoverLetterFields.newCoverLetterName = clickedCL[0].name}
          />
          <Input
            placeholder="Salutation"
            onChangeText={(text) => newCoverLetterFields.newCoverLetterSalutation = text}
            autoFocus={true}
            defaultValue={newCoverLetterFields.newCoverLetterSalutation = clickedCL[0].salutation}
          />
          <TextInput
            multiline
            numberOfLines={6}
            onChangeText={text => newCoverLetterFields.newCoverLetterIntro = text}
            style={styles.inputText}
            defaultValue={newCoverLetterFields.newCoverLetterIntro = clickedCL[0].intro}
          />
          <TextInput
            multiline
            numberOfLines={10}
            onChangeText={text => newCoverLetterFields.newCoverLetterBody = text}
            style={styles.inputText}
            defaultValue={newCoverLetterFields.newCoverLetterBody = clickedCL[0].body}
          />
          <TextInput
            multiline
            numberOfLines={6}
            onChangeText={text => newCoverLetterFields.newCoverLetterClosing = text}
            style={styles.inputText}
            defaultValue={newCoverLetterFields.newCoverLetterClosing = clickedCL[0].closing}
          />
          <Input
            placeholder="Signature"
            onChangeText={(text) => newCoverLetterFields.newCoverLetterSignature = text}
            autoFocus={true}
            defaultValue={newCoverLetterFields.newCoverLetterSignature = clickedCL[0].signature}
          />
          <Button
            title="Save"
            onPress={() => {
              setModalVisible(!modalVisible);
              updateCoverLetter(clickedCL, newCoverLetterFields);
              setParentState()
            }}
          />
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setParentState()
              }}
            >
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
    width: '90%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});