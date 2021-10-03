import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {useResume} from '../../../providers/ResumeProvider';
import {ActionSheet} from './ActionSheet';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';

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
        editResumeItem(resume._id);
      },
    },
    {
      title: 'Preview',
      action: () => {
        previewResumeItem(resume._id);
      },
    },
  ];

  const dispatch = useDispatch();
  const {setClickedResume, setResumeName, setResumePersonalStatement} =
    bindActionCreators(actionCreators, dispatch);

  const editResumeItem = (id: string) => {
    const RESUME = findResume(id[1]);
    setClickedResume(RESUME);
    setResumeName(RESUME[0].name);
    setResumePersonalStatement(RESUME[0].personalStatement);
    navigation.navigate('NewResume');
  };

  const previewResumeItem = (id: string) => {
    const RESUME = findResume(id[1]);
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
      <ListItem
        key={resume._id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{resume.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
};
