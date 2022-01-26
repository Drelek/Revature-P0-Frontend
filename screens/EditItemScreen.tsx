import React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IItem } from '../models/Item';
import { IUser } from '../models/User';
import { UpdateItemAction } from '../redux/actions/ItemActions';
import { RootStore } from '../redux/store';

export default function EditItemScreen({ route }: any) {
  const item = route.params;

  const dispatch = useDispatch();
  const user: IUser = useSelector((state: RootStore) => state.user);
  const [newItem, setNewItem] = useState<IItem>({
    ...item,
  });

  function editItem() {
    dispatch(new UpdateItemAction(newItem, user.apiKey || '').toPlainObject());
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>Edit Item</Card.Title>
        <Card.Divider />
        <Input
          label="Name"
          placeholder={item.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <Input
          label="Description"
          placeholder={item.description}
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline={true}
        />
        <Input
          label="Price"
          placeholder={String(item.price)}
          onChangeText={(text) =>
            setNewItem({ ...newItem, price: Number(text) })
          }
          keyboardType="decimal-pad"
        />
        <Input
          label="Tags (separated by a comma and a space)"
          placeholder={item.tags.join(', ')}
          defaultValue={item.tags.join(', ')}
          onChangeText={(text) =>
            setNewItem({ ...newItem, tags: text.split(', ') })
          }
        />
        <Button title="Update Item" onPress={editItem} />
      </Card>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  button:{
    backgroundColor:'#123456',
    width:"33%",
    alignSelf:'flex-end',
    marginRight:5,
    marginBottom:5,
    marginTop:25
  }
});
