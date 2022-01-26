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
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.header}>Edit Item</Card.Title>
        <Card.Divider />
        <Input
        inputStyle={styles.input}
        labelStyle={styles.label}
          label="Name"
          placeholder={item.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <Input
        inputStyle={styles.input}
        labelStyle={styles.label}
          label="Description"
          placeholder={item.description}
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline={true}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Price"
          placeholder={String(item.price)}
          onChangeText={(text) =>
            setNewItem({ ...newItem, price: Number(text) })
          }
          keyboardType="decimal-pad"
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Tags (separated by a comma and a space)"
          placeholder={item.tags.join(', ')}
          defaultValue={item.tags.join(', ')}
          onChangeText={(text) =>
            setNewItem({ ...newItem, tags: text.split(', ') })
          }
        />
        <Button buttonStyle={styles.button} title="Update Item" onPress={editItem} />
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
    marginTop:25,
    borderRadius:10,
  },
  header:{
    color:'#fff',
    backgroundColor:'#123456',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 1,
    borderRadius:5,
    padding: 10,
  },
  container:{
    backgroundColor: '#fffffe',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    input:{
      fontSize:14,
      padding:5,
      backgroundColor: '#fffffe',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: 2,
      
    },
    label:{
      color:'#123456'
    },
});
