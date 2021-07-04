import {Badge} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import ProductCard from '../components/ProductCard';
import Colors from '../constants/colors';

export default function Category({route, navigation}) {
  const [renderedComponent, setRenderedComponent] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfLoadedProducts, setNumOfLoadedProducts] = useState(
    products.length,
  );

  function getProducts() {
    fetch(
      `http://9cdabd8a09bb.ngrok.io/uploads/${route.params.category.replace(
        / /g,
        '_',
      )}?numOfLoadedProducts=${numOfLoadedProducts}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('We got it');
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => console.log('Could Not Get Uploads:(:', err))
      .finally(() => {
        console.log('Ballsy');
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Header Left */}
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.pop()}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="arrow-back"
              type="ionicon"
              size={28}
              color="rgba(255,255,255,0.9)"
            />
            <Text
              style={{
                fontSize: 22,
                marginLeft: 15,
                color: 'rgba(255,255,255,0.9)',
              }}>
              {route.params.category.length <= 20
                ? route.params.category
                : route.params.category
                    .slice(0, Dimensions.get('screen').width / 16)
                    .padEnd(Dimensions.get('screen').width / 16 + 3, '.')}
            </Text>
          </View>
        </TouchableOpacity>
        {/* Header Right */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Cart', {
              cartID: '12345',
            })
          }>
          <Icon
            name="cart-outline"
            type="ionicon"
            style={{marginRight: 25}}
            color="rgba(255,255,255,0.9)"
          />
          <Badge
            size={15}
            style={{
              position: 'absolute',
              top: -4,
              right: 11,
              backgroundColor: 'rgba(255,0,0,0.7)',
              fontWeight: 'bold',
            }}>
            25
          </Badge>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar
        platform="ios"
        placeholder="What Product Do You Have In Mind?"
      />
      {/* Filter and Sort */}
      <View style={styles.filterNSortContainer}>
        {/* Filter */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Icon name="filter-list" size={24} color={Colors.primary} />
          <Text style={{fontSize: 20}}>Filter</Text>
        </TouchableOpacity>
        {/* Sort */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            borderStartWidth: 0.5,
          }}>
          <Icon
            name="swap-vertical"
            type="ionicon"
            size={20}
            color={Colors.primary}
          />
          <Text style={{fontSize: 20}}>Sort </Text>
        </TouchableOpacity>
      </View>

      {/* Products */}

      <ActivityIndicator
        animating={isLoading}
        color={Colors.primary}
        size="large"
      />
      {products.length == 0 && isLoading == false ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Posts Yet</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(product) => product._id}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: -20}}
          renderItem={(product) => (
            <TouchableOpacity
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    paddingVertical: 7,
  },
  filterNSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    elevation: 1,
    borderWidth: 0.1,
  },
  icons: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
