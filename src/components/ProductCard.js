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
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Badge} from 'react-native-paper';
import Colors from '../constants/colors';

export default function ProductDisplay(props) {
  const [isLiked, setIsLiked] = useState(false);

  function likeProduct() {
    setIsLiked((state) => !state);
    fetch(
      `http://9cdabd8a09bb.ngrok.io/uploads/like_product/${props.productID}`,
      {
        method: 'post',
      },
    );
  }

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={
          props.image == ''
            ? require('../images/defaultImage3.png')
            : {uri: props.image}
        }
        resizeMode="contain"
        style={styles.image}
      />

      {/* Name */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 2,
          color: '#444',
        }}>
        {props.name.length <= 20
          ? props.name
          : props.name
              .slice(0, Dimensions.get('screen').width / 18)
              .padEnd(Dimensions.get('screen').width / 18 + 3, '.')}
      </Text>

      {/* School */}
      <Text style={{fontSize: 10, fontStyle: 'italic'}}>
        @
        {props.school.length <= 20
          ? props.school
          : props.school
              .slice(0, Dimensions.get('screen').width / 14)
              .padEnd(Dimensions.get('screen').width / 14 + 3, '.')}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* Price */}
        <Text style={{fontWeight: 'bold', fontSize: 12, marginLeft: 2}}>
          #{props.price}
        </Text>

        {/* Timestamp */}
        <Text style={{fontSize: 12}}>{props.timestamp}</Text>
      </View>

      {/* Footer */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* Heart Icon */}
        <TouchableOpacity
          onPress={likeProduct}
          style={{
            ...styles.icons,
            borderRightWidth: 0.5,
            borderColor: Colors.primary,
          }}>
          {isLiked ? (
            <Icon
              name="heart"
              type="ionicon"
              style={{marginTop: 2}}
              color="red"
            />
          ) : (
            <Icon name="heart-outline" type="ionicon" style={{marginTop: 2}} />
          )}

          <Badge
            size={15}
            style={{
              position: 'absolute',
              top: 0,
              right: 2,
              backgroundColor: 'rgba(255,0,0,0.7)',
              fontWeight: 'bold',
            }}>
            {isLiked ? props.likes + 1 : props.likes}
          </Badge>
        </TouchableOpacity>

        {/* Cart Icon */}
        <TouchableOpacity
          style={{
            ...styles.icons,
            borderRightWidth: 0.5,
            borderColor: Colors.primary,
          }}>
          <Icon name="cart-outline" type="ionicon" />
        </TouchableOpacity>

        {/* Call Icon */}
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${props.phoneNumber}`)}
          style={styles.icons}>
          <Icon name="call-outline" type="ionicon" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 2.3,
    paddingVertical: 5,
    backgroundColor: 'white',
    marginHorizontal: 7.5,
    marginBottom: 2,
    borderRadius: 15,
    paddingHorizontal: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 80,
  },
  icons: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
