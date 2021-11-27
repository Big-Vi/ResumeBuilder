import React, {useState, useEffect, useRef} from 'react';
import {Text, View, TextInput, StyleSheet, Platform} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Overlay} from 'react-native-elements';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {editExperience} from '../../../features/resumeSlice';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ExperienceItem({experience}) {
  const [fromDate, setFromDate] = useState(new Date(experience.fromDate));
  const [toDate, setToDate] = useState(new Date(experience.toDate));
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(
    experience.currentlyWorking,
  );

  const [formInputsTemp, setFormInputTemp] = useState({
    id: experience.id,
    title: experience.title,
    employer: experience.employer,
    location: experience.location,
    fromDate: experience.fromDate,
    toDate: experience.toDate,
    currentlyWorking: experience.currentlyWorking,
    responsibilities: experience.responsibilities,
  });
  const dispatch = useDispatch();
  const handleChange = (e, name) => {
    setFormInputTemp({
      ...formInputsTemp,
      [name]: e,
    });
  };
  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDate(Platform.OS === 'ios');
    setFromDate(currentDate);
    handleChange(JSON.stringify(currentDate), 'fromDate');
  };
  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDate(Platform.OS === 'ios');
    setToDate(currentDate);
    handleChange(JSON.stringify(currentDate), 'toDate');
  };
  useEffect(() => {
    dispatch(editExperience(formInputsTemp));
  }, [formInputsTemp]);
  const [expanded, setExpanded] = useState(false);

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
    console.log('editor height change:', height);
  }

  return (
    <View>
      <Collapse isExpanded={expanded} onToggle={() => setExpanded(!expanded)}>
        <CollapseHeader style={tw.style('bg-red-200', 'py-4', 'px-4')}>
          <View
            style={tw.style(
              'flex',
              'flex-row',
              'justify-between',
              'items-center',
            )}>
            <Text>
              {experience.title} - {experience.employer}
            </Text>
            {expanded ? (
              <Ionicons name="chevron-up-outline" size={20} color={'black'} />
            ) : (
              <Ionicons name="chevron-down-outline" size={20} color={'black'} />
            )}
          </View>
        </CollapseHeader>
        <CollapseBody style={tw.style('py-6')}>
          <Text>Job title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={e => handleChange(e, 'title')}
            autoFocus={false}
            defaultValue={experience.title}
          />
          <Text>Employer</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={e => handleChange(e, 'employer')}
            autoFocus={false}
            defaultValue={experience.employer}
          />
          <Text>Location</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={e => handleChange(e, 'location')}
            autoFocus={false}
            defaultValue={experience.location}
          />
          <View style={tw.style('flex', 'flex-row')}>
            <View>
              <Text>From date</Text>
              <Text
                style={styles.textInput}
                onPress={() => {
                  setShowFromDate(true);
                }}>
                {fromDate.toLocaleDateString()}
              </Text>
              <Overlay
                overlayStyle={{width: '100%', position: 'absolute', bottom: 0}}
                isVisible={showFromDate}>
                <View style={tw.style('pb-4')}>
                  <Text onPress={() => setShowFromDate(false)}>Done</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={fromDate}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChangeFromDate}
                  />
                </View>
              </Overlay>
            </View>
            <View style={tw.style('ml-12')}>
              <Text>To date</Text>
              <Text
                style={styles.textInput}
                onPress={() => setShowToDate(true)}>
                {toDate.toLocaleDateString()}
              </Text>
              <Overlay
                overlayStyle={{width: '100%', position: 'absolute', bottom: 0}}
                isVisible={showToDate}>
                <View style={tw.style('pb-4')}>
                  <Text onPress={() => setShowToDate(false)}>Done</Text>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={toDate}
                    mode="date"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChangeToDate}
                  />
                </View>
              </Overlay>
            </View>
          </View>
          <View style={tw.style('flex', 'flex-row', 'items-center')}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={e => {
                setToggleCheckBox(e);
                handleChange(e, 'currentlyWorking');
              }}
            />
            <Text style={tw.style('ml-4')}>Currently working here?</Text>
          </View>
          <View
            style={tw.style(
              'mb-12',
              'mt-8',
              'mb-60',
              'h-60',
              'flex',
              'relative',
            )}>
            <Text style={tw.style('mb-4')}>Responsibilities</Text>
            <RichEditor
              disabled={false}
              containerStyle={styles.editor}
              editorStyle={{
                contentCSSText: `
                font-family: sans-serif; 
                font-size: 14px; 
                padding: 0 30px; 
                line-height: 36px; 
                display: flex; 
                flex-direction: column; 
                min-height: 100px; 
                position: absolute; 
                top: 0; right: 0; bottom: 0; left: 0;`,
              }}
              ref={RichText}
              style={styles.rich}
              placeholder={'Start Writing Here'}
              initialContentHTML={experience.responsibilities}
              onChange={text => handleChange(text, 'responsibilities')}
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
        </CollapseBody>
      </Collapse>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingTop: 16,
    paddingBottom: 4,
    marginRight: 2,
    marginLeft: 8,
    fontSize: 18,
    marginBottom: 30,
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
