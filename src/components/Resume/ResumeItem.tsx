import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {useResume} from '../../../providers/ResumeProvider';
import {ActionSheet} from './ActionSheet';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import tw from '../../../lib/tailwind';
import {View, Text, Pressable} from 'react-native';

interface IProps {
  resume: {
    _id: string;
    name: string;
    personalStatement: string;
  };
  navigation: any;
}

export const ResumeItem: React.FC<IProps> = ({navigation, resume}) => {
  const {findResume, deleteResume} = useResume();
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
  const {setClickedResume, setResumeName, setResumePersonalStatement} =
    bindActionCreators(actionCreators, dispatch);

  const editResumeItem = resume => {
    // console.log(id);
    const RESUME = findResume(resume);
    setClickedResume(RESUME);
    setResumeName(RESUME[0].name);
    setResumePersonalStatement(RESUME[0].personalStatement);
    navigation.navigate('NewResume', {
      name: RESUME[0].name,
    });
  };

  const previewResumeItem = resume => {
    const RESUME = findResume(resume);
    setClickedResume(RESUME);
    navigation.navigate('PreviewResume');
  };

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />
      <Pressable
        style={tw.style(
          'h-48',
          'bg-white',
          'justify-center',
          'flex',
          'mb-4',
          'items-center',
        )}
        key={resume._id[1]}
        onPress={() => {
          setActionSheetVisible(true);
        }}>
        <Text>{resume.name}</Text>
      </Pressable>
    </>
  );
};