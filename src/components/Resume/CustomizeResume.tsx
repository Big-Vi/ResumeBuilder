import React, {useState, useEffect} from 'react';
import {Pressable, View, Image, StyleSheet} from 'react-native';
import {RootTabScreenProps} from '../../../types';
import {useSelector, useStore} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootState} from '../../state/store';
import Carousel from 'react-native-snap-carousel';
import {customizeResume} from '../../features/resumeSlice';
import {useDispatch} from 'react-redux';
import {useResume} from '../../../providers/ResumeProvider';

export default function CustomizeResume({
  navigation,
}: RootTabScreenProps<'CustomizeResume'>) {
  const dispatch = useDispatch();
  const {updateResume} = useResume();
  const store = useStore();
  const clickedResume = useSelector(
    (state: RootState) => state.resume.clickedResume,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: function Header() {
        return (
          <Pressable
            onPress={() => {
              updateResume(clickedResume, store.getState().resume);
              navigation.navigate('NewResume', {
                screen: 'Resume',
              });
            }}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </Pressable>
        );
      },
      title: clickedResume[0].resumeTitle,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formInputs = useSelector((state: RootState) => state.resume);

  const [formInputsTemp, setFormInputTemp] = useState({
    template: formInputs.customize.template,
    color: formInputs.customize.color,
    font: formInputs.customize.font,
    lineHeight: formInputs.customize.lineHeight,
  });

  const carouselItems = [
    {
      title: 'template1',
      image:
        'https://cdn.sanity.io/images/bz8z0oa1/production/d64feb0697be9f7003bedb6db9573d5e87729a73-1024x1274.png?w=1190&h=1684&fit=max',
    },
    {
      title: 'template2',
      image:
        'https://cdn.sanity.io/images/bz8z0oa1/production/f4f1dac177809cbbb4fb1d3cf57b69cf087b136c-1178x1270.png?w=2000&h=2000&fit=max',
    },
  ];

  useEffect(() => {
    dispatch(customizeResume(formInputsTemp));
  }, [formInputsTemp]);

  const _renderItem = ({item}) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            setFormInputTemp({
              ...formInputsTemp,
              template: item.title,
            });
          }}>
          <Image
            style={[
              styles.image,
              formInputsTemp.template === item.title && styles.active,
            ]}
            source={{
              uri: item.image,
            }}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={tw.style('mt-4')}>
        <Carousel
          layout={'default'}
          data={carouselItems}
          renderItem={_renderItem}
          sliderWidth={400}
          itemWidth={300}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 350,
  },
  active: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
