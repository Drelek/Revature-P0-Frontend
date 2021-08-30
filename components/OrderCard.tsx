import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    dispatch(
      new CancelOrderAction(
        item.receipt || -1,
        user.apiKey || ''
      ).toPlainObject()
    );
  }

  return (
    <Card>
      <Card.Title>{`Placed: ${item.timestamp}`}</Card.Title>
      <Card.Divider />
      <View style={styles.row}>
        <Text style={styles.left}>Receipt:</Text>
        <Text style={styles.right}>{item.receipt}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.left}>Selected Items:</Text>
        <Text style={styles.right}>{item.items.join(', ')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.left}>Order Total:</Text>
        <Text style={styles.right}>${item.total}</Text>
      </View>
      {Date.now() - Number(item.receipt) < 600000 && (
        <Button title="Cancel Order" onPress={cancelOrder} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: '#abdbd0',
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  left: {
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  right: {
    textAlignVertical: 'center',
    textAlign: 'right',
    flex: 1,
  },
});
