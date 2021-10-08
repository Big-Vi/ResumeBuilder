import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, Pressable} from 'react-native';
import {useAuth} from '../../providers/AuthProvider';
import styles from '../../stylesheet';
import {RootTabScreenProps} from '../../types';
import tw from '../../lib/tailwind';

export function AuthView({navigation}: RootTabScreenProps<'AuthView'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, signUp, signIn, resetPassword} = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user !== null) {
      navigation.navigate('Resume');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  const onPressResetPassword = async () => {
    try {
      await resetPassword(email, password, []);
    } catch (error) {
      Alert.alert(`Failed to reset: ${error.message}`);
    }
  };

  return (
    <View
      style={tw.style(
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
      )}>
      <View style={tw.style('w-full', 'px-4')}>
        <TextInput
          style={tw.style('border', 'py-4', 'px-4', 'mb-4')}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={tw.style('border', 'py-4', 'px-4')}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={tw.style('self-start', 'pl-4', 'py-4')}>
        <Pressable
          style={tw.style('button-outer', 'mb-2')}
          onPress={onPressSignIn}>
          <Text style={tw.style('button-text')}>Sign In</Text>
        </Pressable>
        <Pressable style={tw.style('button-outer')} onPress={onPressSignUp}>
          <Text style={tw.style('button-text')}>Sign Up</Text>
        </Pressable>
        <Pressable
          style={tw.style('button-outer')}
          onPress={onPressResetPassword}>
          <Text style={tw.style('button-text')}>Forgot Password</Text>
        </Pressable>
      </View>
    </View>
  );
}
