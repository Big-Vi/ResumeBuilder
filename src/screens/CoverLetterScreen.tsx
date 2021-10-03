import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootTabScreenProps} from '../../types';
import {useCoverLetters} from '../../providers/CoverLetterProvider';
import {CoverLetterItem} from '../components/CoverLetter/CoverLetterItem';
import {AddCoverLetter} from '../components/CoverLetter/AddCoverLetter';
import {EditCoverLetter} from '../components/CoverLetter/EditCoverLetter';
import {PreviewCoverLetter} from '../components/CoverLetter/PreviewCoverLetter';
import {useSelector} from 'react-redux';
import {State} from '../state';

export function CoverLetterScreen({
  navigation,
}: RootTabScreenProps<'CoverLetter'>) {
  const {coverLetters, createCoverLetter} = useCoverLetters();

  const editState = useSelector((state: State) => state.userReducer.editState);
  const previewState = useSelector(
    (state: State) => state.userReducer.previewState,
  );
  const clickedCL = useSelector((state: State) => state.userReducer.clickedCL);

  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return (
          <AddCoverLetter
            createCoverLetter={createCoverLetter}
            modalVisibleState={false}
          />
        );
      },
      title: 'Cover Letter',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {editState && clickedCL ? (
        <EditCoverLetter modalVisibleState={true} clickedCL={clickedCL} />
      ) : previewState && clickedCL ? (
        <PreviewCoverLetter modalVisibleState={true} clickedCL={clickedCL} />
      ) : (
        coverLetters.map((cl: any) =>
          cl ? <CoverLetterItem key={`${cl._id}`} cl={cl} /> : null,
        )
      )}
    </View>
  );
}
