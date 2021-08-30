import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IItem } from '../models/Item';
import { IUser } from '../models/User';
import { DeleteItemAction } from '../redux/actions/ItemActions';
import { RootStore } from '../redux/store';
import { Card, Button, Text } from 'react-native-elements';

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
    navigation.navigate('Edit Item', item);
  }

  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Text style={styles.subHeading}>Description:</Text>
      <Text>{item.description}</Text>
      <Text style={styles.subHeading}>Price:</Text>
      <Text>${item.price}</Text>
      <Text style={styles.subHeading}>Tags:</Text>
      <View style={styles.tagHolder}>
        {item.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      {user.admin && (
        <>
          <Card.Divider style={styles.div} />
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.button}
              title="Edit"
              onPress={editItem}
            />
            <Button
              buttonStyle={styles.button}
              title="Delete"
              onPress={deleteItem}
            />
          </View>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 8,
    margin: 5,
    marginLeft: 0,
  },
  tagHolder: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    minWidth: '40%',
  },
  div: {
    marginTop: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  center: {
    justifyContent: 'center',
  },
});
