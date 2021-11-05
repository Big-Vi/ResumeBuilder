import React, {useState, useEffect} from 'react';
import {Text, Pressable, View, Share} from 'react-native';
import {RootTabScreenProps} from '../../../types';
import {useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PDFView from 'react-native-view-pdf';
import {RootState} from '../../state/store';

export default function PreviewResume({
  navigation,
}: RootTabScreenProps<'PreviewResume'>) {
  const clickedResume = useSelector((state: RootState) =>
    state.resume.clickedResume,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: function Header() {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate('ResumeStack', {
                screen: 'Resume',
                pdfview: true,
              });
            }}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </Pressable>
        );
      },
      headerRight: function Header() {
        return (
          <Pressable onPress={() => onShare(clickedResume.filePath)}>
            <View
              style={tw.style(
                'flex',
                'flex-row',
                'items-end',
                'justify-center',
              )}>
              <Ionicons name="download-outline" size={26} color="black" />
            </View>
          </Pressable>
        );
      },
      title: 'Resume',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShare = async filePath => {
    try {
      const result = await Share.share({
        url: filePath,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <PDFView
          style={{flex: 1}}
          onError={error => console.log('onError', error)}
          onLoad={() => console.log('PDF rendered from url')}
          resource={`${clickedResume.resumeTitle}-${clickedResume._id[1]}.pdf`}
          resourceType="file"
        />
      </View>
    </>
  );
}
