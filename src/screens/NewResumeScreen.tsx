import React, {useState} from 'react';
import {RootTabScreenProps} from '../../types';
import {View, Text, Pressable} from 'react-native';
import {Input, Overlay, ListItem} from 'react-native-elements';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RootState} from '../state/store';
import {useResume} from '../../providers/ResumeProvider';
import {
  addResumeTitle,
  setClickedResume,
  addResumeOrder,
} from '../features/resumeSlice';
import {DraxProvider, DraxList} from 'react-native-drax';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function NewResumeScreen({
  navigation,
  route,
}: RootTabScreenProps<'NewResume'>) {
  const {updateFilePath, findResume, updateResume} = useResume();
  const [titleEdit, setTitleEdit] = useState(false);
  const [tools, setTools] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);
  const updateClickedResume = () => {
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };

  const [order, setOrder] = React.useState(formInputs.order);

  return (
    <>
      <Overlay
        overlayStyle={{width: '90%'}}
        isVisible={titleEdit}
        onBackdropPress={() => {
          setTitleEdit(false);
        }}>
        <View style={tw.style('py-4')}>
          <Input
            style={tw.style('')}
            onChangeText={text => dispatch(addResumeTitle(text))}
            autoFocus={true}
            defaultValue={clickedResume[0].resumeTitle}
          />
          <Pressable
            style={tw.style('button-outer', 'mt-2', 'pl-2')}
            onPress={() => {
              updateFilePath(clickedResume, formInputs);
              setTitleEdit(false);
            }}>
            <Text style={tw.style('button-text')}>Save</Text>
          </Pressable>
        </View>
      </Overlay>
      <Overlay
        overlayStyle={{width: '60%', top: 100, right: 40, position: 'absolute'}}
        isVisible={tools}
        onBackdropPress={() => {
          setTools(false);
        }}>
        <View>
          <ListItem
            onPress={() => {
              setTools(false);
              navigation.navigate('CustomizeResume');
            }}>
            <ListItem.Content
              style={tw.style(
                'flex',
                'flex-row',
                'items-center',
                'justify-start',
              )}>
              <Ionicons name="construct-outline" size={20} color="black" />
              <ListItem.Title style={tw.style('pl-2')}>
                Customize
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem
            onPress={() => {
              setTools(false);
              navigation.navigate('PreviewResume');
            }}>
            <ListItem.Content
              style={tw.style(
                'flex',
                'flex-row',
                'items-center',
                'justify-start',
              )}>
              <Ionicons name="eye-outline" size={20} color="black" />
              <ListItem.Title style={tw.style('pl-2')}>Preview</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </Overlay>
      <View style={tw.style('mt-16', 'px-4')}>
        <View style={tw.style('flex', 'flex-row', 'justify-center')}>
          <Pressable
            style={{
              position: 'absolute',
              left: 0,
              transform: [{translateY: -6}],
            }}
            onPress={() => {
              updateResume(clickedResume, formInputs);
              navigation.navigate('ResumeStack');
            }}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </Pressable>
          <View style={tw.style('flex', 'flex-row', 'items-center')}>
            <Text
              onPress={() => {
                setTitleEdit(true);
              }}>
              <Ionicons name="create" size={26} color="black" />
              {formInputs.resumeTitle}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
            }}>
            <Text
              onPress={() => {
                setTools(true);
              }}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </Text>
          </View>
        </View>
        <GestureHandlerRootView style={tw.style('h-full', 'w-full')}>
          <DraxProvider>
            <View>
              <DraxList
                data={order}
                renderItemContent={({item}) => (
                  <View>
                    <Pressable
                      style={tw.style(
                        'flex',
                        'flex-row',
                        'items-center',
                        'justify-between',
                        'h-20',
                        'bg-white',
                        'mt-6',
                        'px-4',
                      )}
                      onPress={() => {
                        updateClickedResume();
                        navigation.navigate(item);
                      }}>
                      <View
                        style={tw.style('flex', 'flex-row', 'items-center')}>
                        <Ionicons
                          name="swap-vertical-outline"
                          size={20}
                          color="black"
                        />
                        <Text style={tw.style('ml-2', 'text-lg')}>{item}</Text>
                      </View>
                      <Ionicons
                        name="arrow-forward-outline"
                        size={20}
                        color="black"
                      />
                    </Pressable>
                  </View>
                )}
                onItemReorder={({fromIndex, toIndex}) => {
                  const newData = order.slice();
                  newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
                  setOrder(newData);
                  dispatch(addResumeOrder(JSON.parse(JSON.stringify(newData))));
                  updateResume(clickedResume, store.getState().resume);
                }}
                keyExtractor={item => item}
              />
            </View>
          </DraxProvider>
        </GestureHandlerRootView>
      </View>
    </>
  );
}
