import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../../../state';
import {RootTabScreenProps} from '../../../../types';
import {useResume} from '../../../../providers/ResumeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'tailwind-react-native-classnames';

export default function Experiences({
  navigation,
}: RootTabScreenProps<'Experiences'>) {
  // const {updateResume} = useResume();
  // const dispatch = useDispatch();
  // const {} = bindActionCreators(actionCreators, dispatch);
  const clickedResume = useSelector(
    (state: State) => state.ResumeReducer.clickedResume,
  );
  // const formInputs = useSelector((state: State) => state.ResumeReducer);
  return (
    <View style={tw.style('mt-16', 'px-4')}>
      <View style={tw.style('flex', 'flex-row', 'justify-center')}>
        <Text
          style={{
            position: 'absolute',
            left: 0,
            transform: [{translateY: -6}],
          }}
          onPress={() => {
            navigation.goBack();
            // if () {
            //   updateResume(clickedResume, formInputs);
            // }
          }}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Text>
        <Text>Experiences</Text>
      </View>
      <ScrollView style={tw.style('mt-8')}>
        {clickedResume[0].experiences.length > 0 &&
          clickedResume[0].experiences.map(experience => (
            <View style={tw.style('mb-8')}>
              <Text>Job title</Text>
              <TextInput
                style={styles.textInput}
                // onChangeText={text => setResumeName(text)}
                autoFocus={false}
                // defaultValue={clickedResume[0].name}
              />
              <Text>Employer</Text>
              <TextInput
                style={styles.textInput}
                // onChangeText={text => setResumeName(text)}
                autoFocus={false}
                // defaultValue={clickedResume[0].name}
              />
            </View>
          ))}
      </ScrollView>
      <View>
        <Pressable
          style={tw.style(
            'absolute',
            'right-6',
            'bottom-8',
            'text-lg',
            'bg-red-500',
            'w-12',
            'h-12',
            'flex',
            'items-center',
            'justify-center',
            'rounded-full',
          )}
          // onPress={() => {}
        >
          <Ionicons name="add" size={20} color={'white'} />
        </Pressable>
      </View>
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
