import * as React from 'react';
import { RootStore } from '../redux/store';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { GetAllItemsAction } from '../redux/actions/ItemActions';
import Item from '../models/Item';
import ItemCard from '../components/ItemCard';

export default function ItemsScreen() {
  const items: Item[] = useSelector((state: RootStore) => state.items);
  const refreshing = useSelector((state: RootStore) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    dispatch(new GetAllItemsAction().toPlainObject());
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemCard name={item.name} />}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </View>
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
