import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {State} from '../../state';
import {RootTabScreenProps} from '../../../types';
import {useSelector} from 'react-redux';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }
            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, UppLabs!</h1>
    </body>
    </html>
  `;
  const createAndSavePDF = async html => {
    try {
      const {uri} = await Print.printToFileAsync({html});
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View>
        <View>
          <Text>To {clickedResume[0].name}</Text>
          <Text>To {clickedResume[0].personalStatement}</Text>
          <TouchableHighlight onPress={() => createPDF(htmlContent)}>
            <Text>Create PDF</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
