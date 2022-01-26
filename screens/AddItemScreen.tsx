import React from 'react';
import { useState } from 'react';
import { ScrollView , StyleSheet} from 'react-native';
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
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.header}>Enter New Item</Card.Title>
        <Card.Divider />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Name"
          placeholder="Item Name"
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Description"
          placeholder="Item Description"
          onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          multiline={true}
        />
        <Input
        inputStyle={styles.input}
        labelStyle={styles.label}
          label="Price"
          placeholder="Item Price in Dollars"
          onChangeText={(text) =>
            setNewItem({ ...newItem, price: Number(text) })
          }
          keyboardType="decimal-pad"
        />
        <Input
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Tags (separated by a comma and a space)"
          placeholder="Tags"
          onChangeText={(text) =>
            setNewItem({ ...newItem, tags: text.split(', ') })
          }
        />
        <Button buttonStyle={styles.button} title="Add Item" onPress={addItem} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
  backgroundColor: '#fffffe',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  button:{
    backgroundColor:'#123456',
    borderRadius:8,
    margin:5,
    width: '30%',
    alignSelf:'flex-end'
  }  ,
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
  header:{
    color:'#fff',
    backgroundColor:'#123456',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 1,
    marginBottom: 1,
    borderRadius:5,
    padding: 10,
  }
});