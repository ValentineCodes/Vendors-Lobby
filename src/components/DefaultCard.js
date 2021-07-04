import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../constants/colors';

export default function DefaultCard() {
  return (
    <View style={styles.container}>
      <Icon
        name="images-outline"
        type="ionicon"
        size={40}
        color={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 2.3,
    height: Dimensions.get('screen').width / 2.3,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 10,
    marginTop: 10,
  },
});
