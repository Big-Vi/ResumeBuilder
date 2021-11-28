import React, {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import {RootState} from '../../../state/store';
import {
  addQualification,
  setClickedResume,
  deleteQualification,
  setQualification,
} from '../../../features/resumeSlice';
import uuid from 'react-native-uuid';
import QualificationItem from '../ResumeComponents/QualificationItem';
import {DraxProvider, DraxList} from 'react-native-drax';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Qualifications({
  navigation,
}: RootTabScreenProps<'Qualifications'>) {
  const {updateResume, findResume} = useResume();
  const dispatch = useDispatch();
  const store = useStore();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);
  const handleDelete = id => {
    dispatch(deleteQualification(id));
    updateResume(clickedResume, store.getState().resume);
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  const [qualifications, setQualifications] = React.useState([]);

  useEffect(() => {
    setQualifications(
      [...clickedResume[0].qualifications].sort((a, b) =>
        a.order > b.order ? 1 : -1,
      ),
    );
  }, [clickedResume[0]]);

  const handleCreateQua = () => {
    let idNew = uuid.v4();
    let qua = {};
    qua = {
      id: idNew,
      title: 'Qualification',
      institute: 'Institute',
      location: 'Location',
      order:
        clickedResume[0].qualifications.length > 0
          ? clickedResume[0].qualifications.length
          : 0,
      finishedDate: JSON.stringify(new Date()),
    };
    dispatch(addQualification(qua));
    updateResume(clickedResume, store.getState().resume);
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  return (
    <View style={tw.style('mt-16', 'px-4', 'h-full')}>
      <View style={tw.style('flex', 'flex-row', 'justify-center')}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            transform: [{translateY: -6}],
          }}
          onPress={() => {
            navigation.goBack();
            updateResume(clickedResume, formInputs);
          }}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Text>
        <Text>Qualifications</Text>
        <Pressable
          style={tw.style(
            'absolute',
            'right-0',
            'text-lg',
            'bg-red-500',
            'w-8',
            'h-8',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
          )}
          onPress={() => {
            handleCreateQua();
          }}>
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
      <View style={tw.style('mt-12')}>
        {qualifications.length > 0 && (
          <View style={tw.style('mb-8')}>
            <GestureHandlerRootView style={tw.style('h-full', 'w-full')}>
              <DraxProvider>
                <View style={styles.container}>
                  <DraxList
                    data={qualifications}
                    renderItemContent={({item}) => (
                      <>
                        <QualificationItem qualification={item} />
                        <Text
                          style={tw.style(
                            'text-center',
                            'text-right',
                            'mt-1',
                            'mb-6',
                          )}
                          onPress={() => handleDelete(item.id)}>
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color={'black'}
                          />
                        </Text>
                      </>
                    )}
                    onItemReorder={({fromIndex, toIndex}) => {
                      const newData = qualifications.slice();
                      newData.splice(
                        toIndex,
                        0,
                        newData.splice(fromIndex, 1)[0],
                      );
                      setQualifications(newData);
                      const newExp = newData.map((item, index) => {
                        let newItem = Object.assign({}, item, {order: index});
                        return newItem;
                      });
                      let quaObject = {};
                      newExp.map(item => {
                        quaObject[item.id] = item;
                      });
                      dispatch(
                        setQualification(JSON.parse(JSON.stringify(quaObject))),
                      );
                    }}
                    keyExtractor={item => item}
                  />
                </View>
              </DraxProvider>
            </GestureHandlerRootView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
