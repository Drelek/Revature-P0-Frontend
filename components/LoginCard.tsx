import React, { useState } from 'react';
import { Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import User from '../models/User';
import { CreateUserAction, LoginAction } from '../redux/actions/UserActions';
import { View, Text } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';

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
      <Card>
        <Card.Title>Create an account</Card.Title>
        <Card.Divider />
        <Input
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, firstName: text })
          }
          placeholder="First Name"
        />
        <Input
          onChangeText={(text) =>
            setLoginInfo({ ...loginInfo, lastName: text })
          }
          placeholder="Last Name"
        />
        <Input
          onChangeText={(text) => setLoginInfo({ ...loginInfo, email: text })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <Button title="Create Account" onPress={createUser} />
      </Card>

      <Card>
        <Card.Title>Already have an API key? Enter it here</Card.Title>
        <Card.Divider />
        <Input
          onChangeText={(text) => setLoginInfo({ ...loginInfo, apiKey: text })}
          placeholder="API Key"
          autoCapitalize="none"
        />
        <Button title="Login" onPress={login} />
      </Card>
    </View>
  );
}
