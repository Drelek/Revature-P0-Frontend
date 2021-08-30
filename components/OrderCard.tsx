import React from 'react';
import { Text } from 'react-native-elements';
import { Card, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IOrder } from '../models/Order';
import { IUser } from '../models/User';
import { CancelOrderAction } from '../redux/actions/OrderActions';
import { RootStore } from '../redux/store';

export default function OrderCard({ item }: { item: IOrder }) {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);

  function cancelOrder() {
    dispatch(new CancelOrderAction(item.receipt || -1, user.apiKey || ''));
  }

  return (
    <Card>
      <Card.Title>{new Date(item.timestamp || '').toLocaleString()}</Card.Title>
      <Card.Divider />
      <Text>{item.receipt}</Text>
      <Text>{item.items}</Text>
      <Text>{item.total}</Text>
      {Date.now() - Number(item.timestamp) < 600000 && (
        <Button title="Cancel Order" onPress={cancelOrder} />
      )}
    </Card>
  );
}
