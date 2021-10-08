import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackParamList, RootTabParamList} from '../../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import ResumeScreen from '../screens/ResumeScreen';
import NewResumeScreen from '../screens/NewResumeScreen';
import * as React from 'react';
import {AuthView} from '../screens/AuthView';
import {CoverLetterProvider} from '../../providers/CoverLetterProvider';
import {ResumeProvider} from '../../providers/ResumeProvider';
import {Logout} from '../components/Logout';
import {CoverLetterScreen} from '../screens/CoverLetterScreen';
import PersonalInfo from '../components/Resume/ResumeItems/PersonalInfo';
import PreviewResume from '../components/Resume/PreviewResume';
import {useAuth} from '../../providers/AuthProvider';

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
          headerLeft: function Header() {
            return <Logout />;
          },
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
      <ResumeStack.Screen name="NewResume" component={NewResumeScreen} />
      <ResumeStack.Screen name="PreviewResume" component={PreviewResume} />
      <ResumeStack.Screen name="PersonalInfo">
        {props => {
          const {navigation, route} = props;
          return (
            <ResumeProvider>
              <PersonalInfo navigation={navigation} route={route} />
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
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="AuthView"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'add';
          if (route.name === 'Resume') {
            iconName = focused ? 'document' : 'document';
          } else if (route.name === 'CoverLetter') {
            iconName = focused ? 'document' : 'document';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <BottomTab.Screen
        name="Resume"
        component={ResumeStackScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="CoverLetter"
        options={() => ({
          // headerShown: false,
          headerLeft: function Header() {
            return <Logout />;
          },
        })}>
        {props => {
          const {navigation, route} = props;
          return (
            <CoverLetterProvider>
              <CoverLetterScreen navigation={navigation} route={route} />
            </CoverLetterProvider>
          );
        }}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
