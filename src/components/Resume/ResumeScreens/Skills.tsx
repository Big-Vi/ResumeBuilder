import React, {useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';
import {RootState} from '../../../state/store';
import {addResumeSkills} from '../../../features/resumeSlice';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

export default function Skills({
  navigation,
}: RootTabScreenProps<'Skills'>) {
  const {updateResume} = useResume();
  const dispatch = useDispatch();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const formInputs = useSelector((state: RootState) => state.resume);

  const RichText = useRef();

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

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
        <Text>Skills</Text>
      </View>
      <View style={tw.style('flex', 'flex-col', 'w-full', 'mt-8')}>
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={'Start Writing Here'}
          initialContentHTML={clickedResume[0].skills}
          onChange={text => dispatch(addResumeSkills(text))}
          editorInitializedCallback={editorInitializedCallback}
          onHeightChange={handleHeightChange}
        />
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={'purple'}
          selectedIconTint={'pink'}
          disabledIconTint={'purple'}
          iconSize={25}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#F5FCFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});