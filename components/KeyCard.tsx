import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { IUser } from '../models/User';
import { RootStore } from '../redux/store';

export default function KeyCard() {
  const user: IUser = useSelector((state: RootStore) => state.user);

  return (
    <Card containerStyle={styles.container}>
      <Card.Title>Your API Key</Card.Title>
      <Text selectable style={styles.middle}>
        {user.apiKey}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    textAlign: 'center',
  },
  container:{
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
    margin: 5,

  }
});
