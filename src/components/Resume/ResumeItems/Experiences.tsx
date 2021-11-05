import React, {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import {RootState} from '../../../state/store';
import {
  addExperience,
  setClickedResume,
  deleteExperience,
  setExperience,
} from '../../../features/resumeSlice';
import uuid from 'react-native-uuid';
import ExperienceItem from './ExperienceItem';
import {DraxProvider, DraxList} from 'react-native-drax';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Experiences({
  navigation,
}: RootTabScreenProps<'Experiences'>) {
  const {updateResume, findResume} = useResume();
  const dispatch = useDispatch();
  const store = useStore();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);
  const handleDelete = id => {
    dispatch(deleteExperience(id));
    updateResume(clickedResume, store.getState().resume);
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  const [experiences, setExperiences] = React.useState([]);

  useEffect(() => {
    setExperiences(
      [...clickedResume[0].experiences].sort((a, b) =>
        a.order > b.order ? 1 : -1,
      ),
    );
  }, [clickedResume[0]]);

  const handleCreateExp = () => {
    let idNew = uuid.v4();
    let exp = {};
    exp = {
      id: idNew,
      title: 'Full stack developer',
      employer: 'Plato',
      location: 'CHCH',
      fromDate: JSON.stringify(new Date()),
      toDate: JSON.stringify(new Date()),
      order:
        clickedResume[0].experiences.length > 0
          ? clickedResume[0].experiences.length
          : 0,
      currentlyWorking: false,
      responsibilities: ['string', 'string'],
    };
    dispatch(addExperience(exp));
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
        <Text>Experiences</Text>
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
            handleCreateExp();
          }}>
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
      <View style={tw.style('mt-12')}>
        {experiences.length > 0 && (
          <View style={tw.style('mb-8')}>
            <GestureHandlerRootView style={tw.style('h-full', 'w-full')}>
              <DraxProvider>
                <View style={styles.container}>
                  <DraxList
                    data={experiences}
                    renderItemContent={({item}) => (
                      <>
                        <ExperienceItem experience={item} />
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
                      const newData = experiences.slice();
                      newData.splice(
                        toIndex,
                        0,
                        newData.splice(fromIndex, 1)[0],
                      );
                      setExperiences(newData);
                      const newExp = newData.map((item, index) => {
                        let newItem = Object.assign({}, item, {order: index});
                        return newItem;
                      });
                      let expObject = {};
                      newExp.map(item => {
                        expObject[item.id] = item;
                      });
                      dispatch(
                        setExperience(JSON.parse(JSON.stringify(expObject))),
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
