import * as React from 'react';
import { RootStore } from '../redux/store';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { GetAllItemsAction } from '../redux/actions/ItemActions';
import Item from '../models/Item';
import ItemCard from '../components/ItemCard';
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { IUser } from '../models/User';
import { RootTabScreenProps } from '../types';

export default function ItemsScreen({
  navigation,
}: RootTabScreenProps<'Items'>) {
  const user: IUser = useSelector((state: RootStore) => state.user);
  const items: Item[] = useSelector((state: RootStore) => state.items);
  const refreshing = useSelector((state: RootStore) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    refresh();
  }, [user]);

  function refresh() {
    dispatch(new GetAllItemsAction().toPlainObject());
  }

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListFooterComponent={<View style={{ height: 90 }} />}
      />
      {user.admin && (
        <FAB
          placement="right"
          color="teal"
          icon={<Icon name="add" color="white" />}
          onPress={() => navigation.navigate('AddItem')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
