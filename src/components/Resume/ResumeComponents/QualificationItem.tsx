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
import {editQualification} from '../../../features/resumeSlice';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootState} from '../../../state/store';
import {useResume} from '../../../../providers/ResumeProvider';
import {setClickedResume} from '../../../features/resumeSlice';

export default function QualificationItem({qualification}) {
  const [finishedDate, setFinishedDate] = useState(
    new Date(qualification.finishedDate),
  );
  const [showFinishedDate, setShowFinishedDate] = useState(false);

  const {updateResume, findResume} = useResume();

  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );
  const updateClickedResume = () => {
    let RESUME = findResume(clickedResume[0]);
    dispatch(setClickedResume(JSON.parse(JSON.stringify(RESUME))));
  };
  const formInputs = useSelector((state: RootState) => state.resume);

  const [formInputsTemp, setFormInputTemp] = useState({
    id: qualification.id,
    title: qualification.title,
    institute: qualification.institute,
    location: qualification.location,
    finishedDate: qualification.finishedDate,
  });
  const dispatch = useDispatch();
  const handleChange = (e, name) => {
    setFormInputTemp({
      ...formInputsTemp,
      [name]: e,
    });
  };
  const onChangeFinishedDate = (event, selectedDate) => {
    const currentDate = selectedDate || finishedDate;
    setShowFinishedDate(Platform.OS === 'ios');
    setFinishedDate(currentDate);
    handleChange(JSON.stringify(currentDate), 'finishedDate');
  };
  useEffect(() => {
    dispatch(editQualification(formInputsTemp));
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
    // console.log("editor height change:", height);
  }

  return (
    <View>
      <Collapse
        isExpanded={expanded}
        onToggle={() => {
          updateResume(clickedResume, formInputs);
          updateClickedResume();
          setExpanded(!expanded);
        }}>
        <CollapseHeader style={tw.style('bg-red-200', 'py-4', 'px-4')}>
          <View
            style={tw.style(
              'flex',
              'flex-row',
              'justify-between',
              'items-center',
            )}>
            <Text>
              {qualification.title} - {qualification.institute}
            </Text>
            {expanded ? (
              <Ionicons name="chevron-up-outline" size={20} color={'black'} />
            ) : (
              <Ionicons name="chevron-down-outline" size={20} color={'black'} />
            )}
          </View>
        </CollapseHeader>
        <CollapseBody>
          <KeyboardAwareScrollView style={tw.style('py-6')}>
            <Text>Qualification</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => handleChange(e, 'title')}
              autoFocus={false}
              defaultValue={qualification.title}
            />
            <Text>Institute</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => handleChange(e, 'institute')}
              autoFocus={false}
              defaultValue={qualification.institute}
            />
            <Text>Location</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => handleChange(e, 'location')}
              autoFocus={false}
              defaultValue={qualification.location}
            />
            <View style={tw.style('flex', 'flex-row')}>
              <View>
                <Text>Finished date</Text>
                <Text
                  style={styles.textInput}
                  onPress={() => {
                    setShowFinishedDate(true);
                  }}>
                  {finishedDate.toLocaleDateString()}
                </Text>
                <Overlay
                  overlayStyle={{
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                  }}
                  isVisible={showFinishedDate}>
                  <View style={tw.style('pb-4')}>
                    <Text onPress={() => setShowFinishedDate(false)}>Done</Text>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={finishedDate}
                      textColor="black"
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={onChangeFinishedDate}
                    />
                  </View>
                </Overlay>
              </View>
            </View>
          </KeyboardAwareScrollView>
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
