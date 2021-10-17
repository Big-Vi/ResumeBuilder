import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {ActionSheet} from './ActionSheet';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import tw from '../../../lib/tailwind';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useResume} from '../../../providers/ResumeProvider';
import PDFView from 'react-native-view-pdf';

interface IProps {
  resume: {
    _id: string;
    resumeTitle: string;
    personalStatement: string;
    filePath: string;
  };
  navigation: any;
}

export const ResumeItem: React.FC<IProps> = ({navigation, resume}) => {
  const {deleteResume, findResume} = useResume();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const actions = [
    {
      title: 'Delete',
      action: () => {
        deleteResume(resume);
      },
    },
    {
      title: 'Edit',
      action: () => {
        editResumeItem(resume);
      },
    },
    {
      title: 'Preview',
      action: () => {
        previewResumeItem(resume);
      },
    },
  ];

  const dispatch = useDispatch();
  const {
    setClickedResume,
    setResumeTitle,
    setResumeEmail,
    setResumeMobile,
    setResumeVisa,
    setResumeLocation,
    setResumeName,
    setResumePersonalStatement,
  } = bindActionCreators(actionCreators, dispatch);

  const editResumeItem = resume => {
    let RESUME = findResume(resume._id[1]);
    setClickedResume(RESUME);
    setResumeTitle(RESUME[0].resumeTitle);
    setResumeName(RESUME[0].name);
    setResumeEmail(RESUME[0].email);
    setResumeMobile(RESUME[0].mobile);
    setResumeVisa(RESUME[0].visaStatus);
    setResumeLocation(RESUME[0].location);
    setResumePersonalStatement(RESUME[0].personalStatement);
    navigation.navigate('NewResume', {
      resumeTitle: RESUME[0].resumeTitle,
    });
  };

  const previewResumeItem = resume => {
    setClickedResume(resume);
    navigation.navigate('PreviewResume');
  };

  

  return (
    <View style={tw.style({height: 453})}>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />
      <PDFView
        style={{flex: 1}}
        onError={error => console.log('onError', error)}
        onLoad={() => console.log('PDF rendered from url')}
        resource={`${resume.resumeTitle}-${resume._id[1]}.pdf`}
        resourceType="file"
      />
      <Pressable
        style={tw.style(
          'w-full',
          'justify-center',
          'flex',
          'mb-4',
          'absolute',
          'top-0',
          'left-0',
          'items-center',
          'bg-transparent',
          {height: 500},
        )}
        key={resume._id[1]}
        onPress={() => {
          setActionSheetVisible(true);
        }}>
        <View
          style={tw.style(
            'absolute',
            'bottom-0',
            'left-0',
            'flex',
            'justify-center',
            'w-full',
            'h-12',
            'px-2',
            'bg-red-300',
          )}>
          <Text>{resume.resumeTitle}</Text>
        </View>
      </Pressable>
    </View>
  );
};
