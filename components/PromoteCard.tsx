import React, { useState } from 'react';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../models/User';
import { PromoteUserAction } from '../redux/actions/UserActions';
import { RootStore } from '../redux/store';
import { StyleSheet } from 'react-native';

export default function PromoteCard() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);
  const [promoteKey, setPromoteKey] = useState('');

  function promote() {
    dispatch(new PromoteUserAction(user.apiKey || '', promoteKey).toPlainObject());
  }

  return (
    <Card containerStyle={styles.container}>
      <Card.Title>Promote a User</Card.Title>
      <Card.Divider />
      <Input
        inputStyle={styles.input}
        label="User to Promote"
        labelStyle={styles.label}
        placeholder="API Key"
        onChangeText={(text) => setPromoteKey(text)}
      />
      <Button buttonStyle={styles.button} title="Promote" onPress={promote} />
    </Card>
  );
}
const styles = StyleSheet.create({
  container:{
  backgroundColor: '#fffffe',
    borderRadius: 15,
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
  button:{
    backgroundColor:'#123456',
    borderRadius:8,
    margin:5,
    minWidth: '30%',
  }  ,
  input:{
    fontSize:14,
    padding:5,
    backgroundColor: '#fffffe',
    borderRadius: 5,
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
  label:{
    color:'#123456'
  }
});