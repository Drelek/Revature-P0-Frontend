import React from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IItem } from '../models/Item';
import { IUser } from '../models/User';
import { CreateItemAction } from '../redux/actions/ItemActions';
import { RootStore } from '../redux/store';

export default function AddItemScreen() {
  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);
  const [newItem, setNewItem] = useState<IItem>({
    name: '',
    description: '',
    price: 0,
    tags: [],
  });

  function addItem() {
    dispatch(new CreateItemAction(newItem, user.apiKey || '').toPlainObject());
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>Add Item</Card.Title>
        <Card.Divider />
        <Input
          label="Name"
          placeholder="Item Name"
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <Input
          label="Description"
          placeholder="Item Description"
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline={true}
        />
        <Input
          label="Price"
          placeholder="Item Price in Dollars"
          onChangeText={(text) =>
            setNewItem({ ...newItem, price: Number(text) })
          }
          keyboardType="decimal-pad"
        />
        <Input
          label="Tags (separated by a comma and a space)"
          placeholder="Tags"
          onChangeText={(text) =>
            setNewItem({ ...newItem, tags: text.split(', ') })
          }
        />
        <Button title="Add Item" onPress={addItem} />
      </Card>
    </ScrollView>
  );
}
