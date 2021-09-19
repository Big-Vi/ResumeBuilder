import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import ResumeScreen from '../screens/ResumeScreen';

import CoverLetterScreen from '../screens/CoverLetterScreen';
import { Pressable } from 'react-native'
import * as React from 'react'
import { WelcomeView } from "../screens/WelcomeView";
import { TasksProvider } from "../../providers/TasksProvider";
import { CoverLetterProvider } from "../../providers/CoverLetterProvider";
import { Logout } from "../components/Logout";
import { ProjectsView } from "../../views/ProjectsView";
import { TasksView } from "../../views/TasksView";
import { CoverLetterView } from "../../views/CoverLetterView";

export default function Navigation() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
  
const Stack = createNativeStackNavigator<RootStackParamList>();

const Realm = require('realm');
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}> 
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> 
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Resume"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'add';
          if (route.name === 'Resume') {
            iconName = focused
              ? 'document'
              : 'document';
          } else if (route.name === 'CoverLetter') {
            iconName = focused ? 'document' : 'document';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
      <BottomTab.Screen
          name="Projects"
          component={ProjectsView}
          // headerBackTitle="log out"
          options={{
            title: "ProjectsView",
            headerLeft: function Header() {
              return <Logout />;
            }
          }}
        />
      <BottomTab.Screen name="TaskList">
        {(props) => {
          const { navigation, route } = props;
          const { user, projectPartition } = route.params;
          return (
            <TasksProvider user={user} projectPartition={projectPartition}>
              <TasksView navigation={navigation} route={route} />
            </TasksProvider>
          );
        }}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="WelcomeView"
        component={WelcomeView}
        options={{ title: "Task Tracker" }}
      />
      <BottomTab.Screen
        name="Resume"
        component={ResumeScreen}
        options={({ navigation }: RootTabScreenProps<'Resume'>) => ({
          title: 'Resume'
        })}
      />
      <BottomTab.Screen name="CoverLetter">
        {(props) => {
          const { navigation, route } = props;
          return (
            <CoverLetterProvider>
              <CoverLetterView navigation={navigation} />
            </CoverLetterProvider>
          );
        }}
      </BottomTab.Screen>
      {/* <BottomTab.Screen
        name="CoverLetter"
        component={CoverLetterScreen}
        options={({ navigation }: RootTabScreenProps<'CoverLetter'>) => ({
          title: 'Cover Letter',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
              <Ionicons name="add" size={20} color="blue" />
            </Pressable>
          ),
        })}
      /> */}
    </BottomTab.Navigator>
  );
}