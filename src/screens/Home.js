import {Avatar, Badge} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
//Components
import CategoryDisplay from '../components/CategoryDisplay';
import Colors from '../constants/colors';

export default function Home({navigation}) {
  const [recommendations, setRecommendations] = useState([]);
  const [phonesNTablets, setPhonesNTablets] = useState([]);
  const [laptopsNDesktops, setLaptopsNDesktops] = useState([]);
  const [audioNMusicEquipments, setAudioNMusicEquipments] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [footwear, setFootwear] = useState([]);
  const [watches, setWatches] = useState([]);
  const [healthNBeauty, setHealthNBeauty] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [services, setServices] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  function closePostModal() {
    setIsPostModalOpen(false);
  }

  async function fetchData(url, category, setProduct) {
    fetch(`${url}/uploads/${category}?numOfLoadedProducts=0`)
      .then((res) => res.json())
      .then((products) => {
        console.log('We got it');
        console.log(products);
        setProduct(products);
      })
      .catch((err) => console.log('Could Not Get Uploads:(:', err));
  }

  async function getProducts(url) {
    //Phones and Tablets
    await fetchData(url, 'Phones_and_Tablets', setPhonesNTablets);

    //Laptops and Desktops
    await fetchData(url, 'Laptops_and_Desktops', setLaptopsNDesktops);

    //Audio and Music Equipments
    await fetchData(
      url,
      'Audio_and_Music_Equipments',
      setAudioNMusicEquipments,
    );

    //Clothing
    await fetchData(url, 'Clothing', setClothing);

    //Footwear
    await fetchData(url, 'Footwear', setFootwear);

    //Watches
    await fetchData(url, 'Watches', setWatches);

    //Health and Beauty
    await fetchData(url, 'Health and Beauty', setHealthNBeauty);

    //Furniture
    await fetchData(url, 'Furniture', setFurniture);

    //Services
    await fetchData(url, 'Services', setServices);

    //Other Products
    await fetchData(url, 'Other_Products', setOtherProducts);
  }

  useEffect(() => {
    getProducts('http://9cdabd8a09bb.ngrok.io');
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>IMart</Text>
        </View>

        {/* Header Right */}
        <View style={styles.headerContainer}>
          <Icon
            name="chatbox-outline"
            type="ionicon"
            style={{marginRight: 25}}
            color="rgba(255,255,255,0.9)"
          />

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
            {/* Number of Items In Cart */}
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

          <Icon
            name="search"
            style={{marginRight: 25}}
            color="rgba(255,255,255,0.9)"
          />

          {/* Profile */}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}
            style={{marginRight: 10}}>
            <Avatar.Image
              source={require('../images/OniUltraVypa.png')}
              size={25}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* Categories */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 8,
          backgroundColor: Colors.primary,
        }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryContainer}>
            <Icon
              name="laptop-outline"
              type="ionicon"
              size={23}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={{color: 'rgba(255,255,255,0.9)'}}>Electronics</Text>
          </View>

          <View style={styles.categoryContainer}>
            <Icon
              name="shirt-outline"
              type="ionicon"
              size={23}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={{color: 'rgba(255,255,255,0.9)'}}>Fashion</Text>
          </View>

          <View style={styles.categoryContainer}>
            <Icon
              name="phone-portrait-outline"
              type="ionicon"
              size={23}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={{color: 'rgba(255,255,255,0.9)'}}>Phones</Text>
          </View>

          <View style={styles.categoryContainer}>
            <Icon
              name="bed-outline"
              type="ionicon"
              size={23}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={{color: 'rgba(255,255,255,0.9)'}}>Furnitures</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Categories')}
            style={styles.categoryContainer}>
            <Icon
              name="ellipsis-horizontal-outline"
              type="ionicon"
              size={23}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={{color: 'rgba(255,255,255,0.9)'}}>View All</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Popular Categories  */}
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: 10,
        }}>
        <Text style={styles.popularCategoriesText}>Popular Categories</Text>
        <ScrollView>
          {/* Recommended for you */}
          <CategoryDisplay
            productArray={recommendations}
            category="Recommended for you"
          />

          {/* Phones and Tablets */}
          <CategoryDisplay
            productArray={phonesNTablets}
            category="Phones and Tablets"
          />

          {/* Laptops and Desktops */}
          <CategoryDisplay
            productArray={laptopsNDesktops}
            category="Laptops and Desktops"
          />

          {/* Audio and Music Equipments */}
          <CategoryDisplay
            productArray={audioNMusicEquipments}
            category="Audio and Music Equipments"
          />

          {/* Clothing */}
          <CategoryDisplay productArray={clothing} category="Clothing" />

          {/* Footwear */}
          <CategoryDisplay productArray={footwear} category="Footwear" />

          {/* Watches */}
          <CategoryDisplay productArray={watches} category="Watches" />

          {/* Health and Beauty*/}
          <CategoryDisplay
            productArray={healthNBeauty}
            category="Health and Beauty"
          />

          {/* Furniture */}
          <CategoryDisplay productArray={furniture} category="Furniture" />

          {/* Services */}
          <CategoryDisplay productArray={services} category="Services" />

          {/* Other Products  */}
          <CategoryDisplay
            productArray={otherProducts}
            category="Other Products"
          />
        </ScrollView>
      </View>
      {/* Upload Button */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Post')}
        style={{position: 'absolute', bottom: 10, right: 10}}>
        <Icon
          reverse
          name="upload"
          type="font-awesome"
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 13,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width / 5,
    height: 50,
    borderRightWidth: 0.5,
  },
  popularCategoriesText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
});
