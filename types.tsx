/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Resume: undefined;
  ResumeStack: undefined;
  NewResume: undefined;
  PreviewResume: undefined;
  CustomizeResume: undefined;
  AuthView: undefined;
  ForgotPasswordView: undefined;
  PersonalInfo: undefined;
  Experiences: undefined;
  Qualifications: undefined;
  Skills: undefined;
  Settings: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Resume: undefined;
  NewResume: undefined;
  PreviewResume: undefined;
  CustomizeResume: undefined;
  PersonalInfo: undefined;
  CoverLetter: undefined;
  AuthView: undefined;
  ForgotPasswordView: undefined;
  Settings: undefined;
  Experiences: undefined;
  Qualifications: undefined;
  Skills: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
