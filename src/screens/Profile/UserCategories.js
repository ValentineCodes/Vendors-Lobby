import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Category from '../../components/Category';

export default function UserCategories() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Category
          category="Audio and Music Equipments"
          productCount={20}
          iconName="headset-outline"
          iconType="ionicon"
        />

        <Category
          category="Bags"
          productCount={20}
          iconName="handbag"
          iconType="simple-line-icon"
        />

        <Category
          category="Books"
          productCount={20}
          iconName="book"
          iconType="font-awesome"
        />

        <Category
          category="Calculators"
          productCount={20}
          iconName="calculator-outline"
          iconType="ionicon"
        />

        <Category
          category="Clothing"
          productCount={20}
          iconName="shirt-outline"
          iconType="ionicon"
        />

        <Category
          category="Clothing Accessories"
          productCount={20}
          iconName="glasses"
          iconType="ionicon"
        />

        <Category
          category="Computer Accessories"
          productCount={20}
          iconName="plug"
          iconType="font-awesome"
        />

        <Category
          category="Computer Hardware"
          productCount={20}
          iconName="keyboard-o"
          iconType="font-awesome"
        />

        <Category
          category="Footwear"
          productCount={20}
          iconName="settings"
          iconType="ionicon"
        />

        <Category
          category="Furniture"
          productCount={20}
          iconName="bed-outline"
          iconType="ionicon"
        />

        <Category
          category="Games and Consoles"
          productCount={20}
          iconName="game-controller"
          iconType="simple-line-icon"
        />

        <Category
          category="Gaming Equipments"
          productCount={20}
          iconName="game-controller-outline"
          iconType="ionicon"
        />

        <Category
          category="Generators"
          productCount={20}
          iconName="shirt-outline"
          iconType="ionicon"
        />

        <Category
          category="Health and Beauty"
          productCount={20}
          iconName="shirt-outline"
          iconType="ionicon"
        />

        <Category
          category="Home Appliances"
          productCount={20}
          iconName="signal"
          iconType="font-awesome"
        />

        <Category
          category="Jewelry"
          productCount={20}
          iconName="shirt-outline"
          iconType="ionicon"
        />

        <Category
          category="Kitchen Utensils"
          productCount={20}
          iconName="restaurant-outline"
          iconType="ionicon"
        />

        <Category
          category="Laptops and Desktops"
          productCount={20}
          iconName="laptop-outline"
          iconType="ionicon"
        />

        <Category
          category="Phones and Tablets"
          productCount={20}
          iconName="phone-portrait-outline"
          iconType="ionicon"
        />

        <Category
          category="Phones and Tablets Accessories"
          productCount={20}
          iconName="plug"
          iconType="font-awesome"
        />

        <Category
          category="Services"
          productCount={20}
          iconName="handshake-o"
          iconType="font-awesome"
        />

        <Category
          category="TV and DVD Equipments"
          productCount={20}
          iconName="tv-outline"
          iconType="ionicon"
        />

        <Category
          category="Watches"
          productCount={20}
          iconName="watch-outline"
          iconType="ionicon"
        />

        <Category
          category="Other Products"
          productCount={20}
          iconName="ellipsis-horizontal-outline"
          iconType="ionicon"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
});
