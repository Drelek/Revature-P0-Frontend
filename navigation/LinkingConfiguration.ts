/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Logo from '../assets/Logo';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          User: {
            screens: {
              
              UserScreen: 'user',
            },
          },
          Items: {
            screens: {
              ItemsScreen: 'items',
            },
          },
          Orders: {
            screens: {
              OrdersScreen: 'orders',
            },
          },
        },
      },
      'Edit Item': 'edit-item',
      'Add Item': 'add-item',
      'Place Order': 'place-order',
      NotFound: '*',
    },
  },
};

export default linking;
