import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {Avatar} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ImagePicker from 'react-native-image-crop-picker';
// screens
import UserProducts from './UserProducts';
import UserCategories from './UserCategories';

import Colors from '../../constants/colors';

const Tab = createMaterialTopTabNavigator();

export default function Profile({navigation}) {
  const [products, setProducts] = useState([]);

  function chooseImageFromLibrary() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      multiple: true,
      compressImageQuality: 0.7,
    })
      .then((response) => {
        const selectedProducts = [];
        response.map((product) =>
          selectedProducts.push({
            key: Math.random().toString(),
            image: product.path,
          }),
        );
        setProducts((currentProducts) => [
          ...selectedProducts,
          ...currentProducts,
        ]);
      })
      .catch((err) => {
        return;
      });
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Header Left */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="arrow-back" type="ionicon" size={28} />
          <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 15}}>
            Profile
          </Text>
        </TouchableOpacity>
        {/* Header Right */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={chooseImageFromLibrary}>
            <Icon name="brush" size={25} style={{marginRight: 15}} />
          </TouchableOpacity>

          <Icon name="cart-outline" type="ionicon" style={{marginRight: 15}} />
          <Icon
            name="ellipsis-vertical"
            type="ionicon"
            style={{marginRight: -11}}
          />
        </View>
      </View>

      {/* ... */}
      <View style={{alignItems: 'center', marginTop: 10}}>
        {/* Profile Image */}
        <Avatar.Image
          source={require('../../images/OniUltraVypa.png')}
          size={Dimensions.get('screen').width / 3}
        />
        {/* Name */}
        <Text style={styles.name}>DevPlayground</Text>
        {/* School */}
        <Text style={styles.school}>@Nnamdi Azikiwe University</Text>
        {/* Description */}
        <Text style={styles.description}>
          Some shii about some bullshii thats related and unrelated to some
          bullcrap stemed from some shuu full of shii
        </Text>
      </View>
      {/* Tab Navigator */}
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: 'black',
          pressColor: Colors.primary,
          indicatorStyle: {
            backgroundColor: Colors.primary,
          },
        }}>
        <Tab.Screen
          name="Uploads"
          component={UserProducts}
          initialParams={{
            products: products,
          }}
        />
        <Tab.Screen name="Categories" component={UserCategories} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingTop: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 5,
  },
  school: {
    fontStyle: 'italic',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 2,
  },
  description: {
    textAlign: 'center',
    marginTop: 2,
  },
});
