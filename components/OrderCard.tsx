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
    <Card containerStyle={styles.container}>
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
        <Button buttonStyle={styles.button} title="Cancel Order" onPress={cancelOrder} />
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
    paddingLeft:15,
    paddingRight:15,
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
  button:{
    backgroundColor:'#8e0000',
    alignSelf:'center',
    margin:5,
    borderRadius:10,
    width:"90%",
  },
  container: {

    backgroundColor: '#fffffe',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    margin:25,
  }
});
