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
import { StyleSheet, View } from 'react-native';
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
    <Card containerStyle={styles.loginCard} wrapperStyle={styles.cardItems}>
      <Card.Title>Welcome, {user.firstName}</Card.Title>
      <Card.Divider />
      <Input inputStyle={styles.inputs}
        label="First Name:"
        labelStyle={styles.label}
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, firstName: text })
        }
        placeholder={user.firstName}
      />
      <Input inputStyle={styles.inputs}
        label="Last Name:"
        labelStyle={styles.label}
        onChangeText={(text) =>
          setUpdatedInfo({ ...updatedInfo, lastName: text })
        }
        placeholder={user.lastName}
      />
      <Input inputStyle={styles.inputs}
        label="Email:"
        labelStyle={styles.label}
        onChangeText={(text) => setUpdatedInfo({ ...updatedInfo, email: text })}
        placeholder={user.email}
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.button}
          title="Update Info"
          onPress={updateUser}
        />
        <Button

          buttonStyle={styles.deleteButton}
          title="Delete User"
          onPress={deleteUser}
        />
        <Button buttonStyle={styles.button} title="Sign Out" onPress={logout} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  loginCard:{
    backgroundColor: '#fffffe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,

  },
  cardItems:{
    
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,

  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  deleteButton:{
    backgroundColor:'#8e0000',
    borderRadius:10,
    margin:5,
    minWidth: '30%',
  },
  inputs:{
    
    fontSize:14,
    padding:5,
    backgroundColor: '#fffffe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 2,
    

  },
  button: {
    backgroundColor:'#123456',
    borderRadius:8,
    margin:5,
    minWidth: '30%',
  },
  label:{
    color:'#123456'
  }
});
