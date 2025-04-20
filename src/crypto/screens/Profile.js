import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import MainLayout from '../screens/MainLayout';
import {HeaderBar} from '../components';
import {COLORS, SIZES, dummyData, FONTS, icons} from '../constants';

const SectionTitle = ({title}) => {
  return (
    <View style={{marginTop: SIZES.padding}}>
      <Text style={{color: COLORS.lightGray3, ...FONTS.h4}}>{title}</Text>
    </View>
  );
};

const Settings = ({title, value, type, onPress}) => {
  if (type == 'button') {
    return (
      <TouchableOpacity
        style={{alignItems: 'center', flexDirection: 'row', height: 50}}
        onPress={onPress``}>
        <Text style={{flex: 1, color: COLORS.white, ...FONTS.h3}}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.lightGray3,
              marginRight: SIZES.radius,
              ...FONTS.h3,
            }}>
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{height: 15, width: 15, tintColor: COLORS.white}}></Image>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
        }}>
        <Text style={{color: COLORS.white, ...FONTS.h3, flex: 1}}>{title}</Text>
        <Switch value={value} onPress={value => onPress(value)}></Switch>
      </View>
    );
  }
};

const Profile = () => {
  const [faceId, setFaceId] = useState(true);
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Header Section start */}
        <HeaderBar title="Profile" />
        {/* Header Section end */}

        {/* Detail Section start */}
        <ScrollView>
          {/* Email and User ID start */}
          <View style={{marginTop: SIZES.radius, flexDirection: 'row'}}>
            {/* Email and Id start */}
            {/* Email and Id end */}
            <View style={{flex: 1}}>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>
                {dummyData.profile.email}
              </Text>
              <Text style={{color: COLORS.lightGray3, ...FONTS.body4}}>
                {dummyData.profile.id}
              </Text>
            </View>
            {/* status start */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={icons.verified}></Image>
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}>
                Verified
              </Text>
            </View>
            {/* status end */}
          </View>
          {/* Email and User ID end */}

          {/* App start */}
          <SectionTitle title="APP"></SectionTitle>
          <Settings
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Setting Pressed')}></Settings>

          <Settings
            title="Apperance"
            value="Dark"
            type="button"
            onPress={() => console.log('Apperance Pressed')}></Settings>

          {/* Account start */}

          <SectionTitle title="ACCOUNT"></SectionTitle>
          <Settings
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Payment Pressed')}></Settings>

          <Settings
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Language Pressed')}></Settings>
          {/* Account end */}

          {/* Security start */}
          <SectionTitle title="SECURITY"></SectionTitle>
          <Settings
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={value => setFaceId(value)}></Settings>

          <Settings
            title="Password Settings"
            value=""
            type="button"
            onPress={value => console.log('Password pressed')}></Settings>

          <Settings
            title="Change Password"
            value=""
            type="button"
            onPress={value => console.log('Password pressed')}></Settings>

          <Settings
            title="2-FactorAunthentication"
            value=""
            type="button"
            onPress={value => console.log('Password pressed')}></Settings>

          {/* Security end */}

          {/* App end */}
        </ScrollView>
        {/* Detail Section end */}
      </View>
    </MainLayout>
  );
};

export default Profile;
