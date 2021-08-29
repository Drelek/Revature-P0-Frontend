import React, { useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import User from '../models/User';
import { CreateUserAction, LoginAction } from '../redux/actions/UserActions';
import { View, Text } from './Themed';

export default function LoginCard() {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    apiKey: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  function login() {
    dispatch(new LoginAction(loginInfo.apiKey).toPlainObject());
  }

  function createUser() {
    dispatch(new CreateUserAction(new User(loginInfo)).toPlainObject());
  }

  return (
    <View>
      <View>
        <Text>Create an account</Text>
        <TextInput
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, firstName: text })
          }
          placeholder="First Name"
        />
        <TextInput
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, lastName: text })
          }
          placeholder="Last Name"
        />
        <TextInput
          onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={createUser}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Already have an API key? Enter it here</Text>
        <TextInput
          onChangeText={(text) => setLoginInfo({ ...loginInfo, apiKey: text })}
          placeholder="API Key"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
