import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//Components
import ProductCard from './ProductCard';
import DefaultCard from './DefaultCard';
import Colors from '../constants/colors';

export default function CategoryDisplay({productArray, category}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: category == 'Other Products' ? 90 : 0,
      }}>
      <View style={styles.categoryScrollHeader}>
        <Text style={styles.categoryName}>{category}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Category', {
              category: category,
            })
          }>
          <Text style={{color: Colors.primary, fontStyle: 'italic'}}>
            See More{' '}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products */}
      {productArray.length == 0 ? (
        // Default Card Before Product Loads Up From Database
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <DefaultCard />

          <DefaultCard />

          <DefaultCard />
        </ScrollView>
      ) : (
        // Loaded Products
        <FlatList
          data={productArray}
          keyExtractor={(product) => product._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          renderItem={(product) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('Product', {
                  productID: product.item._id,
                  name: product.item.name,
                  price: product.item.price,
                  description: product.item.description,
                  timestamp: product.item.timestamp,
                  school: product.item.school,
                  likes: product.item.likes,
                  phoneNumber: product.item.phoneNumber,
                })
              }
              style={{marginLeft: 5, marginTop: 10}}>
              <ProductCard
                productID={product.item._id}
                image={product.item.images[0].url}
                name={product.item.name}
                price={product.item.price}
                timestamp={product.item.timestamp}
                school={product.item.school}
                likes={product.item.likes}
                phoneNumber={product.item.phoneNumber}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoryScrollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
