import React, {useEffect} from 'react';
import {RootTabScreenProps} from '../../types';
import {AddResume} from '../components/Resume/AddResume';
import {useResume} from '../../providers/ResumeProvider';
import {ResumeItem} from '../components/Resume/ResumeItem';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../state';
import {EditResume} from '../components/Resume/EditResume';
import {PreviewResume} from '../components/Resume/PreviewResume';

export default function ResumeScreen({
  navigation,
}: RootTabScreenProps<'Resume'>) {
  const {resumes, createResume} = useResume();
  const editState = useSelector((state: State) => state.userReducer.editState);
  const viewState = useSelector((state: State) => state.userReducer.viewState);
  const previewState = useSelector(
    (state: State) => state.userReducer.previewState,
  );
  const clickedResume = useSelector(
    (state: State) => state.userReducer.clickedResume,
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return (
          <AddResume
            createResume={createResume}
            modalVisibleState={false}
            navigation={navigation}
          />
        );
      },
      title: 'Resume',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      {editState && clickedResume ? (
        <EditResume modalVisibleState={true} clickedResume={clickedResume} />
      ) : previewState && clickedResume ? (
        <PreviewResume modalVisibleState={true} clickedResume={clickedResume} />
      ) : viewState ? (
        resumes.map((resume: any) =>
          resume ? <ResumeItem key={`${resume._id[1]}`} resume={resume} /> : null,
        )
      ) : (
        ''
      )}
    </View>
  );
}
