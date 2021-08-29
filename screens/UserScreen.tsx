import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import LoginCard from '../components/LoginCard';
import { Text, View } from '../components/Themed';
import UserCard from '../components/UserCard';
import { IUser } from '../models/User';
import { RootStore } from '../redux/store';
import { RootTabScreenProps } from '../types';

export default function UserScreen({ navigation }: RootTabScreenProps<'User'>) {
  const user: IUser = useSelector((state: RootStore) => state.user);
  const refreshing = useSelector((state: RootStore) => state.loading);

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        {!user.apiKey && <LoginCard />}
        {user.apiKey && <UserCard />}
      </ScrollView>
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
