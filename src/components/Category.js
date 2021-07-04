import {Badge} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../constants/colors';

export default function Category({category, productCount, iconName, iconType}) {
  return (
    <View style={styles.container}>
      <Icon
        name={iconName}
        type={iconType}
        size={styles.icon.fontSize}
        color={styles.icon.color}
      />
      <Text style={{textAlign: 'center'}}>{category}</Text>

      <Badge
        size={18}
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          backgroundColor: 'rgba(255,0,0,0.7)',
          fontWeight: 'bold',
        }}>
        {productCount}
      </Badge>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: '33%',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 35,
    color: Colors.primary,
  },
});
