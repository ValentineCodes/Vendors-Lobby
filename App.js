import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
//Screens
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';
import Home from './src/screens/Home';
import Post from './src/screens/Post';
import Profile from './src/screens/Profile/Profile';
import Product from './src/screens/Product';
import Cart from './src/screens/Cart';
import Category from './src/screens/Category';
import CategoryList from './src/screens/CategoryList';

import Colors from './src/constants/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Category"
            component={Category}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
