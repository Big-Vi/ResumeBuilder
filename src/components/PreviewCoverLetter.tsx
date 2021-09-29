import React, { useState } from "react";
import { Overlay, Input, Button } from "react-native-elements";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableHighlight } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function PreviewCoverLetter({ modalVisibleState, clickedCL, setParentState }) {
  const createPDF = async () => {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    alert(file.filePath);
  }
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
          <Text>To {clickedCL[0].salutation}</Text>
          <Text>To {clickedCL[0].intro}</Text>
          <Text>To {clickedCL[0].body}</Text>
          <Text>To {clickedCL[0].closing}</Text>
          <TouchableHighlight onPress={createPDF}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
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