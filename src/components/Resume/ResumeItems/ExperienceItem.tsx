import React, {useState, useEffect} from 'react';
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
    responsibilities: [],
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
        <CollapseBody style={tw.style('pt-6')}>
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
          {/* <View style={tw.style('mt-8')}>
            <Text>Responsibilities</Text>
            {experience.responsibilities.length > 0 &&
              experience.responsibilities.map((item, index) => {
                return <Text key={index}>{item}</Text>;
              })}
          </View> */}
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
});
