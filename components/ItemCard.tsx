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
    <Card containerStyle={styles.container}> 
      <Card.Title style={styles.heading}>{item.name}</Card.Title>
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
              buttonStyle={styles.deleteButton}
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
    backgroundColor: '#9cb8d4',
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
   backgroundColor:'#123456',
   borderRadius:10,
  },
  deleteButton:
  {
    marginLeft: 10,
    marginRight: 10,
    minWidth: '40%',
   backgroundColor:'#8e0000',
   borderRadius:10,
  },
  div: {
    marginTop: 5,
  },
  subHeading: {
    color:'#123456',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  center: {
    justifyContent: 'center',
  },
  container:{
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 15,

  },
  heading:{
    color:'#fff',
    backgroundColor:'#123456',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 1,
    borderRadius:10,
    padding: 10,
  }
});
