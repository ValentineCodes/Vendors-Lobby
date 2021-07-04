import {TextInput, Searchbar, Avatar, Badge} from 'react-native-paper';
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
  Modal,
  Linking,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
//Components
import ProductDisplay from '../components/ProductCard';
import Colors from '../constants/colors';
import DefaultCard from '../components/DefaultCard';

export default function Product({route, navigation}) {
  const [images, setImages] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  async function getImages() {
    try {
      const response = await fetch(
        `http://9cdabd8a09bb.ngrok.io/uploads/get_images?productID=${route.params.productID}`,
      );
      const data = await response.json();

      console.log('We got it');
      console.log(data);
      console.log('Images are here');
      setImages(data);
    } catch (err) {
      console.log('Could Not Get UImages:(:', err);
    }
  }

  useEffect(() => {
    getImages();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.headerContainer}>
        {/* Header Left */}
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.pop()}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5}}>
            <Icon name="arrow-back" type="ionicon" size={28} />
            <Text
              style={{
                fontSize: 22,
                marginLeft: 5,
              }}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        {/* Header Right */}
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="brush" size={25} style={{marginRight: 18}} />
          </TouchableOpacity>

          <Icon name="cart-outline" type="ionicon" style={{marginRight: 18}} />
          <Icon
            name="ellipsis-vertical"
            type="ionicon"
            style={{marginRight: 11}}
          />
        </View>
      </View>

      {/*Product Images*/}
      {images.length == 0 ? (
        <View />
      ) : (
        <View style={{marginHorizontal: 12, marginTop: 10}}>
          <ScrollView horizontal={true}>
            {images.images.map((image) => {
              return (
                <View
                  key={Math.random().toString()}
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: 'white',
                    marginHorizontal: 3,
                  }}>
                  <Image
                    source={{uri: image.url}}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      <ScrollView>
        {/* Other Products' Details */}
        <View
          style={{
            padding: 10,
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
          }}>
          {/* Product Name */}
          <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
            {route.params.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              {/* Price */}
              <Text style={styles.price}>{route.params.price}</Text>
              {/* Timestamp */}
              <Text style={{marginTop: 5}}>{route.params.timestamp}</Text>
            </View>

            {/* Icons */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 13,
              }}>
              <View style={{marginRight: 10}}>
                <Icon name="cart-outline" type="ionicon" />
                <Icon
                  name="phone"
                  onPress={() =>
                    Linking.openURL(`tel:${route.params.phoneNumber}`)
                  }
                  style={{marginTop: 7}}
                />
              </View>

              {/* Like Icon */}
              <TouchableOpacity>
                <Icon
                  name="heart-outline"
                  type="ionicon"
                  style={{marginTop: 2}}
                />
                <Badge
                  size={15}
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -7,
                    backgroundColor: 'rgba(255,0,0,0.7)',
                    fontWeight: 'bold',
                  }}>
                  {route.params.likes}
                </Badge>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* User Details */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 0.5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image
              source={require('../images/OniUltraVypa.png')}
              size={Dimensions.get('screen').width / 8}
              style={{marginRight: 5}}
            />

            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                DevPlayground's Shop
              </Text>
              <Text>
                @
                {route.params.school.length <= 20
                  ? route.params.school
                  : route.params.school
                      .slice(0, Dimensions.get('screen').width / 12)
                      .padEnd(Dimensions.get('screen').width / 12 + 3, '.')}
              </Text>
            </View>
          </View>

          <Icon
            name="chatbox-outline"
            type="ionicon"
            style={{marginRight: 13}}
          />
        </View>

        {/* Description */}

        {route.params.description == false ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25}}>No Description</Text>
          </View>
        ) : (
          <Text style={{marginLeft: 10, marginTop: 10}}>
            {route.params.description}
          </Text>
        )}

        {/* Similar Products */}
        <View style={{marginTop: 10, borderTopWidth: 0.5, paddingTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Similar Products
            </Text>
            <Text style={{color: Colors.primary, fontStyle: 'italic'}}>
              See More{' '}
            </Text>
          </View>
          {/* Products */}
          {similarProducts.length == 0 ? (
            <ScrollView horizontal={true}>
              <DefaultCard />

              <DefaultCard />

              <DefaultCard />
            </ScrollView>
          ) : (
            <FlatList
              data={similarProducts}
              keyExtractor={(product) => product._id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}
              renderItem={(product) => (
                <TouchableOpacity>
                  <ProductDisplay
                    image={product.item.images[0].url}
                    name={product.item.name}
                    price={product.item.price}
                    timestamp={product.item.timestamp}
                    school={product.item.school}
                    numberOfLikes={product.item.numberOfLikes}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Recommended Products */}
        <View style={{marginVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              You May Also Like
            </Text>
            <Text style={{color: Colors.primary, fontStyle: 'italic'}}>
              See More{' '}
            </Text>
          </View>
          {/* Products */}
          {recommended.length == 0 ? (
            <ScrollView horizontal={true}>
              <DefaultCard />

              <DefaultCard />

              <DefaultCard />
            </ScrollView>
          ) : (
            <FlatList
              data={recommended}
              keyExtractor={(product) => product._id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10}}
              renderItem={(product) => (
                <TouchableOpacity>
                  <ProductDisplay
                    image={product.item.images[0].url}
                    name={product.item.name}
                    price={product.item.price}
                    timestamp={product.item.timestamp}
                    school={product.item.school}
                    numberOfLikes={product.item.numberOfLikes}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
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
    marginHorizontal: 4,
    marginVertical: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
