import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-start',
      }}>
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
