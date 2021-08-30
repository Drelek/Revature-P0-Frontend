import React, { useState } from 'react';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../models/User';
import { PromoteUserAction } from '../redux/actions/UserActions';
import { RootStore } from '../redux/store';

export default function PromoteCard() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);
  const [promoteKey, setPromoteKey] = useState('');

  function promote() {
    dispatch(new PromoteUserAction(user.apiKey || '', promoteKey));
  }

  return (
    <Card>
      <Card.Title>Promote a User</Card.Title>
      <Card.Divider />
      <Input
        label="User to Promote"
        placeholder="API Key"
        onChangeText={(text) => setPromoteKey(text)}
      />
      <Button title="Promote" onPress={promote} />
    </Card>
  );
}
