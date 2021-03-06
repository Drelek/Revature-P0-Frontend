/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/UserScreen';
import TabTwoScreen from '../screens/ItemsScreen';
import TabThreeScreen from '../screens/OrdersScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import EditItemScreen from '../screens/EditItemScreen';
import AddItemScreen from '../screens/AddItemScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import { Icon } from 'react-native-elements';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Edit Item"
          component={EditItemScreen}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Add Item"
          component={AddItemScreen}
          options={{ headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Place Order"
          component={PlaceOrderScreen}
          options={{ headerTitleAlign: 'center' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="User"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'User'>) => ({
          title: 'User',
          tabBarIcon: ({ color }) => <Icon name="person" color={color} />,
          headerTitleAlign: 'center',
        })}
      />
      <BottomTab.Screen
        name="Items"
        component={TabTwoScreen}
        options={{
          title: 'Items',
          tabBarIcon: ({ color }) => <Icon name="storefront" color={color} />,
          headerTitleAlign: 'center',
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={TabThreeScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <Icon name="shop" color={color} />,
          headerTitleAlign: 'center',
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
