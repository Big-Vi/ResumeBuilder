import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableHighlight,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {State} from '../../state';
import {RootTabScreenProps} from '../../../types';
import {useSelector} from 'react-redux';

// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export default function PreviewResume({
  navigation,
}: RootTabScreenProps<'PreviewResume'>) {
  const clickedResume = useSelector(
    (state: State) => state.ResumeReducer.clickedResume,
  );
  console.log(clickedResume[0].name);
  const createPDF = async () => {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
  };

  return (
    <View>
      <View>
        <View>
          <Text>To {clickedResume[0].name}</Text>
          <Text>To {clickedResume[0].personalStatement}</Text>
          <TouchableHighlight onPress={createPDF}>
            <Text>Create PDF</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
