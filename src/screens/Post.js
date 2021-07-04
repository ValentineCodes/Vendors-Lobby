import {TextInput, Snackbar} from 'react-native-paper';
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
import {Icon} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Colors from '../constants/colors';

export default function Post({props, navigation}) {
  const [userID, setUserID] = useState('6041891b9cf3bd2c58e46600');
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [school, setSchool] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);

  function selectImageFromLibrary() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      multiple: true,
      compressImageQuality: 0.5,
      mediaType: 'photo',
    })
      .then((response) => {
        if (products.length + response.length > 10) {
          alert('You cannot upload more than 10 products');
        } else {
          const selectedProducts = [];
          response.map((product) =>
            selectedProducts.push({
              key: Math.random().toString(),
              uri: product.path,
              type: product.mime,
              filename: product.path.substr(product.path.lastIndexOf('/') + 1),
            }),
          );
          setProducts((currentProducts) => [
            ...selectedProducts,
            ...currentProducts,
          ]);
        }
      })
      .catch((err) => {
        return;
      });
  }

  function deleteImage(key) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.key !== key),
    );
  }

  //Check if fields are filled up to Enable the Upload Button
  useEffect(() => {
    if (
      products.length !== 0 &&
      productName.trim() !== '' &&
      category.trim() !== '' &&
      price.trim() !== '' &&
      phoneNumber.trim() !== '' &&
      school.trim() !== ''
    ) {
      setIsUploadDisabled(false);
    } else {
      setIsUploadDisabled(true);
    }
  }, [products, productName, category, price, phoneNumber, school]);

  const uploadProducts = async () => {
    alert('Clicked');
    const images = [];
    products.map((product) =>
      images.push({
        name: 'images',
        filename: product.filename,
        type: product.type,
        data: RNFetchBlob.wrap(product.uri),
      }),
    );

    RNFetchBlob.fetch(
      'POST',
      'http://9cdabd8a09bb.ngrok.io/uploads/add',
      {
        'Content-Type': 'multipart/form-data',
      },

      [
        {name: 'userID', data: userID.trim()},
        ...images,
        {name: 'productName', data: productName.trim()},
        {name: 'category', data: category.trim()},
        {name: 'description', data: description.trim()},
        {name: 'price', data: price.trim()},
        {name: 'phoneNumber', data: phoneNumber.trim()},
        {name: 'school', data: school.trim()},
      ],
    )
      .then(() => {
        setIsVisible(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => navigation.navigate('Home'));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="arrow-back"
            type="ionicon"
            size={28}
            color={Colors.primary}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: 15,
              color: Colors.primary,
            }}>
            Post Product
          </Text>
        </TouchableOpacity>

        <Icon
          reverse
          name="upload"
          type="font-awesome"
          size={Dimensions.get('screen').width / 20}
          color={Colors.primary}
          onPress={uploadProducts}
          disabled={isUploadDisabled}
        />
      </View>

      <View style={{flex: 1}}>
        {/* Select Image(s) */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Select Image(s):</Text>

          <View style={styles.selectedImages}>
            <View style={{alignItems: 'center'}}>
              {/* Add Image Button */}
              <Icon
                reverse
                name="add"
                color={Colors.primary}
                size={Dimensions.get('screen').width / 20}
                disabled={products.length >= 10 ? true : false}
                onPress={selectImageFromLibrary}
              />
              <Text>{products.length}/10</Text>
            </View>

            {/* Display Selected Images */}
            <FlatList
              horizontal={true}
              keyExtractor={(product) => product.key}
              data={products}
              renderItem={(product) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: product.item.uri}}
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                  />
                  <View style={styles.cancelButton}>
                    <Icon
                      reverse
                      name="cancel"
                      color="rgba(255,0,0,0.7)"
                      size={7}
                      onPress={deleteImage.bind(this, product.item.key)}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <ScrollView>
          {/* Name */}
          <View style={{...styles.inputFieldContainer, borderBottomWidth: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.label}>Product Name:</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  marginBottom: 10,
                }}>
                {productName.length}/50
              </Text>
            </View>
            <TextInput
              maxLength={50}
              onChangeText={(value) => setProductName(value)}
              value={productName}
              style={{backgroundColor: 'white', height: 35}}
            />
          </View>

          {/* Category */}
          <View style={styles.inputFieldContainer}>
            <Text style={styles.label}>Category: </Text>

            <View style={styles.pickerField}>
              <Picker
                style={{flex: 1}}
                onValueChange={(value) => setCategory(value)}
                selectedValue={category}>
                <Picker.Item label="Select Category" value="" />
                <Picker.Item
                  label="Audio & Music Equipments"
                  value="Audio and Music Equipments"
                />
                <Picker.Item label="Bags" value="Bags" />
                <Picker.Item label="Books" value="Books" />
                <Picker.Item label="Calculators" value="Calculators" />
                <Picker.Item label="Clothing" value="Clothing" />
                <Picker.Item
                  label="Clothing Accessories"
                  value="Clothing Accessories"
                />
                <Picker.Item
                  label="Computer Accessories"
                  value="Computer Accessories"
                />
                <Picker.Item
                  label="Computer Hardware"
                  value="Computer Hardware"
                />
                <Picker.Item label="Footwear" value="Footwear" />
                <Picker.Item label="Furniture" value="Furniture" />
                <Picker.Item
                  label="Games & Consoles"
                  value="Games and Consoles"
                />
                <Picker.Item
                  label="Gaming Equipments"
                  value="Gaming Equipments"
                />
                <Picker.Item label="Generators" value="Generators" />
                <Picker.Item
                  label="Health & Beauty"
                  value="Health and Beauty"
                />
                <Picker.Item label="Home Appliances" value="Home Appliances" />
                <Picker.Item label="Jewelries" value="Jewelries" />
                <Picker.Item
                  label="Kitchen Utensils"
                  value="Kitchen Utensils"
                />
                <Picker.Item
                  label="Laptops & Desktops"
                  value="Laptops and Desktops"
                />
                <Picker.Item
                  label="Phones & Tablets"
                  value="Phones and Tablets"
                />
                <Picker.Item
                  label="Phone & Tablet Accessories"
                  value="Phone and Tablet Accessories"
                />
                <Picker.Item label="Services" value="Services" />
                <Picker.Item
                  label="TV & DVD Equipment"
                  value="TV and DVD Equipment"
                />
                <Picker.Item label="Watches" value="Watches" />

                <Picker.Item label="Other Products" value="Other Products" />
              </Picker>
            </View>
          </View>

          {/* Description */}
          <View style={{...styles.inputFieldContainer, borderBottomWidth: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.label}>Description:</Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  marginBottom: 10,
                }}>
                {description.length}/1000
              </Text>
            </View>
            <TextInput
              maxLength={1000}
              onChangeText={(value) => setDescription(value)}
              value={description}
              style={{backgroundColor: 'white', height: 100}}
            />
          </View>

          {/* Price */}
          <View style={{...styles.inputFieldContainer, borderBottomWidth: 0}}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(value) => setPrice(value)}
              value={price}
              style={{backgroundColor: 'white', height: 35}}
            />
          </View>

          {/* Phone Number */}
          <View style={{...styles.inputFieldContainer, borderBottomWidth: 0}}>
            <Text style={styles.label}>Phone Number:</Text>

            <TextInput
              placeholder="e.g 090********, 080******** e.t.c"
              maxLength={11}
              keyboardType="number-pad"
              onChangeText={(value) => setPhoneNumber(value)}
              value={phoneNumber}
              style={{backgroundColor: 'white', height: 35}}
            />
          </View>

          {/* School */}
          <View style={{...styles.inputFieldContainer, marginBottom: 40}}>
            <Text style={styles.label}>School:</Text>
            <View style={styles.pickerField}>
              <Picker
                style={{flex: 1}}
                onValueChange={(value) => setSchool(value)}
                selectedValue={school}>
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
                <Picker.Item
                  label="Atiba University"
                  value="Atiba University"
                />
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
                <Picker.Item
                  label="Bowen University"
                  value="Bowen University"
                />

                <Picker.Item
                  label="Caleb University"
                  value="Caleb University"
                />
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
                <Picker.Item
                  label="Kings University"
                  value="Kings University"
                />
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
                <Picker.Item
                  label="Obong University"
                  value="Obong University"
                />
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
                <Picker.Item
                  label="Rhema University"
                  value="Rhema University"
                />
                <Picker.Item
                  label="Ritman University"
                  value="Ritman University"
                />
                <Picker.Item
                  label="Rivers State University of Science and Technology"
                  value="Rivers State University of Science and Technology"
                />

                <Picker.Item
                  label="Salem University"
                  value="Salem University"
                />
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
          </View>
        </ScrollView>
      </View>
      <Snackbar visible={isVisible} onDismiss={() => setIsVisible(false)}>
        Uploaded Successfully
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  inputFieldContainer: {
    marginTop: 22,
    marginLeft: 15,
    padding: 5,
    paddingBottom: 10,
    width: '90%',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: 0.5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
  },
  pickerField: {height: 35},
  selectedImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 5,
    height: Dimensions.get('screen').width / 5,
    marginRight: 10,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    elevation: 10,
  },
  cancelButton: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
