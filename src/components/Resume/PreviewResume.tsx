import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  Share,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {State} from '../../state';
import {RootTabScreenProps} from '../../../types';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
let RNFS = require('react-native-fs');
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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

  const onShare = async url => {
    try {
      const result = await Share.share({
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('ll');
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  const createPDF = async () => {
    let options = {
      html: '<h1>PDF TEST Sample</h1>',
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    await onShare(file.filePath);
  };

  return (
    <>
      <WebView
        source={{
          uri: 'https://en.unesco.org/inclusivepolicylab/sites/default/files/dummy-pdf_2.pdf',
        }}
      />
      <TouchableHighlight onPress={createPDF}>
        <Text>Create PDF</Text>
      </TouchableHighlight>
    </>
  );
  /* <View>
        <View>
          <Text>To {clickedResume[0].name}</Text>
          <Text>To {clickedResume[0].personalStatement}</Text>
          <TouchableHighlight onPress={() => createPDF(htmlContent)}>
            <Text>Create PDF</Text>
          </TouchableHighlight>
        </View>
      </View> */
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
