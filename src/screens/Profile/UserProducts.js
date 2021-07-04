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
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import ProductCard from '../../components/ProductCard';

export default function UserProducts({route}) {
  const [allProducts, setAllProducts] = useState([]);
  const {key, image} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 1,
      }}>
      {allProducts.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.3,
          }}>
          <Icon name="book" type="font-awesome" size={120} />
          <Text style={{fontSize: 25, textAlign: 'center'}}>
            You haven't posted anything
          </Text>
        </View>
      ) : (
        <FlatList
          data={allProducts}
          numColumns={2}
          keyExtractor={(product) => product._id}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: -20}}
          renderItem={(product) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UploadDetails', {
                  productID: product.item._id,
                  name: product.item.name,
                  price: product.item.price,
                  description: product.item.description,
                  timestamp: product.item.timestamp,
                  school: product.item.school,
                  numberOfLikes: product.item.numberOfLikes,
                  phoneNumber: product.item.phoneNumber,
                })
              }
              style={{marginLeft: 5, marginTop: 10}}>
              <ProductCard
                image={product.item.images[0].url}
                name={product.item.name}
                price={product.item.price}
                timestamp={product.item.timestamp}
                school={product.item.school}
                numberOfLikes={product.item.numberOfLikes}
                phoneNumber={product.item.phoneNumber}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
