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
  TextInput,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [gender, setGender] = useState('');

  const [regErr, setRegErr] = useState('');
  const logData = () => {
    fetch('https://a34db6dedb35.ngrok.io/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        school,
        gender,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((users) => console.log(users))
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="chevron-left" size={35} />
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>AppName</Text>
        </View>
      </View>

      {/* Sign-in */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}>
          <Text style={styles.bigText}>Sign up</Text>
          <Text style={{fontSize: 15}}>We are happy to see you here.</Text>
          {/* First Name */}
          <View style={styles.inputFieldContainer}>
            <Icon name="person-outline" size={16} color="rgba(0,0,0,0.6)" />
            <TextInput
              placeholder="First Name"
              style={styles.inputField}
              returnKeyLabel="send"
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
            />
          </View>
          {/* Last Name */}
          <View style={styles.inputFieldContainer}>
            <Icon name="person-outline" size={16} color="rgba(0,0,0,0.6)" />
            <TextInput
              placeholder="Last Name"
              style={styles.inputField}
              returnKeyLabel="send"
              value={lastName}
              onChangeText={(value) => setLastName(value)}
            />
          </View>
          {/* Email */}
          <View style={styles.inputFieldContainer}>
            <Icon name="mail-outline" size={16} color="rgba(0,0,0,0.6)" />
            <TextInput
              placeholder="Email Address"
              style={styles.inputField}
              returnKeyLabel="send"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          {/* Password */}
          <View style={styles.inputFieldContainer}>
            <Icon
              name="key-outline"
              type="ionicon"
              size={16}
              color="rgba(0,0,0,0.6)"
            />
            <TextInput
              placeholder="Password"
              style={styles.inputField}
              returnKeyLabel="send"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          {/* Confirm Password */}
          <View style={styles.inputFieldContainer}>
            <Icon
              name="key-outline"
              type="ionicon"
              size={16}
              color="rgba(0,0,0,0.6)"
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.inputField}
              returnKeyLabel="send"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
          </View>
          {/* School */}
          <View style={styles.inputFieldContainer}>
            <Icon
              name="school-outline"
              type="ionicon"
              size={16}
              color="rgba(0,0,0,0.6)"
            />
            <Picker
              style={{flex: 1}}
              selectedValue={school}
              onValueChange={(value, index) => setSchool(value)}>
              <Picker.Item label="Select School" value="" />
              <Picker.Item
                label="Abia State University"
                value="Abia State University"
              />
              <Picker.Item
                label="Abubakar Tafawa Balewa University"
                value="Abubakar Tafawa Balewa University"
              />
              <Picker.Item
                label="Achievers University, Owo"
                value="Achievers University, Owo"
              />
              <Picker.Item
                label="Adamawa State University"
                value="Adamawa State University"
              />
              <Picker.Item
                label="Adekunle Ajasin University"
                value="Adekunle Ajasin University"
              />
              <Picker.Item
                label="Adeleke University"
                value="Adeleke University"
              />
              <Picker.Item
                label="Admiralty University of Nigeria"
                value="Admiralty University of Nigeria"
              />
              <Picker.Item
                label="Afe Babalola University"
                value="Afe Babalola University"
              />
              <Picker.Item
                label="African University of Science and Technology"
                value="African University of Science and Technology"
              />
              <Picker.Item
                label="Ahmadu Bello University"
                value="Ahmadu Bello University"
              />
              <Picker.Item
                label="Ajayi Crowther University"
                value="Ajayi Crowther University"
              />
              <Picker.Item
                label="Akwa Ibom State University"
                value="Akwa Ibom State University"
              />
              <Picker.Item
                label="Alex Ekwueme Federal University, Ndufu-Alike"
                value="Alex Ekwueme Federal University, Ndufu-Alike"
              />
              <Picker.Item
                label="Al-Hikmah University"
                value="Al-Hikmah University"
              />
              <Picker.Item
                label="Al-Qalam University, Katsina"
                value="Al-Qalam University, Katsina"
              />
              <Picker.Item
                label="Ambrose Alli University"
                value="Ambrose Alli University"
              />
              <Picker.Item
                label="American University of Nigeria"
                value="American University of Nigeria"
              />
              <Picker.Item
                label="Anambra State University"
                value="Anambra State University"
              />
              <Picker.Item
                label="Anchor University, Lagos"
                value="Anchor University, Lagos"
              />
              <Picker.Item
                label="Arthur Jarvis University"
                value="Arthur Jarvis University"
              />
              <Picker.Item label="Atiba University" value="Atiba University" />
              <Picker.Item
                label="Augustine University"
                value="Augustine University"
              />

              <Picker.Item
                label="Babcock University"
                value="Babcock University"
              />
              <Picker.Item
                label="Bauchi State University"
                value="Bauchi State University"
              />
              <Picker.Item
                label="Bayero University Kano"
                value="Bayero University Kano"
              />
              <Picker.Item label="Baze University" value="Baze University" />
              <Picker.Item
                label="Bells University of Technology"
                value="Bells University of Technology"
              />
              <Picker.Item
                label="Benson Idahosa University"
                value="Benson Idahosa University"
              />
              <Picker.Item
                label="Benue State University"
                value="Benue State University"
              />
              <Picker.Item
                label="Bingham University"
                value="Bingham University"
              />
              <Picker.Item
                label="Borno State University"
                value="Borno State University"
              />
              <Picker.Item label="Bowen University" value="Bowen University" />

              <Picker.Item label="Caleb University" value="Caleb University" />
              <Picker.Item
                label="Caritas University"
                value="Caritas University"
              />
              <Picker.Item
                label="Chrisland University"
                value="Chrisland University"
              />
              <Picker.Item
                label="Christopher University"
                value="Christopher University"
              />
              <Picker.Item
                label="Chukwuemeka Odumegwu Ojukwu University"
                value="Chukwuemeka Odumegwu Ojukwu University"
              />
              <Picker.Item
                label="Clifford University"
                value="Clifford University"
              />
              <Picker.Item
                label="Coal City University"
                value="Coal City University"
              />
              <Picker.Item
                label="Covenant University"
                value="Covenant University"
              />
              <Picker.Item
                label="Crawford University"
                value="Crawford University"
              />
              <Picker.Item
                label="Crescent University, Abeokuta"
                value="Crescent University, Abeokuta"
              />
              <Picker.Item
                label="Cross River University of Technology"
                value="Cross River University of Technology"
              />
              <Picker.Item
                label="Crown Hill University"
                value="Crown Hill University"
              />

              <Picker.Item
                label="Delta State University, Abraka"
                value="Delta State University, Abraka"
              />
              <Picker.Item
                label="Dominican University, Ibadan"
                value="Dominican University, Ibadan"
              />

              <Picker.Item
                label="Eastern Palm University"
                value="Eastern Palm University"
              />
              <Picker.Item
                label="Ebonyi State University"
                value="Ebonyi State University"
              />
              <Picker.Item label="Edo University" value="Edo University" />
              <Picker.Item
                label="Edwin Clark University"
                value="Edwin Clark University"
              />
              <Picker.Item
                label="Ekiti State University, Ado Ekiti"
                value="Ekiti State University, Ado Ekiti"
              />
              <Picker.Item
                label="Eko University of Medical and Health Sciences"
                value="Eko University of Medical and Health Sciences"
              />
              <Picker.Item
                label="Elizade University"
                value="Elizade University"
              />
              <Picker.Item
                label="Enugu State University of Science and Technology"
                value="Enugu State University of Science and Technology"
              />
              <Picker.Item
                label="Evangel University Akaeze"
                value="Evangel University Akaeze"
              />

              <Picker.Item
                label="Federal University of Agriculture, Abeokuta"
                value="Federal University of Agriculture, Abeokuta"
              />
              <Picker.Item
                label="Federal University of Petroleum Resources"
                value="Federal University of Petroleum Resources"
              />
              <Picker.Item
                label="Federal University of Technology, Akure"
                value="Federal University of Technology, Akure"
              />
              <Picker.Item
                label="Federal University of Technology, Minna"
                value="Federal University of Technology, Minna"
              />
              <Picker.Item
                label="Federal University of Technology, Owerri"
                value="Federal University of Technology, Owerri"
              />
              <Picker.Item
                label="Federal University, Birnin Kebbi"
                value="Federal University, Birnin Kebbi"
              />
              <Picker.Item
                label="Federal University, Dutse"
                value="Federal University, Dutse"
              />
              <Picker.Item
                label="Federal University, Dutsin-Ma"
                value="Federal University, Dutsin-Ma"
              />
              <Picker.Item
                label="Federal University, Gashua"
                value="Federal University, Gashua"
              />
              <Picker.Item
                label="Federal University, Gusau"
                value="Federal University, Gusau"
              />
              <Picker.Item
                label="Federal University, Kashere"
                value="Federal University, Kashere"
              />
              <Picker.Item
                label="Federal University, Lafia"
                value="Federal University, Lafia"
              />
              <Picker.Item
                label="Federal University, Lokoja"
                value="Federal University, Lokoja"
              />
              <Picker.Item
                label="Federal University, Ndufu-Alike"
                value="Federal University, Ndufu-Alike"
              />
              <Picker.Item
                label="Federal University, Otuoke"
                value="Federal University, Otuoke"
              />
              <Picker.Item
                label="Federal University, Oye-Ekiti"
                value="Federal University, Oye-Ekiti"
              />
              <Picker.Item
                label="Federal University, Wukari"
                value="Federal University, Wukari"
              />
              <Picker.Item
                label="Fountain University, Osogbo"
                value="Fountain University, Osogbo"
              />

              <Picker.Item
                label="Glorious Vision University"
                value="Glorious Vision University"
              />
              <Picker.Item
                label="Godfrey Okoye University"
                value="Godfrey Okoye University"
              />
              <Picker.Item
                label="Gombe State University"
                value="Gombe State University"
              />
              <Picker.Item
                label="Gombe State University of Science and Technology"
                value="Gombe State University of Science and Technology"
              />
              <Picker.Item
                label="Gregory University, Uturu"
                value="Gregory University, Uturu"
              />

              <Picker.Item
                label="Hallmark University, Ijebu-Itele"
                value="Hallmark University, Ijebu-Itele"
              />
              <Picker.Item
                label="Hezekiah University"
                value="Hezekiah University"
              />

              <Picker.Item
                label="Ibrahim Badamasi Babangida University"
                value="Ibrahim Badamasi Babangida University"
              />
              <Picker.Item
                label="Igbinedion University Okada"
                value="Igbinedion University Okada"
              />
              <Picker.Item
                label="Ignatius Ajuru University of Education"
                value="Ignatius Ajuru University of Education"
              />
              <Picker.Item
                label="Imo State University"
                value="Imo State University"
              />

              <Picker.Item
                label="Joseph Ayo Babalola University"
                value="Joseph Ayo Babalola University"
              />

              <Picker.Item
                label="Kaduna State University"
                value="Kaduna State University"
              />
              <Picker.Item
                label="Kano University of Science and Technology"
                value="Kano University of Science and Technology"
              />
              <Picker.Item
                label="Kebbi State University of Science and Technology"
                value="Kebbi State University of Science and Technology"
              />
              <Picker.Item label="Kings University" value="Kings University" />
              <Picker.Item
                label="Kogi State University"
                value="Kogi State University"
              />
              <Picker.Item
                label="Kola Daisi University"
                value="Kola Daisi University"
              />
              <Picker.Item
                label="Kwara State University"
                value="Kwara State University"
              />
              <Picker.Item
                label="Kwararafa University, Wukari"
                value="Kwararafa University, Wukari"
              />

              <Picker.Item
                label="Ladoke Akintola University of Technology"
                value="Ladoke Akintola University of Technology"
              />
              <Picker.Item
                label="Lagos State University"
                value="Lagos State University"
              />
              <Picker.Item
                label="Landmark University"
                value="Landmark University"
              />
              <Picker.Item
                label="Lead City University"
                value="Lead City University"
              />
              <Picker.Item
                label="Legacy University, Okija"
                value="Legacy University, Okija"
              />

              <Picker.Item
                label="Madonna University, Okija"
                value="Madonna University, Okija"
              />
              <Picker.Item
                label="Mcpherson University"
                value="Mcpherson University"
              />
              <Picker.Item
                label="Michael and Cecilia Ibru University"
                value="Michael and Cecilia Ibru University"
              />
              <Picker.Item
                label="Michael Okpara University of Agriculture"
                value="Michael Okpara University of Agriculture"
              />
              <Picker.Item
                label="Modibbo Adama University of Technology"
                value="Modibbo Adama University of Technology"
              />
              <Picker.Item
                label="Moshood Abiola University of Science and Technology, Abeokuta"
                value="Moshood Abiola University of Science and Technology, Abeokuta"
              />
              <Picker.Item
                label="Mountain Top University"
                value="Mountain Top University"
              />

              <Picker.Item
                label="Nasarawa State University"
                value="Nasarawa State University"
              />
              <Picker.Item
                label="Niger Delta University"
                value="Niger Delta University"
              />
              <Picker.Item
                label="Nigerian Maritime University, Okerenkoko"
                value="Nigerian Maritime University, Okerenkoko"
              />
              <Picker.Item
                label="Nile University of Nigeria"
                value="Nile University of Nigeria"
              />
              <Picker.Item
                label="Nnamdi Azikiwe University"
                value="Nnamdi Azikiwe University"
              />
              <Picker.Item
                label="Northwest University Kano"
                value="Northwest University Kano"
              />
              <Picker.Item
                label="Novena University"
                value="Novena University"
              />

              <Picker.Item
                label="Obafemi Awolowo University"
                value="Obafemi Awolowo University"
              />
              <Picker.Item label="Obong University" value="Obong University" />
              <Picker.Item
                label="Oduduwa University"
                value="Oduduwa University"
              />
              <Picker.Item
                label="Olabisi Onabanjo University"
                value="Olabisi Onabanjo University"
              />
              <Picker.Item
                label="Ondo State University of Science and Technology"
                value="Ondo State University of Science and Technology"
              />
              <Picker.Item
                label="Osun State University"
                value="Osun State University"
              />

              <Picker.Item
                label="PAMO University of Medical Sciences"
                value="PAMO University of Medical Sciences"
              />
              <Picker.Item
                label="Pan African University"
                value="Pan African University"
              />
              <Picker.Item label="Paul University" value="Paul University" />
              <Picker.Item
                label="Plateau State University"
                value="Plateau State University"
              />
              <Picker.Item
                label="Precious Cornerstone University"
                value="Precious Cornerstone University"
              />

              <Picker.Item
                label="Redeemer's University"
                value="Redeemer's University"
              />
              <Picker.Item
                label="Renaissance University"
                value="Renaissance University"
              />
              <Picker.Item label="Rhema University" value="Rhema University" />
              <Picker.Item
                label="Ritman University"
                value="Ritman University"
              />
              <Picker.Item
                label="Rivers State University of Science and Technology"
                value="Rivers State University of Science and Technology"
              />

              <Picker.Item label="Salem University" value="Salem University" />
              <Picker.Item
                label="Skyline University Nigeria"
                value="Skyline University Nigeria"
              />
              <Picker.Item
                label="Sokoto State University"
                value="Sokoto State University"
              />
              <Picker.Item
                label="Southwestern University, Nigeria"
                value="Southwestern University, Nigeria"
              />
              <Picker.Item
                label="Spiritan University, Nneochi"
                value="Spiritan University, Nneochi"
              />
              <Picker.Item
                label="Sule Lamido University"
                value="Sule Lamido University"
              />
              <Picker.Item
                label="Sokoto State University"
                value="Sokoto State University"
              />
              <Picker.Item
                label="Summit University Offa"
                value="Summit University Offa"
              />

              <Picker.Item
                label="Tai Solarin University of Education"
                value="Tai Solarin University of Education"
              />
              <Picker.Item
                label="Tansian University"
                value="Tansian University"
              />
              <Picker.Item
                label="Taraba State University"
                value="Taraba State University"
              />
              <Picker.Item
                label="The Technical University"
                value="The Technical University"
              />

              <Picker.Item
                label="Umaru Musa Yar'Adua University"
                value="Umaru Musa Yar'Adua University"
              />
              <Picker.Item
                label="University of Abuja"
                value="University of Abuja"
              />
              <Picker.Item
                label="University of Africa"
                value="University of Africa"
              />
              <Picker.Item
                label="University of Agriculture, Makurdi"
                value="University of Agriculture, Makurdi"
              />
              <Picker.Item
                label="University of Benin"
                value="University of Benin"
              />
              <Picker.Item
                label="University of Calabar"
                value="University of Calabar"
              />
              <Picker.Item
                label="University of Ibadan"
                value="University of Ibadan"
              />
              <Picker.Item
                label="University of Ilorin"
                value="University of Ilorin"
              />
              <Picker.Item
                label="University of Jos"
                value="University of Jos"
              />
              <Picker.Item
                label="University of Lagos"
                value="University of Lagos"
              />
              <Picker.Item
                label="University of Maiduguri"
                value="University of Maiduguri"
              />
              <Picker.Item
                label="University of Medical Sciences"
                value="University of Medical Sciences"
              />
              <Picker.Item
                label="University of Mkar"
                value="University of Mkar"
              />
              <Picker.Item
                label="University of Nigeria"
                value="University of Nigeria"
              />
              <Picker.Item
                label="University of Port Harcourt"
                value="University of Port Harcourt"
              />
              <Picker.Item
                label="University of Uyo"
                value="University of Uyo"
              />
              <Picker.Item
                label="Usmanu Danfodio University"
                value="Usmanu Danfodio University"
              />

              <Picker.Item
                label="Veritas University"
                value="Veritas University"
              />

              <Picker.Item
                label="Wellspring University"
                value="Wellspring University"
              />
              <Picker.Item
                label="Wesley University of Science and Technology"
                value="Wesley University of Science and Technology"
              />
              <Picker.Item
                label="Western Delta University"
                value="Western Delta University"
              />

              <Picker.Item
                label="Yobe State University"
                value="Yobe State University"
              />
              <Picker.Item
                label="Yusuf Maitama Sule University Kano"
                value="Yusuf Maitama Sule University Kano"
              />

              <Picker.Item
                label="Zamfara State University"
                value="Zamfara State University"
              />
            </Picker>
          </View>

          {/* Gender */}
          <View style={styles.inputFieldContainer}>
            <Icon
              name="male-female-outline"
              type="ionicon"
              size={16}
              color="rgba(0,0,0,0.6)"
            />
            <Picker
              style={{flex: 1}}
              selectedValue={gender}
              onValueChange={(value, index) => setGender(value)}>
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          {/* Terms and Conditions */}
          <Text style={{marginTop: 10}}>
            By signing up, you agree to our{' '}
            <Text style={{color: 'blue', fontStyle: 'italic'}}>
              Terms and Conditions
            </Text>
          </Text>
          {/* Login */}

          <View style={styles.signUp}>
            <Button
              title="Sign up"
              raised
              buttonStyle={{backgroundColor: 'blue'}}
              onPress={logData}
            />
          </View>
          {/* Social Sign up */}
          <View style={{alignItems: 'center', marginTop: 25}}>
            <Text>--or sign up with--</Text>
            <View style={styles.signUpLogoContainer}>
              {/* Google */}
              <Button
                icon={
                  <Image
                    source={require('../images/google_logo.png')}
                    style={{height: 17, width: 17}}
                  />
                }
                ic
                buttonStyle={styles.signUpLogo}
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
                buttonStyle={styles.signUpLogo}
                raised
              />
            </View>
            <Text style={{marginTop: 25}}>
              Already have an account?
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
    paddingHorizontal: 30,
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
  signUp: {
    marginTop: 10,
  },
  signUpLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: 25,
  },
  signUpLogo: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
