import {TextInput} from 'react-native-paper';
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
} from 'react-native';
import {Icon, Button} from 'react-native-elements';

export default function Login() {
  function logData() {
    fetch('http://192.168.43.186:3000/')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="chevron-left" size={35} />
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>AppName</Text>
        </View>
      </View>
      {/* ... */}

      <ScrollView>
        <View style={{marginTop: 60}}>
          <Text style={styles.bigText}>Welcome</Text>
          <Text style={styles.bigText}>Back!</Text>
          <Text style={{fontSize: 15}}>Good to see you again.</Text>
        </View>
        {/* Sign-in */}
        <View style={{marginTop: 60}}>
          <Text style={styles.bigText}>Sign in</Text>
          {/* Email Address */}
          <View style={styles.inputFieldContainer}>
            <Icon name="mail-outline" size={16} color="rgba(0,0,0,0.6)" />
            <TextInput label="Email Address" style={styles.inputField} />
          </View>
          {/* Password */}
          <View style={styles.inputFieldContainer}>
            <Icon
              name="key-outline"
              type="ionicon"
              size={16}
              color="rgba(0,0,0,0.6)"
            />
            <TextInput label="Password" style={styles.inputField} />
          </View>
          {/* Forgot Password */}
          <TouchableWithoutFeedback>
            <Text style={{textAlign: 'right', color: 'blue', marginTop: 5}}>
              Forgot password?
            </Text>
          </TouchableWithoutFeedback>
          {/* Sign in */}
          <TouchableOpacity onPress={logData}>
            <View style={styles.signIn}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
          {/* Social Sign in */}
          <View style={{alignItems: 'center', marginTop: 25}}>
            <Text>--or sign in with--</Text>
            <View style={styles.signInLogoContainer}>
              {/* Google */}
              <Button
                icon={
                  <Image
                    source={require('../images/google_logo.png')}
                    style={{height: 17, width: 17}}
                  />
                }
                ic
                buttonStyle={styles.signInLogo}
                raised
              />
              {/* Facebook */}
              <Button
                icon={
                  <Icon
                    name="facebook"
                    type="font-awesome"
                    color="#3b5998"
                    size={17}
                  />
                }
                buttonStyle={styles.signInLogo}
                raised
              />
            </View>
            <Text style={{marginTop: 25}}>
              Don't have an account?
              <Text style={{color: 'blue', fontStyle: 'italic'}}>Sign in</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: -12,
  },
  appNameContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  bigText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  inputField: {
    flex: 1,
  },
  signIn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 15,
  },
  signInLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 25,
  },
  signInLogo: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
