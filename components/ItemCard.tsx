import React from 'react';
import { View, Text } from 'react-native';

export default function ItemCard(props: any) {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
}
