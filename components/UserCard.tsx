import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import User, { IUser } from '../models/User';
import {
  DeleteUserAction,
  UpdateUserAction,
} from '../redux/actions/UserActions';
import { RootStore } from '../redux/store';
import { Text, View } from './Themed';

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

  return (
    <View>
      <Text>Welcome, {user.firstName}</Text>
      <TextInput
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, firstName: text })
        }
        placeholder={user.firstName}
      />
      <TextInput
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, lastName: text })
        }
        placeholder={user.lastName}
      />
      <TextInput
        onChangeText={(text) => setUpdatedInfo({ ...updatedInfo, email: text })}
        placeholder={user.email}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={updateUser}>
        <Text>Update Info</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteUser}>
        <Text>Delete User</Text>
      </TouchableOpacity>
    </View>
  );
}
