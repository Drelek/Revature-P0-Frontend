import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import { FAB, Icon, Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../components/OrderCard';
import { Order } from '../models/Order';
import { IUser } from '../models/User';
import { GetAllOrdersAction } from '../redux/actions/OrderActions';
import { RootStore } from '../redux/store';

export default function OrdersScreen() {
  const orders: Order[] = useSelector((state: RootStore) => state.orders);
  const refreshing = useSelector((state: RootStore) => state.loading);
  const user: IUser = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function refresh() {
    dispatch(new GetAllOrdersAction(user.apiKey || '').toPlainObject());
  }

  useEffect(() => {
    refresh();
  }, [user]);

  return (
    <SafeAreaView>
      {!user.apiKey && (
        <Card containerStyle={styles.container}>
          <Card.Title>Please sign in to view or place orders.</Card.Title>
        </Card>
      )}
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item) => String(item.receipt)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        style={styles.base}
        ListFooterComponent={<View style={{ height: 90 }} />}
      />
      {user.apiKey && (
        <FAB
          placement="right"
          color="#123456"
          icon={<Icon name="add" color="white" />}
          onPress={() => navigation.navigate('Place Order')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

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
    margin: 15,
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
      

});
