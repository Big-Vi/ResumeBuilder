import React, {useState} from 'react';
import {ActionSheet} from './ActionSheet';
import {useDispatch} from 'react-redux';
import tw from '../../../lib/tailwind';
import {View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useResume} from '../../../providers/ResumeProvider';
import {WebView} from 'react-native-webview';
import {
  addResumeTitle,
  addResumeName,
  addResumeEmail,
  addResumeMobile,
  addResumeVisa,
  addResumeLocation,
  addResumePersonalStatement,
  setClickedResume,
  setExperience,
  addResumeOrder,
} from '../../features/resumeSlice';

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
  const {deleteResume, findResume, returnResumeHTML} = useResume();
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

  const editResumeItem = resume => {
    let RESUME = findResume(resume);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
    dispatch(addResumeTitle(RESUME[0].resumeTitle));
    dispatch(addResumeName(RESUME[0].name));
    dispatch(addResumeEmail(RESUME[0].email));
    dispatch(addResumeMobile(RESUME[0].mobile));
    dispatch(addResumeVisa(RESUME[0].visaStatus));
    dispatch(addResumeLocation(RESUME[0].location));
    dispatch(addResumeOrder(JSON.parse(JSON.stringify(RESUME[0].order))));
    dispatch(addResumePersonalStatement(RESUME[0].personalStatement));
    let expObject = {};
    RESUME[0].experiences.map(item => {
      expObject[item.id] = item;
    });
    dispatch(setExperience(JSON.parse(JSON.stringify(expObject))));
    navigation.navigate('NewResume', {
      resumeTitle: RESUME[0].resumeTitle,
    });
  };

  const previewResumeItem = resume => {
    dispatch(setClickedResume(JSON.parse(JSON.stringify(resume))));
    navigation.navigate('PreviewResume');
  };

  return (
    <View style={tw.style({height: 350})}>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />
      <WebView
        source={{
          html: returnResumeHTML(resume),
        }}
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
          {height: 400},
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
