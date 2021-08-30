import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Button } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';
import { useDispatch, useSelector } from 'react-redux';
import { IItem } from '../models/Item';
import { IOrder } from '../models/Order';
import { IUser } from '../models/User';
import { GetAllItemsAction } from '../redux/actions/ItemActions';
import { PlaceOrderAction } from '../redux/actions/OrderActions';
import { RootStore } from '../redux/store';

export default function PlaceOrderScreen() {
  const items: IItem[] = useSelector((state: RootStore) => state.items);
  const user: IUser = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const [newOrder, setOrder] = useState<IOrder>({
    user: `${user.firstName} ${user.lastName}`,
    items: [],
  });

  useEffect(() => {
    if (items.length <= 0) dispatch(new GetAllItemsAction().toPlainObject());
  }, []);

  function placeOrder() {
    dispatch(new PlaceOrderAction(newOrder, user.apiKey || '').toPlainObject());
  }

  function onItemsChange(selectedItems: any[]) {
    setOrder({ ...newOrder, items: selectedItems });
  }

  return (
    <Card>
      <Card.Title>Place an Order</Card.Title>
      <Card.Divider />
      <MultiSelect
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onItemsChange}
        selectText="Select Items"
        selectedItems={newOrder.items}
      />
      <Button title="Place Order" onPress={placeOrder} />
    </Card>
  );
}
