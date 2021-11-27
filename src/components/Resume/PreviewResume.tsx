import React, {useEffect} from 'react';
import {Pressable, View, Share, StyleSheet} from 'react-native';
import {RootTabScreenProps} from '../../../types';
import {useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PDFView from 'react-native-view-pdf';
import {RootState} from '../../state/store';

export default function PreviewResume({
  navigation,
}: RootTabScreenProps<'PreviewResume'>) {
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: function Header() {
        return (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </Pressable>
        );
      },
      headerRight: function Header() {
        return (
          <Pressable onPress={() => onShare(clickedResume[0].filePath)}>
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
      title: clickedResume[0].resumeTitle,
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
        {/* Change */}
        <PDFView
          style={styles.pdfview}
          onError={error => console.log('onError', error)}
          onLoad={() => console.log('PDF rendered from url')}
          resource={`${clickedResume[0].resumeTitle}-${clickedResume[0]._id}.pdf`}
          resourceType="file"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pdfview: {
    flex: 1,
  },
});
