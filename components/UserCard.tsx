import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import User, { IUser } from '../models/User';
import {
  DeleteUserAction,
  UpdateStoredUserAction,
  UpdateUserAction,
} from '../redux/actions/UserActions';
import { RootStore } from '../redux/store';
import { Text, View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

export default function UserCard() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);
  const [updatedInfo, setUpdatedInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  function updateUser() {
    dispatch(
      new UpdateUserAction(
        new User({ ...user, ...updatedInfo })
      ).toPlainObject()
    );
  }

  function deleteUser() {
    dispatch(new DeleteUserAction(user.apiKey || '').toPlainObject());
  }

  function logout() {
    dispatch(new UpdateStoredUserAction({}).toPlainObject());
  }

  return (
    <Card>
      <Card.Title>Welcome, {user.firstName}</Card.Title>
      <Card.Divider />
      <Input
        label="First Name:"
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, firstName: text })
        }
        placeholder={user.firstName}
      />
      <Input
        label="Last Name:"
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, lastName: text })
        }
        placeholder={user.lastName}
      />
      <Input
        label="Email:"
        onChangeText={(text) => setUpdatedInfo({ ...updatedInfo, email: text })}
        placeholder={user.email}
        autoCapitalize="none"
      />
      <Button title="Update Info" onPress={updateUser} />
      <Button title="Delete User" onPress={deleteUser} />
      <Button title="Sign Out" onPress={logout} />
    </Card>
  );
}
