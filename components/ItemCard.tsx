import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IItem } from '../models/Item';
import { IUser } from '../models/User';
import { DeleteItemAction } from '../redux/actions/ItemActions';
import { RootStore } from '../redux/store';
import { Card, Button } from 'react-native-elements';

export default function ItemCard({
  item,
  navigation,
}: {
  item: IItem;
  navigation: any;
}) {
  const user: IUser = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();

  function deleteItem() {
    dispatch(
      new DeleteItemAction(item.id || -1, user.apiKey || '').toPlainObject()
    );
  }

  function editItem() {
    navigation.navigate('EditItem', item);
  }

  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
      <View>
        {item.tags.map((tag) => (
          <Text key={tag}>{tag}</Text>
        ))}
      </View>
      {user.admin && (
        <>
          <Button title="Edit" onPress={editItem} />
          <Button title="Delete" onPress={deleteItem} />
        </>
      )}
    </Card>
  );
}
