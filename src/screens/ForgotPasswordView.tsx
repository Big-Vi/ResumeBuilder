import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {useAuth} from '../../providers/AuthProvider';
import {RootTabScreenProps} from '../../types';
import tw from '../../lib/tailwind';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function ForgotPasswordView({
  navigation,
}: RootTabScreenProps<'ForgotPasswordView'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {resetPassword} = useAuth();

  const onPressResetPassword = async () => {
    try {
      setLoading(true);
      await resetPassword(email, password, []).then(() => {
        setSuccess(true);
        setLoading(false);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View>
      <View style={tw.style('absolute', 'top-12', 'left-4', 'z-10')}>
        <Pressable
          style={tw.style(
            'mt-4',
            'text-black',
            'flex',
            'flex-row',
            'items-center',
          )}
          onPress={() => {
            console.log('l');
            navigation.navigate('AuthView');
          }}>
          <Ionicons name="arrow-back" size={20} color="black" />
          <Text style={tw.style('ml-2')}>Go back to login</Text>
        </Pressable>
      </View>
      <View
        style={tw.style(
          'flex',
          'h-full',
          'w-full',
          'items-center',
          'justify-center',
        )}>
        <View style={tw.style('w-full', 'px-4')}>
          <Text style={tw.style('mb-4', 'text-lg')}>
            Please enter your email. You'll receive email with link to reset the
            password.
          </Text>
          <TextInput
            style={tw.style('border', 'py-4', 'px-4')}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
          />
        </View>
        <View style={tw.style('self-start', 'pl-4', 'py-4')}>
          <Pressable
            style={tw.style('button-outer', 'mt-2')}
            onPress={onPressResetPassword}>
            {loading ? (
              <Text style={tw.style('button-text', 'text-white')}>
                Sending...
              </Text>
            ) : (
              <Text style={tw.style('button-text')}>Send reset link</Text>
            )}
          </Pressable>
          <Text style={tw.style('mt-4')}>{err && err}</Text>
          {success && (
            <Text style={tw.style('text-sm', 'text-green-800', 'w-80')}>
              Thanks. Email with reset link has been sent to your email.
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
