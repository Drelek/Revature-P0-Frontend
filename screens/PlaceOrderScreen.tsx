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
import { StyleSheet } from 'react-native';
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
    if (newOrder.items.length==0){
      alert("You cannot have a blank order!");
  }else{
     
      dispatch(new PlaceOrderAction(newOrder, user.apiKey || '').toPlainObject());
  }
}

  function onItemsChange(selectedItems: any[]) {
    setOrder({ ...newOrder, items: selectedItems });
  }

  return (
    <Card containerStyle={styles.container}>
      <Card.Title style={styles.heading}>Create your Order</Card.Title>
      <Card.Divider />
      <MultiSelect
        items={items}
        uniqueKey="id"
        onSelectedItemsChange={onItemsChange}
        selectText="Select Items"
        selectedItems={newOrder.items}
        submitButtonColor="#123456"
        submitButtonText="Finalize Order"
        tagBorderColor="#123456"
        tagTextColor="#123456"
        selectedItemTextColor="#8e0000"
        selectedItemIconColor="#8e0000"
      />
      <Button buttonStyle={styles.button} title="Place Order" onPress={placeOrder} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fffffe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  base: {
    minHeight: '100%',
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
  },
  button:{
    backgroundColor:'#123456',
    width:"33%",
    alignSelf:'flex-end',
    marginRight:5,
    marginBottom:5,
    marginTop:25



  }
});
