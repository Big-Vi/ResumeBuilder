import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList, RootTabParamList} from '../../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import ResumeScreen from '../screens/ResumeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewResumeScreen from '../screens/NewResumeScreen';
import * as React from 'react';
import {AuthView} from '../screens/AuthView';
import {ForgotPasswordView} from '../screens/ForgotPasswordView';
// import {CoverLetterProvider} from '../../providers/CoverLetterProvider';
import {ResumeProvider} from '../../providers/ResumeProvider';
// import {CoverLetterScreen} from '../screens/CoverLetterScreen';
import PersonalInfo from '../components/Resume/ResumeScreens/PersonalInfo';
import Experiences from '../components/Resume/ResumeScreens/Experiences';
import Qualifications from '../components/Resume/ResumeScreens/Qualifications';
import Skills from '../components/Resume/ResumeScreens/Skills';
import PreviewResume from '../components/Resume/PreviewResume';
import CustomizeResume from '../components/Resume/CustomizeResume';
import {useAuth} from '../../providers/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from '../../lib/tailwind';
import {Text, View, TouchableOpacity} from 'react-native';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const ResumeStack = createNativeStackNavigator<RootStackParamList>();

function ResumeStackScreen() {
  return (
    <ResumeStack.Navigator>
      <ResumeStack.Screen
        name="ResumeStack"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <ResumeScreen navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen
        name="NewResume"
        options={() => ({
          title: '',
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <NewResumeScreen navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen name="PreviewResume">
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <PreviewResume navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen name="CustomizeResume">
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <CustomizeResume navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen
        name="PersonalInfo"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <PersonalInfo navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen
        name="Experiences"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <Experiences navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen
        name="Qualifications"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <Qualifications navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
      <ResumeStack.Screen
        name="Skills"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <Skills navigation={navigation} route={route} />
            </ResumeProvider>
          );
        }}
      </ResumeStack.Screen>
    </ResumeStack.Navigator>
  );
}
function RootNavigator() {
  const {user} = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="AuthView"
          component={AuthView}
          options={{title: 'Auth', headerShown: false}}
        />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Screen
        name="ForgotPasswordView"
        component={ForgotPasswordView}
        options={{title: 'Forgot Password', headerShown: false}}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={tw.style('flex', 'flex-row', 'h-28', 'z-0', 'bg-white', 'pb-4')}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw.style(
              'flex',
              'flex-col',
              'w-1/2',
              'items-center',
              'justify-center',
            )}>
            {route.name === 'Resume' ? (
              <Ionicons
                // name="newspaper-outline"
                name="reader-outline"
                size={26}
                color={isFocused ? 'red' : 'black'}
              />
            ) : route.name === 'CoverLetter' ? (
              <Ionicons
                name="reader-outline"
                size={26}
                color={isFocused ? 'red' : 'black'}
              />
            ) : route.name === 'Settings' ? (
              <Ionicons
                name="settings"
                size={26}
                color={isFocused ? 'red' : 'black'}
              />
            ) : (
              ''
            )}
            <Text
              style={tw.style('text-sm', {
                color: isFocused ? 'red' : '#222',
                // fontFamily: 'Montserrat-Regular',
              })}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="AuthView">
      <BottomTab.Screen
        name="Resume"
        component={ResumeStackScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      {/* <BottomTab.Screen
        name="CoverLetter"
        options={() => ({
          headerShown: false,
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <CoverLetterProvider>
              <CoverLetterScreen navigation={navigation} route={route} />
            </CoverLetterProvider>
          );
        }}
      </BottomTab.Screen> */}
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={() => ({
          headerShown: false,
        })}
      />
    </BottomTab.Navigator>
  );
}
