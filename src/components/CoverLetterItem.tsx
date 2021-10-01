import React, {useState} from 'react';
import {ListItem} from 'react-native-elements';
import {useCoverLetters} from '../../providers/CoverLetterProvider';
import {ActionSheet} from './ActionSheet';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';

interface IProps {
  cl: {
    _id: string;
    name: string;
    salutation: string;
    intro: string;
    body: string;
    closing: string;
    signature: string;
  };
}

export const CoverLetterItem: React.FC<IProps> = ({cl}) => {
  const {findCoverLetter} = useCoverLetters();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const {deleteCoverLetter} = useCoverLetters();
  const actions = [
    {
      title: 'Delete',
      action: () => {
        deleteCoverLetter(cl);
      },
    },
    {
      title: 'Edit',
      action: () => {
        editCoverLetterItem(cl._id);
      },
    },
    {
      title: 'Preview',
      action: () => {
        previewCoverLetterItem(cl._id);
      },
    },
  ];

  const dispatch = useDispatch();
  const {setEditState, setPreviewState, setClickedCL} = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const editCoverLetterItem = (id: string) => {
    const CL = findCoverLetter(id[1]);
    setClickedCL(CL);
    setEditState(true);
  };

  const previewCoverLetterItem = (id: string) => {
    const CL = findCoverLetter(id[1]);
    setClickedCL(CL);
    setPreviewState(true);
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
        key={cl._id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{cl.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
};
